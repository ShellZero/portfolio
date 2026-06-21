import { useEffect, useRef } from 'react';
import { MetaLine } from './MetaLine.jsx';
import { IconButton } from './IconButton.jsx';
import { IconClose, IconArrow, IconArrowLeft } from './Icons.jsx';

export function Lightbox({ plates, index, onClose, onIndex }) {
  const closeRef   = useRef(null);
  const prevRef    = useRef(null);
  const nextRef    = useRef(null);
  const prevFocus  = useRef(null);
  const touchStartX = useRef(null);

  const isOpen = index != null;

  // Save focus when opening; restore it when closing.
  useEffect(() => {
    if (!isOpen) return;
    prevFocus.current = document.activeElement;
    closeRef.current?.focus();
    return () => { prevFocus.current?.focus(); };
  }, [isOpen]);

  // Keyboard: Esc / arrows / Tab trap.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowRight') { onIndex((index + 1) % plates.length); return; }
      if (e.key === 'ArrowLeft')  { onIndex((index - 1 + plates.length) % plates.length); return; }
      if (e.key === 'Tab') {
        const nodes = [prevRef.current, closeRef.current, nextRef.current].filter(Boolean);
        const cur   = nodes.indexOf(document.activeElement);
        e.preventDefault();
        const next = e.shiftKey ? (cur - 1 + nodes.length) % nodes.length : (cur + 1) % nodes.length;
        nodes[next]?.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [isOpen, index, plates.length, onClose, onIndex]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) onIndex((index + 1) % plates.length);
    else         onIndex((index - 1 + plates.length) % plates.length);
  };

  if (!isOpen) return null;
  const p = plates[index];

  const navBtn = {
    position: 'absolute',
    background: 'none',
    border: 'none',
    color: 'var(--sz-paper)',
    cursor: 'pointer',
    opacity: 0.7,
    padding: 16,
    minWidth: 44,
    minHeight: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(6,6,7,0.96)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '20px var(--sz-gutter)' }}>
        {/* <MetaLine items={[`Plate ${String(p.id).padStart(3, '0')}`, ...(p.meta ?? [])]} /> */}
        <div onClick={(e) => e.stopPropagation()}>
          <IconButton ref={closeRef} label="Close lightbox" variant="glass" onClick={onClose}>
            <IconClose />
          </IconButton>
        </div>
      </div>

      <div
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 var(--sz-gutter) 12px', minHeight: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={prevRef}
          aria-label="Previous photo"
          onClick={() => onIndex((index - 1 + plates.length) % plates.length)}
          className="sz-lb-prev"
          style={{ ...navBtn, left: 'var(--sz-gutter)' }}
        >
          <IconArrowLeft size={28} />
        </button>

        <figure style={{ margin: 0, maxWidth: 'min(1100px, 92vw)', maxHeight: '78vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img
            src={p.src} alt={p.alt}
            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', filter: 'var(--sz-img-filter)', boxShadow: 'var(--sz-shadow-lg)' }}
          />
          {/* <figcaption style={{ fontFamily: 'var(--sz-font-display)', fontSize: 22, fontWeight: 500, color: 'var(--sz-paper)', textAlign: 'center' }}>
            {p.title}
          </figcaption> */}
        </figure>

        <button
          ref={nextRef}
          aria-label="Next photo"
          onClick={() => onIndex((index + 1) % plates.length)}
          className="sz-lb-next"
          style={{ ...navBtn, right: 'var(--sz-gutter)' }}
        >
          <IconArrow size={28} />
        </button>
      </div>

      <div style={{ textAlign: 'center', padding: '0 0 22px', fontFamily: 'var(--sz-font-mono)', fontSize: 11, letterSpacing: 'var(--sz-track-wide)', color: 'var(--sz-text-faint)' }}>
        {String(index + 1).padStart(2, '0')} / {String(plates.length).padStart(2, '0')}
      </div>
    </div>
  );
}
