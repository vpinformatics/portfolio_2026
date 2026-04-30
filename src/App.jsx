const services = [
  'Custom Software Development',
  'Web Development',
  'Mobile App Development',
  'IoT Solutions',
  'API Development',
  'Maintenance & Support'
]

const industries = ['Manufacturing', 'Logistics', 'Healthcare', 'E-commerce']

const caseStudies = [
  {
    title: 'Smart Warehouse Suite',
    problem: 'A UK distributor struggled with delayed inventory visibility across 12 facilities.',
    solution: 'We built an IoT-enabled logistics platform with real-time dashboarding and predictive alerts.',
    result: '38% faster dispatch and 27% reduction in stockouts in 6 months.'
  },
  {
    title: 'Healthcare Patient Flow Platform',
    problem: 'A European clinic network had fragmented patient flow systems and manual reports.',
    solution: 'VP Informatics delivered a secure cloud platform with API integrations and mobile access.',
    result: '42% less admin overhead and improved patient throughput across regions.'
  },
  {
    title: 'D2C Commerce Modernization',
    problem: 'A US brand faced slow storefront performance and high cart abandonment.',
    solution: 'Our team re-architected the stack with React, Node.js, and cloud-native autoscaling.',
    result: '2.3x page speed improvement and 31% lift in conversion rate.'
  }
]

const processSteps = ['Discovery', 'Architecture', 'Agile Development', 'Quality Assurance', 'Launch & Scale']

const testimonials = [
  { quote: 'VP Informatics transformed our operations with disciplined execution and excellent communication.', name: 'Operations Director', country: '🇬🇧 UK' },
  { quote: 'They delivered enterprise-grade software on time with full transparency from start to finish.', name: 'CTO', country: '🇺🇸 USA' },
  { quote: 'A trusted long-term technology partner for strategic digital initiatives in Europe.', name: 'Managing Partner', country: '🇩🇪 Germany' }
]

export default function App() {
  return (
    <div>
      <header className="hero section">
        <div className="floating-bg" />
        <nav className="nav container glass">
          <h2>VP Informatics</h2>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
        <div className="container hero-content reveal">
          <p className="eyebrow">Global Software Engineering Partner</p>
          <h1>Build Smarter Software. Scale Your Business Globally.</h1>
          <p>
            We help ambitious businesses in the USA, UK, and Europe launch secure,
            scalable digital products with measurable business outcomes.
          </p>
          <div className="hero-actions">
            <button>Get a Free Consultation</button>
            <a className="secondary-btn" href="#case-studies">View Our Work</a>
          </div>
        </div>
      </header>

      <section className="section container reveal">
        <h2>About VP Informatics</h2>
        <p>
          VP Informatics is a professional software development company focused on
          enterprise-grade delivery, transparent execution, and long-term client success.
          With global collaboration workflows and strong technical governance, we deliver
          solutions that reduce risk and accelerate growth.
        </p>
      </section>

      <section id="services" className="section navy reveal">
        <div className="container">
          <h2>Services</h2>
          <div className="grid cards-3">
            {services.map((service) => (
              <article className="card" key={service}>
                <h3>{service}</h3>
                <p>Outcome-driven delivery tailored to your business and compliance requirements.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container reveal iot">
        <div>
          <h2>IoT Solutions That Power Smart Operations</h2>
          <p>
            From real-time device monitoring to intelligent automation, our IoT systems are built
            for reliability, observability, and secure scaling across connected environments.
          </p>
        </div>
        <div className="iot-panel glass">
          <div className="pulse" />
          <p>Live Device Uptime</p>
          <h3>99.97%</h3>
          <small>Automated event orchestration active</small>
        </div>
      </section>

      <section className="section container reveal">
        <h2>Industries We Serve</h2>
        <div className="grid cards-4">
          {industries.map((item) => (
            <div className="card" key={item}><h3>{item}</h3></div>
          ))}
        </div>
      </section>

      <section id="case-studies" className="section container reveal">
        <h2>Case Studies</h2>
        <div className="grid cards-3">
          {caseStudies.map((c) => (
            <article className="card" key={c.title}>
              <h3>{c.title}</h3>
              <p><strong>Problem:</strong> {c.problem}</p>
              <p><strong>Solution:</strong> {c.solution}</p>
              <p><strong>Results:</strong> {c.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section navy reveal">
        <div className="container">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            {['Angular', 'React', 'Node.js', 'Flutter', 'Cloud'].map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </div>
      </section>

      <section className="section container reveal">
        <h2>Development Process</h2>
        <div className="process">
          {processSteps.map((step, index) => (
            <div key={step} className="step">
              <div className="dot">{index + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container reveal">
        <h2>Why Choose Us</h2>
        <div className="grid cards-3">
          <div className="card"><h3>Global Delivery Readiness</h3><p>Structured collaboration for cross-timezone execution.</p></div>
          <div className="card"><h3>Security-First Engineering</h3><p>Built-in quality, governance, and compliance-minded architecture.</p></div>
          <div className="card"><h3>Business-Centric Outcomes</h3><p>Every sprint aligned with ROI, growth, and operational efficiency.</p></div>
        </div>
      </section>

      <section className="section navy reveal">
        <div className="container">
          <h2>Client Testimonials</h2>
          <div className="grid cards-3">
            {testimonials.map((t) => (
              <article className="card" key={t.name}>
                <p>“{t.quote}”</p>
                <h4>{t.name}</h4>
                <small>{t.country}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container cta-banner reveal">
        <h2>Ready to Build Your Next Competitive Advantage?</h2>
        <p>Partner with VP Informatics for reliable, high-performance software delivery.</p>
        <button>Book a Consultation</button>
      </section>

      <section id="contact" className="section container reveal">
        <h2>Contact Us</h2>
        <div className="contact-grid">
          <form className="card form">
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Work Email" />
            <input type="text" placeholder="Company Name" />
            <textarea rows="5" placeholder="Tell us about your project" />
            <button type="button">Submit Inquiry</button>
          </form>
          <div className="card">
            <h3>VP Informatics</h3>
            <p>Phone: +91 90336 52515</p>
            <p>Phone: +91 99980 88113</p>
            <p>Website: <a href="https://www.vpinformatics.in">www.vpinformatics.in</a></p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h3>VP Informatics</h3>
            <p>Premium software engineering for global growth.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="#services">Services</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Services</h4>
            <p>Custom Software</p><p>IoT Solutions</p><p>Mobile Apps</p>
          </div>
          <div>
            <h4>Social</h4>
            <p>LinkedIn</p><p>X</p><p>GitHub</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
