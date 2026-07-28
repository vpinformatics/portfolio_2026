import VPLogo from './VPLogo';
import { navLinks } from './siteData';

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="footer-logo-shell inline-flex mb-6"><VPLogo className="h-12 w-auto object-contain" /></div>
            <h3 className="text-xl font-bold mb-4">Most factories don't need another ERP. They need better operational visibility.</h3>
            <p className="text-slate-400 leading-relaxed max-w-md">VP Informatics helps manufacturing businesses eliminate operational bottlenecks, reduce dependency on key personnel, and improve production visibility through custom software, automation, and industrial IoT solutions.</p>
          </div>
          <div className="lg:col-span-2"><h4 className="font-semibold text-sm mb-6">Quick Links</h4><ul className="space-y-3 text-slate-400 text-sm">{navLinks.map(([h, l]) => <li key={l}><a href={h} className="hover:text-white transition-colors">{l}</a></li>)}</ul></div>
          <div className="lg:col-span-2"><h4 className="font-semibold text-sm mb-6">Services</h4><ul className="space-y-3 text-slate-400 text-sm">{['Operational Bottleneck Reduction', 'ERP Gap Analysis', 'Production Visibility', 'Workflow Automation'].map(l => <li key={l}>{l}</li>)}</ul></div>
          <div className="lg:col-span-3"><h4 className="font-semibold text-sm mb-6">Contact</h4><div className="space-y-4 text-sm"><div><div className="text-slate-500 text-xs mb-0.5">Email</div><a href="mailto:vpinformatics365@gmail.com" className="hover:text-red-300 transition-colors">vpinformatics365@gmail.com</a></div><div><div className="text-slate-500 text-xs mb-0.5">WhatsApp</div><a href="https://wa.me/919664743159" target="_blank" rel="noopener noreferrer" className="hover:text-red-300 transition-colors">+91 96647 43159</a></div><div><div className="text-slate-500 text-xs mb-0.5">Response Time</div><div>Within 1 Business Day</div></div><a href="/#contact" className="inline-flex bg-red-600 hover:bg-red-500 transition-colors px-5 py-2.5 rounded-lg font-semibold text-sm">Request ERP Gap Assessment</a></div></div>
        </div>
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4 text-slate-500 text-sm"><p>© 2026 VP Informatics. Built for operational efficiency.</p><p>Custom Software · Industrial IoT · Operational Intelligence</p></div>
      </div>
    </footer>
  );
}
