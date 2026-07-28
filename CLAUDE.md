# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install         # install dependencies
npm run dev          # start Next.js dev server on http://localhost:3000
npm run build        # production build (.next/)
npm run start         # serve the production build
```

## Architecture

This is a **Next.js 14 (App Router) + React 18 + Tailwind CSS** project. There is no CDN/Babel-in-browser setup — everything compiles through Next's normal build pipeline.

### Routes

- `/` (`app/page.jsx`) — renders `components/App.jsx`: nav, hero, all homepage content sections, portfolio summary cards, FAQ, and the contact form. Also emits `ProfessionalService` + `FAQPage` JSON-LD.
- `/case-studies` (`app/case-studies/page.jsx`) — index of all four case studies, links to each detail route. Emits `BreadcrumbList` JSON-LD.
- `/case-studies/[slug]` (`app/case-studies/[slug]/page.jsx`) — one statically generated page per case study (`generateStaticParams`), each with its own `generateMetadata` (title/description/canonical/OG) and `BreadcrumbList` JSON-LD. Renders `components/CaseStudyArticle.jsx` with data from `getCaseStudy(slug)`.

The homepage only shows short summary blurbs for each case study (`portfolioSummary` in `components/siteData.js`) linking out to its dedicated route — the full case-study detail (problem/risk/solution/before-after/outcomes) lives **only** on `/case-studies/{slug}`, not duplicated on the homepage, to avoid duplicate-content SEO issues and to give each industry vertical its own indexable/shareable URL.

### Shared components

- `app/layout.jsx` — root `<html>`/`<body>` shell, `next/font/google` (Manrope/Sora, self-hosted, no external font request), global `metadata` (title template `%s | VP Informatics`, OG, Twitter, robots, canonical).
- `app/globals.css` — Tailwind directives plus the site's custom CSS: keyframe animations (`fadeIn`, `marquee`, `gradient`), and the light/dark theme system.
- `components/SiteHeader.jsx` — nav bar, theme toggle, mobile menu. `'use client'`, owns its own `theme`/`isScrolled`/`mobileMenuOpen` state (reads/writes `localStorage('vp-theme')` and toggles `document.body` classes) so it's reusable, unmodified, across the homepage and every case-study page. All internal links use absolute paths with hash (`/#outcomes`, not `#outcomes`) so they resolve correctly from any route.
- `components/SiteFooter.jsx` — footer, shared the same way (server-safe, no state).
- `components/CaseStudyArticle.jsx` — the full case-study article markup (problem/risk/solution/before-after/outcomes/relevant/CTA), parameterized by a `project` object; used only by `/case-studies/[slug]`.
- `components/App.jsx` — homepage-only content (hero, outcomes marquee, business-continuity section, ERP-gap CTA, before/after, solution cards, portfolio summary, process, decision framework/FAQ, contact form). `'use client'`.
- `components/SvgIcon.jsx` — inline icon set (no icon library).
- `components/VPLogo.jsx` — logo `<img>` (Google Drive–hosted) with a text-based fallback on load error.
- `components/AnimatedSection.jsx` — `IntersectionObserver`-based scroll-reveal wrapper (`opacity-0 translate-y-10` → `opacity-100 translate-y-0`).
- `components/siteData.js` — single source of truth for `siteUrl`, `logoUrl`, `orgData`, `navLinks`, `faqData`, `businessCards`, `portfolioSummary`, and `caseStudies` (+ `getCaseStudy(slug)`). Imported by both the UI components and the JSON-LD/metadata in `app/**`, so visible content and structured data can't drift apart. Hero slides stay inline in `App.jsx` since they contain JSX and aren't needed elsewhere.

### Theme system

Dark/light mode toggles a `theme-dark` / `theme-light` class on `document.body` (set in `components/SiteHeader.jsx`, persisted to `localStorage('vp-theme')`). All dark-mode overrides are plain CSS in `app/globals.css` targeting `.theme-dark`-prefixed Tailwind class selectors — **not** Tailwind's `dark:` variant.

