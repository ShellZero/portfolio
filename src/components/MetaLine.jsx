import { Fragment } from 'react';

/**
 * MetaLine — technical caption row, EXIF style. Monospace, faint, with
 * a dividing middot. Pass an array of strings as `items`.
 */
export function MetaLine({ items = [], align = 'left', style, ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '10px',
        justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
        fontFamily: 'var(--sz-font-mono)',
        fontSize: 'var(--sz-text-xs)',
        letterSpacing: 'var(--sz-track-wide)',
        textTransform: 'uppercase',
        color: 'var(--sz-text-faint)',
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 ? <span aria-hidden style={{ opacity: 0.5 }}>·</span> : null}
          <span>{it}</span>
        </Fragment>
      ))}
    </div>
  );
}
