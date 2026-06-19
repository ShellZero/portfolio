import { forwardRef } from 'react';

/**
 * Square icon button — for nav, lightbox controls, carousel arrows.
 * Pass a Lucide/Feather SVG (or any node) as children.
 */
export const IconButton = forwardRef(function IconButton({
  children,
  label,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  style,
  ...rest
}, ref) {
  const sizes = { sm: 34, md: 44, lg: 56 };
  const dim = sizes[size] || sizes.md;

  const variants = {
    ghost: { background: 'transparent', color: 'var(--sz-text)', borderColor: 'transparent' },
    outline: { background: 'transparent', color: 'var(--sz-text)', borderColor: 'var(--sz-border-strong)' },
    solid: { background: 'var(--sz-text)', color: 'var(--sz-bg)', borderColor: 'var(--sz-text)' },
    glass: { background: 'var(--sz-veil-paper)', color: 'var(--sz-text)', borderColor: 'transparent', backdropFilter: 'var(--sz-blur)', WebkitBackdropFilter: 'var(--sz-blur)' },
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'var(--sz-hairline) solid transparent',
        borderRadius: 'var(--sz-radius-sm)',
        opacity: disabled ? 0.4 : 1,
        transition: 'background var(--sz-dur) var(--sz-ease), color var(--sz-dur) var(--sz-ease), border-color var(--sz-dur) var(--sz-ease)',
        ...(variants[variant] || variants.ghost),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
