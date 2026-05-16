// shared.jsx — Mary Skinner site: shared chrome + motion helpers
// Globals: Header, Footer, useReveal, RevealOnScroll, CursorFollower, Marquee

const { useEffect, useRef, useState, useCallback } = React;

// ---------- Reveal-on-scroll ----------
function useReveal(opts = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: opts.threshold ?? 0.18, rootMargin: opts.rootMargin ?? '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function RevealOnScroll({ as: Tag = 'div', stagger = false, children, className = '', ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`${stagger ? 'reveal-stagger' : 'reveal'} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ---------- Split letters wordmark ----------
function SplitWord({ text, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const id = setTimeout(() => {
      if (ref.current) ref.current.classList.add('in');
    }, delay);
    return () => clearTimeout(id);
  }, [delay]);
  return (
    <span ref={ref} className={`split-word ${className}`}>
      {Array.from(text).map((c, i) => (
        <span key={i} style={{ transitionDelay: `${i * 30}ms` }}>{c === ' ' ? '\u00A0' : c}</span>
      ))}
    </span>
  );
}

// ---------- Header ----------
function Header({ darkPage = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${darkPage ? 'dark-page' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container container-wide">
        <div className="header-inner">
          <a href="index.html" className="brand-mark" aria-label="Mary Skinner Designs — home">
            <span className="brand-wordmark">Mary Skinner Designs</span>
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              <li><a href="index.html#work" className="nav-link">Work</a></li>
              <li><a href="index.html#about" className="nav-link">About</a></li>
              <li><a href="index.html#services" className="nav-link">Services</a></li>
              <li><a href="index.html#faq" className="nav-link">FAQ</a></li>
              <li>
                <a href="index.html#contact" className="nav-cta">
                  <span className="dot"></span>
                  Currently booking — 2026
                </a>
              </li>
            </ul>
          </nav>

          {/* Hamburger — phone only */}
          <button
            className={`nav-hamburger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`nav-overlay ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="nav-overlay-inner">
          <a href="index.html#work" className="nav-overlay-link" onClick={closeMenu}>Work</a>
          <a href="index.html#about" className="nav-overlay-link" onClick={closeMenu}>About</a>
          <a href="index.html#services" className="nav-overlay-link" onClick={closeMenu}>Services</a>
          <a href="index.html#faq" className="nav-overlay-link" onClick={closeMenu}>FAQ</a>
          <a href="index.html#contact" className="nav-overlay-cta" onClick={closeMenu}>
            <span className="dot"></span>
            Currently booking — 2026
          </a>
        </nav>
      </div>
    </header>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container container-wide">
        <div className="footer-grid footer-grid--lean">
          <div>
            <div className="footer-cta-line">
              Have a brand worth <em>slowing down for?</em>
            </div>
            <a href="mailto:mary@maryskinnerdesigns.com" className="btn">
              Start a project
              <span className="btn-arrow">→</span>
            </a>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:mary@maryskinnerdesigns.com">mary@maryskinnerdesigns.com</a></li>
            </ul>
          </div>
          <div>
            <h4>Studio Hours</h4>
            <ul>
              <li>Mon — Fri</li>
              <li>9am — 5pm ET</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} — Mary Skinner Designs</span>
          <span><span style={{color:'var(--magenta)'}}>●</span> Booking 2026</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Cursor follower ----------
function CursorFollower() {
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX, curY = targetY;
    let raf;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!dot.classList.contains('show')) dot.classList.add('show');
    };
    const onLeave = () => { dot.classList.remove('show'); };

    const tick = () => {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      dot.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    // hover detection for tiles
    const onOver = (e) => {
      const tile = e.target.closest && e.target.closest('[data-cursor-tile]');
      if (tile) {
        dot.classList.add('is-hovering-tile');
        const lbl = tile.getAttribute('data-cursor-label') || 'View →';
        if (labelRef.current) labelRef.current.textContent = lbl;
      } else {
        dot.classList.remove('is-hovering-tile');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    tick();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={dotRef} className="cursor-dot" aria-hidden="true">
      <span ref={labelRef} className="cursor-label">View →</span>
    </div>
  );
}

// ---------- Marquee ----------
function Marquee({ items, ariaLabel = 'Brand marquee' }) {
  // duplicate items so the loop is seamless
  const doubled = [...items, ...items];
  return (
    <section className="marquee" aria-label={ariaLabel}>
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <span key={i} className="marquee-item">
            <span>{it}</span>
            <span className="sep"></span>
          </span>
        ))}
      </div>
    </section>
  );
}

// expose globals
Object.assign(window, {
  useReveal,
  RevealOnScroll,
  SplitWord,
  Header,
  Footer,
  CursorFollower,
  Marquee,
});
