import { useState, useEffect, useRef } from 'react';
import { IconButton } from './IconButton.jsx';
import { IconMenu, IconClose, IconInstagram } from './Icons.jsx';

const s = {
  bar: (solid, menuOpen) => ({
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
    height: 'var(--sz-nav-h)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 var(--sz-gutter)',
    background: solid ? 'rgba(10,10,11,0.72)' : 'transparent',
    backdropFilter: solid && !menuOpen ? 'var(--sz-blur)' : 'none',
    WebkitBackdropFilter: solid && !menuOpen ? 'var(--sz-blur)' : 'none',
    borderBottom: `1px solid ${solid ? 'var(--sz-ink-700)' : 'transparent'}`,
    transition: 'background var(--sz-dur) var(--sz-ease), border-color var(--sz-dur) var(--sz-ease)',
  }),
  brand: { display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'var(--sz-paper)' },
  word:  { fontFamily: 'var(--sz-font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 },
  links: { display: 'flex', alignItems: 'center', gap: 34 },
  link:  { fontFamily: 'var(--sz-font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: 'var(--sz-track-wide)', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--sz-paper)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 },
};

const ITEMS = [{ id: 'work', label: 'Work' }, { id: 'bio', label: 'Biography' }];

export function Nav({ onNav }) {
  const [solid, setSolid]   = useState(false);
  const [open, setOpen]     = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 760);
  const resizeTimer         = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    const onResize = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => setMobile(window.innerWidth < 760), 150);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (id) => { setOpen(false); onNav?.(id); };

  return (
    <>
      <nav style={s.bar(solid || open, open)} aria-label="Site navigation">
        <a href="#top" style={s.brand} onClick={(e) => { e.preventDefault(); go('top'); }}>
          <span style={s.word}>Harsha Pamu</span>
        </a>

        {!mobile && (
          <div style={s.links}>
            {ITEMS.map((it) => (
              <button key={it.id} type="button" style={s.link} className="sz-nav-link" onClick={() => go(it.id)}>
                {it.label}
              </button>
            ))}
            <a
              href="https://www.instagram.com/shellzero"
              target="_blank" rel="noreferrer"
              className="sz-nav-link"
              style={{ ...s.link, display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <IconInstagram size={16} aria-hidden /> @shellzero
            </a>
          </div>
        )}

        {mobile && (
          <IconButton
            label={open ? 'Close menu' : 'Open menu'}
            variant="ghost"
            aria-expanded={open}
            aria-controls="sz-mobile-nav"
            style={{ color: 'var(--sz-paper)' }}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </IconButton>
        )}
      </nav>

      {mobile && open && (
        <div
          id="sz-mobile-nav"
          role="dialog"
          aria-label="Navigation menu"
          className="sz-mnav"
          style={{
            position: 'fixed', inset: 0, zIndex: 59,
            background: 'var(--sz-ink)',
            display: 'flex', flexDirection: 'column',
            padding: 'calc(var(--sz-nav-h) + 32px) var(--sz-gutter) 40px',
          }}
        >
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {ITEMS.map((it, i) => (
              <button
                key={it.id}
                type="button"
                onClick={() => go(it.id)}
                className="sz-mnav-item"
                style={{ animationDelay: `${60 + i * 70}ms` }}
              >
                <span className="sz-mnav-index">{String(i + 1).padStart(2, '0')}</span>
                {it.label}
              </button>
            ))}
          </nav>

          <div className="sz-mnav-footer" style={{ animationDelay: `${60 + ITEMS.length * 70}ms` }}>
            <a
              href="https://www.instagram.com/shellzero"
              target="_blank" rel="noreferrer"
              className="sz-mnav-social"
            >
              <IconInstagram size={20} aria-hidden />
              @shellzero
            </a>
          </div>
        </div>
      )}
    </>
  );
}
