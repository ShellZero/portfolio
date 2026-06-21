import { Button } from './Button.jsx';
import { IconArrowUpRight } from './Icons.jsx';

const s = {
  section: { background: 'var(--sz-paper)', color: 'var(--sz-ink)', padding: 'var(--sz-space-10) var(--sz-gutter)' },
  inner:   { maxWidth: 'var(--sz-maxw)', margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 'var(--sz-space-9)', alignItems: 'center' },
  figure:  { margin: 0, position: 'relative' },
  img:     { width: '100%', aspectRatio: '4.5 / 5', objectFit: 'cover', filter: 'var(--sz-img-filter)', borderRadius: 'var(--sz-radius-sm)', display: 'block' },
  eyebrow: { fontFamily: 'var(--sz-font-mono)', fontSize: 11, letterSpacing: 'var(--sz-track-widest)', textTransform: 'uppercase', color: 'var(--sz-text-faint)', marginBottom: 24 },
  lede:    { fontFamily: 'var(--sz-font-display)', fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)', fontWeight: 400, lineHeight: 1.18, letterSpacing: '-0.01em', margin: '0 0 28px', color: 'var(--sz-ink)' },
  body:    { fontFamily: 'var(--sz-font-sans)', fontSize: 'var(--sz-text-md)', lineHeight: 1.7, color: 'var(--sz-grey-600)', maxWidth: '54ch', margin: '0 0 18px' },
  facts:   { display: 'flex', gap: 40, marginTop: 36, flexWrap: 'wrap' },
  fact:    { display: 'flex', flexDirection: 'column', gap: 6 },
  fk:      { fontFamily: 'var(--sz-font-mono)', fontSize: 10, letterSpacing: 'var(--sz-track-widest)', textTransform: 'uppercase', color: 'var(--sz-text-faint)' },
  fv:      { fontFamily: 'var(--sz-font-display)', fontSize: 24, fontWeight: 500, color: 'var(--sz-ink)' },
};

export function Bio({ profileSrc }) {
  return (
    <section id="bio" aria-label="Biography" style={s.section}>
      <div style={s.inner} className="sz-bio-inner">
        <figure style={s.figure}>
          <img src={profileSrc} alt="Harsha Pamu with a rangefinder camera" style={s.img} />
        </figure>

        <div>
          <h2 style={{ ...s.eyebrow, margin: 0, marginBottom: 24 }}>Biography</h2>
          <p style={s.lede}>Harsha Pamu is a street photographer based in Los Angeles, chasing the raw beauty of the street — minimalism, chaos, and striking silhouettes.</p>
          <p style={s.body}>His photography has earned a place in LA art shows and exhibitions across galleries in the city. Aside from photography he is a cook and a software engineer — and he remains committed to capturing the soul of the street, one frame at a time.</p>
          <div style={s.facts} className="sz-bio-facts">
            <div style={s.fact}><span style={s.fk}>Based in</span><span style={s.fv}>Los Angeles</span></div>
            <div style={s.fact}><span style={s.fk}>Medium</span><span style={s.fv}>28mm · Digital</span></div>
            {/* <div style={s.fact}><span style={s.fk}>Plates</span><span style={s.fv}>043</span></div> */}
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button variant="accent" href="https://www.instagram.com/shellzero" target="_blank" iconRight={<IconArrowUpRight size={15} />}>
              Follow @shellzero
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
