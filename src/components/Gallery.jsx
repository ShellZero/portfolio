import { PhotoFrame } from './PhotoFrame.jsx';

const LAYOUT = [
  { c: 7, r: '3 / 2' }, { c: 5, r: '3 / 4' },
  { c: 5, r: '3 / 4' }, { c: 7, r: '3 / 2' },
  { c: 4, r: '3 / 4' }, { c: 4, r: '3 / 4' }, { c: 4, r: '3 / 4' },
  { c: 6, r: '3 / 2' }, { c: 6, r: '3 / 2' },
];

const s = {
  section: { position: 'relative', background: 'var(--sz-ink)', padding: 'var(--sz-space-8) var(--sz-gutter) var(--sz-space-9)' },
  head:    { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 'var(--sz-space-8)', maxWidth: 'var(--sz-maxw)', marginLeft: 'auto', marginRight: 'auto' },
  eyebrow: { fontFamily: 'var(--sz-font-mono)', fontSize: 11, letterSpacing: 'var(--sz-track-widest)', textTransform: 'uppercase', color: 'var(--sz-text-faint)', marginBottom: 18 },  
  h2:      { fontFamily: 'var(--sz-font-display)', fontSize: 'var(--sz-display-md)', fontWeight: 500, letterSpacing: 'var(--sz-track-tight)', lineHeight: 1, margin: 0, color: 'var(--sz-paper)' },
  grid:    { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--sz-space-6)', maxWidth: 'var(--sz-maxw)', margin: '0 auto' },
};

export function Gallery({ plates, onOpen }) {
  return (
    <section id="work" aria-label="Photography portfolio" style={s.section}>
      <div style={s.head}>
        <div>
          <div style={s.eyebrow}>Selected Work — {String(plates.length).padStart(2, '0')} plates</div>
          <h2 style={s.h2}>The street, unposed.</h2>
        </div>
      </div>

      <div className="sz-gallery-grid" style={s.grid}>
        {plates.map((p, i) => {
          const L = LAYOUT[i % LAYOUT.length];
          return (
            <div key={p.id}
              style={{ gridColumn: `span ${L.c}`, transitionDelay: `${(i % 3) * 80}ms` }}
              className="sz-cell" data-reveal>
              <PhotoFrame
                src={p.src} alt={p.alt}
                ratio={L.r} bordered={false} onClick={() => onOpen(i)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
