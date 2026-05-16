// home.jsx — Mary Skinner Designs homepage

const { useState, useEffect, useMemo } = React;

// Portfolio data — preserved from repo, with size hints for the bento grid
// Featured = 6 hand-picked from the 15-item full list for the homepage
const FEATURED = [
  {
    slug: 'the-office-of-angela-scott',
    title: 'The Office of Angela Scott',
    category: 'Logo Design',
    year: '2024',
    image: 'assets/angela-scott-main.webp',
    size: 'large',
    wash: '#1a1a1a',
    discipline: 'Luxury Footwear',
  },
  {
    slug: 'spa-verdant',
    title: 'Spa Verdant',
    category: 'Identity · Brand Guidelines',
    year: '2025',
    image: 'assets/spa-verdant-bag.jpg',
    size: 'medium',
    wash: '#334933',
    discipline: 'Hotel Spa',
  },
  {
    slug: 'molly-ann-farms',
    title: 'Molly Ann Farms',
    category: 'Brand Identity · Logo',
    year: '2023',
    image: 'assets/molly-ann-farms.jpg',
    size: 'large',
    wash: '#2B4D7B',
    discipline: 'Cannabis Dispensary',
  },
  {
    slug: 'slaack-social-club',
    title: 'Slaack Social Club',
    category: 'Identity · Merchandise',
    year: '2024',
    image: 'assets/slaack-social-club.jpg',
    size: 'medium',
    wash: '#3F2B1E',
    discipline: 'Members Club',
  },
  {
    slug: 'sage-brooklyn',
    title: 'Sage Brooklyn',
    category: 'Logo · Print',
    year: 'Ongoing',
    image: 'assets/sage-brooklyn.jpg',
    size: 'medium',
    wash: '#4F5A3C',
    discipline: 'Modern Thai Restaurant',
  },
  {
    slug: 'summit-lake',
    title: 'Summit Lake',
    category: 'Identity · Signage',
    year: '2023',
    image: 'assets/summit-lake.jpg',
    size: 'medium',
    wash: '#37574F',
    discipline: 'Public Nature Center',
  },
  {
    slug: 'the-room-society',
    title: 'The Room Society',
    category: 'Identity · Web',
    year: '2026',
    image: 'assets/the-room-society-hero-fixed.png',
    imgScale: 90,
    imgBg: '#f2ece3',
    size: 'small',
    wash: '#4A3F36',
    discipline: 'Death Tech Collective',
  },
  {
    slug: 'the-embodied-boss',
    title: 'The Embodied Boss',
    category: 'Logo Suite · Guidelines',
    year: '2025',
    image: 'assets/teb-tile.jpg',
    size: 'medium',
    wash: '#37574F',
    discipline: 'Somatic Coaching',
  },
  {
    slug: 'bridge',
    title: 'Bridge',
    category: 'Brand Identity · Logo',
    year: '2024',
    image: 'assets/bridge.jpg',
    size: 'small',
    wash: '#3B4C5A',
    discipline: 'Mobile Physical Therapy',
  },
  {
    slug: 'bic',
    title: 'Bic',
    category: 'Environmental Graphics',
    year: '2019',
    image: 'assets/bic-tile.png',
    size: 'medium',
    wash: '#E8A317',
    discipline: 'Corporate Office · Installation',
  },
  {
    slug: 'last-hurrah',
    title: 'Last Hurrah',
    category: 'Brand Identity · Logo · Web',
    year: '2025',
    image: 'assets/last-hurrah-logo.png',
    size: 'medium',
    wash: '#37574F',
    discipline: 'Legacy &amp; End-of-Life',
  },
  {
    slug: 'flora-farms',
    title: 'Flora Farms',
    category: 'Illustrated Placemat',
    year: '2014',
    image: 'assets/flora-placemat.jpg',
    size: 'medium',
    wash: '#37574F',
    discipline: 'Organic Farm · Restaurant',
  },

];

