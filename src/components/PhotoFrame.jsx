import { useState } from 'react';

export function PhotoFrame({
  src,
  alt = '',
  ratio = '3 / 2',
  bordered = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);

  const interactive = !!onClick;

  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={onClick}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      style={{ margin: 0, cursor: interactive ? 'pointer' : 'default', ...style }}
      {...rest}
    >
      <div style={{
        position: 'relative', overflow: 'hidden', aspectRatio: ratio,
        background: 'var(--sz-bg-sunken)',
        border: bordered ? 'var(--sz-hairline) solid var(--sz-border)' : 'none',
        borderRadius: 'var(--sz-radius-sm)',
      }}>
        <img
          src={src} alt={alt} loading="lazy" decoding="async"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            filter: hover ? 'var(--sz-img-filter-hover)' : 'var(--sz-img-filter)',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform var(--sz-dur-slow) var(--sz-ease), filter var(--sz-dur) var(--sz-ease)',
          }}
        />
      </div>
    </figure>
  );
}