### Content data

Edit `components/siteData.js` to change nav links, FAQ, solution cards, or case-study content (no JSX restructuring needed). Edit `heroSlides` directly in `components/App.jsx` for the hero carousel (contains JSX, so it isn't in `siteData.js`).

### Styling conventions

- All styling via **Tailwind utility classes** inline on JSX elements
- Dark mode via **CSS class overrides** in `app/globals.css` (not Tailwind's `dark:` variant) — targets `body.theme-dark .bg-white`, etc.
- Custom classes: `.animate-fadeIn`, `.marquee-track`, `.marquee-wrap`, `.logo-shell`, `.footer-logo-shell`, `.theme-toggle-btn` — defined in `app/globals.css`
- Responsive breakpoint: `xl:` for nav (1280px), `lg:` for most grid layouts, `md:` for card grids
- Color palette: `red-600` (accent/CTA), `slate-950` (dark panels), `slate-50`/`slate-100` (alternating section backgrounds)

### Contact / form

The form (`handleSubmit` in `components/App.jsx`) POSTs to an external automation webhook (`https://automation.vpinformatics.in/webhook/ContactUsWeb`) with the form fields plus `page_url`/`submitted_at`. It has client-side spam protection: a `website` honeypot field (visually hidden off-screen, real users never fill it) and a simple `a + b` arithmetic CAPTCHA, both checked before the request fires. Success shows a confirmation state for 5s; failure shows an inline retry message. "Schedule Strategy Consultation" links to `mailto:vpinformatics365@gmail.com`. There's also a fixed WhatsApp floating action button (bottom-right) linking to `wa.me/919664743159`.

### SEO

- Every page's `metadata`/`generateMetadata` sets its own title (via `layout.jsx`'s `%s | VP Informatics` template), description, canonical, Open Graph, and Twitter tags. When adding per-page OG/Twitter titles, remember they are **not** auto-templated like `<title>` is — append `| VP Informatics` explicitly if you want the branded suffix in social previews (see `app/case-studies/[slug]/page.jsx`'s `socialTitle`).
- `app/sitemap.js`, `app/robots.js`, `app/manifest.js` are Next.js metadata-route conventions — edit these directly, don't hand-write `public/sitemap.xml` etc. `sitemap.js` must list the homepage, `/case-studies`, and every entry in `caseStudies`.
- `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.png` are **static PNGs generated by `scripts/gen-assets.js`** (downloads the real logo from `logoUrl` in `siteData.js`, crops the "VP" monogram out of the wide lockup, composites it onto a white tile for the icons and a dark-gradient card with the hero headline for the OG image), picked up automatically by Next's file-based icon/OG-image convention. They're static files rather than `next/og`-generated routes because `next/og`'s `ImageResponse` currently crashes at build time on Windows (a `@vercel/og` bug building a `file://` URL for its bundled default font/wasm — reproducible with any `next/og` usage, not specific to this project's code). Re-run `node scripts/gen-assets.js` after logo or OG-copy changes; keep output dimensions at 32×32 / 180×180 / 1200×630.
- `app/layout.jsx` conditionally adds `metadata.verification.google` from `process.env.GOOGLE_SITE_VERIFICATION` — omitted from `<head>` entirely if the env var is unset, so it's safe to leave unconfigured until a GSC property exists.
- `components/Analytics.jsx` conditionally loads GA4's `gtag.js` via `next/script` from `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`; renders `null` if unset. Mounted once in `app/layout.jsx`.
- The hero (`components/App.jsx`) uses a fixed initial `activeHero` index (not `Math.random()`) specifically to avoid an SSR/client hydration mismatch — random initial state means the server-rendered `<h1>` (what search engines and social crawlers see) would differ from the client-rendered one on every load.
- Adding a new case study: add an entry to `caseStudies` in `components/siteData.js` (and to `portfolioSummary` for the homepage card) — the `/case-studies/[slug]` route, its metadata, breadcrumb JSON-LD, and `sitemap.xml` entry are all derived from that array automatically.