// ---------- HERO ----------
function Hero() {
  return (
    <section className="hero hero-centered" id="top">
      <div className="hero-stack reveal-stagger in">
        <div className="hero-logo">
          <img src="assets/mary-skinner-lockup.png" alt="Mary Skinner — Creative Director + Graphic Designer" />
        </div>
      </div>

      <div className="hero-scroll-line" aria-hidden="true"></div>
    </section>
  );
}

// Statement band — the "brands worth slowing down for" moment, now its own section
function Statement() {
  return (
    <section className="statement-section">
      <div className="container container-wide">
        <RevealOnScroll className="reveal" stagger>
          <div className="section-eyebrow" style={{marginBottom: 26, color: 'rgba(251,248,242,0.6)'}}>
            <span className="rule" style={{background:'rgba(251,248,242,0.4)'}}></span>
            Practice
          </div>
          <h2 className="statement-title">
            Brands worth <em>slowing</em><br/>
            down for.
          </h2>
          <p className="statement-lede">
            I take on a handful of identities each year — quiet, considered work for founders who care about the difference between a logo and a brand. Strategy and craft, in equal measure.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ---------- WORK ----------
function Tile({ item, idx }) {
  const hasImage = !!item.image;
  return (
    <a
      className={`tile ${!hasImage ? 'tile--placeholder' : ''}`}
      href={`project.html?slug=${item.slug}`}
      data-cursor-tile
      data-cursor-label="View →"
      style={{ '--brand-wash': item.wash }}
    >
      {hasImage && (
        <div
          className="tile-img"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: item.imgScale ? `${item.imgScale}%` : 'cover',
            backgroundColor: item.imgBg || 'transparent',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      )}
      <div className="tile-mask"></div>
      <div className="tile-meta">
        <div className="cat">{item.category}</div>
        <div className="title">{item.title}</div>
      </div>
    </a>
  );
}

function Work() {
  return (
    <section className="work-section" id="work">
      <div className="container container-wide">
        <RevealOnScroll className="work-head" stagger>
          <div>
            <div className="section-eyebrow" style={{marginBottom: 24}}>
              <span className="rule"></span>
              Selected work
            </div>
            <h2>
              A curated <em>index</em> of<br/>
              brands &amp; their worlds.
            </h2>
          </div>
          <div className="right">
            <span style={{color:'var(--magenta)'}}>●</span> hover to preview
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="work-grid" stagger>
          {FEATURED.map((item, i) => (
            <Tile key={item.slug} item={item} idx={i} />
          ))}
        </RevealOnScroll>

        <div className="work-cta">
          <a href="#contact" className="btn btn-ghost">
            Start a project
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- ABOUT ----------
function About() {
  return (
    <section className="about-section" id="about">
      <div className="container container-wide">
        <div className="about-grid">
          <RevealOnScroll className="reveal">
            <div className="about-image">
              <img src="assets/mary-headshot.jpg" alt="Mary Skinner" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll className="about-content reveal" stagger>
            <div className="section-eyebrow" style={{marginBottom: 22}}>
              <span className="rule"></span>
              About
            </div>
            <h2>About <em>Me</em></h2>
            <p>
              I'm a graphic designer specializing in brand identity, logo design, and visual storytelling. With a keen eye for detail and a passion for creating meaningful connections between brands and their audiences.
            </p>
            <p>
              My approach combines strategic thinking with creative execution, ensuring every design decision serves a purpose while maintaining aesthetic excellence.
            </p>
            <p>
              Based in the creative heart of the design world, I collaborate with clients globally to bring their visions to life through thoughtful, timeless design solutions.
            </p>
            <div className="about-actions">
              <a href="#contact" className="btn">
                Let's work together
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ---------- SERVICES ----------
const SERVICES = [
  { name: 'Brand Identity', detail: 'Strategy · Visual System · Guidelines' },
  { name: 'Logo Design', detail: 'Mark · Wordmark · Monogram' },
  { name: 'Print Collateral', detail: 'Stationery · Editorial · Lookbooks' },
];

function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container container-wide">
        <RevealOnScroll className="services-head" stagger>
          <div>
            <div className="section-eyebrow" style={{marginBottom: 22}}>
              <span className="rule"></span>
              Services
            </div>
            <h2>What I <em>make</em>.</h2>
          </div>
          <p>
            A focused practice — I take on a small number of projects per year so each one gets the time it deserves. Engagements typically run 6 — 12 weeks, with strategy baked in from week one.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="services-list" stagger>
          {SERVICES.map((s) => (
            <div className="service-row" key={s.name}>
              <div>
                <div className="service-name">{s.name}</div>
                <div className="service-detail">{s.detail}</div>
              </div>
              <div className="service-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </div>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
const FAQS = [
  {
    q: 'What is your design process?',
    a: 'Every engagement begins with a quiet week of listening — to you, your customers, and your category. From there we move into research and concept, then refinement of the chosen route into a complete identity system and guidelines. Communication is weekly; surprise is not part of the process.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A standalone logo runs 3 — 4 weeks. A complete brand identity — strategy, wordmark, system, applications, and guidelines — runs 8 — 12 weeks. I give you a detailed timeline in week one so the entire engagement is mapped before we begin.',
  },
  {
    q: 'What do you need from me to get started?',
    a: "We'll start with a call to kick things off — a chance for me to learn about your business, your audience, and what you're really trying to build. I bring questions; you bring the context only you can give. By the end of that call we'll both have a clear sense of what the engagement should look like and whether we're the right fit.",
  },
  {
    q: 'How many rounds of revisions are included?',
    a: 'Each phase includes two structured rounds of refinement. In practice we rarely need them — the upfront discovery and three initial directions are designed to surface the right answer early. If we need a third pass we figure it out together; it has never been a problem.',
  },
  {
    q: 'What are your payment terms?',
    a: '50% deposit to begin, 50% on delivery. For larger engagements I split the balance into milestone-based payments at the close of each phase. All invoicing is handled through Stripe, in USD.',
  },
];

function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <div className="container container-wide">
        <div className="faq-grid">
          <RevealOnScroll className="faq-side reveal" stagger>
            <div className="side-eyebrow">
              <span className="rule"></span>
              Frequently Asked
            </div>
            <h2>Frequently <em>asked</em>.</h2>
            <p>
              The honest answers I give to most founders before we begin. If your question isn't here, write me — I respond personally within 48 hours.
            </p>
          </RevealOnScroll>
          <RevealOnScroll className="faq-list reveal" stagger>
            {FAQS.map((f, i) => (
              <details key={i} className="faq-item" open={i === 0}>
                <summary>
                  <span className="q-text">{f.q}</span>
                  <span className="q-icon"></span>
                </summary>
                <div className="q-answer">{f.a}</div>
              </details>
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ---------- CONTACT ----------
function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <RevealOnScroll className="reveal" stagger>
          <div className="eyebrow">
            <span className="swatch"></span>
            Let's begin
          </div>
          <h2 className="contact-headline">
            Let's <em>create</em> something<br/>
            worth keeping.
          </h2>
          <p className="contact-sub">
            I take on a handful of projects each year. If we're a good fit, I'll write back within two business days with a few questions and a proposed start date.
          </p>
          <a href="mailto:mary@maryskinnerdesigns.com" className="contact-email">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="5" width="18" height="14" rx="1"/>
              <path d="M3 7l9 6 9-6"/>
            </svg>
            mary@maryskinnerdesigns.com
          </a>
          <div className="contact-socials" aria-label="Social links">
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 11v6M8 8v.01M12 17v-4a2 2 0 014 0v4M16 17v-3"/></svg>
            </a>
            <a href="#" aria-label="Are.na">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18"/></svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ---------- APP ----------
function App() {
  // Marquee names are derived from FEATURED so anything added to the work list
  // automatically appears in the ticker.
  const brandNames = useMemo(() => FEATURED.map((p) => p.title), []);

  // After mount, if there's a hash in the URL, scroll to that section
  // (React renders the sections client-side, so the browser's default
  // hash-jump fires before the targets exist.)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'auto' });
      }
    });
  }, []);

  return (
    <>
      <CursorFollower />
      <Header />
      <main>
        <Hero />
        <Statement />
        <Marquee items={brandNames} ariaLabel="Selected clients" />
        <Work />
        <About />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
