/**
 * Shellzero Button — quiet, editorial. Sharp corners, hairline borders,
 * uppercase grotesque label with wide tracking. Filmic hover.
 */
export function Button({
  children,
  variant = "solid",
  size = "md",
  as = "button",
  href,
  iconLeft,
  iconRight,
  disabled = false,
  full = false,
  style,
  target,
  rel,
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: "0.6875rem", gap: 8 },
    md: { padding: "13px 24px", fontSize: "0.75rem", gap: 10 },
    lg: { padding: "18px 34px", fontSize: "0.8125rem", gap: 12 },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: full ? "flex" : "inline-flex",
    width: full ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontFamily: "var(--sz-font-sans)",
    fontSize: s.fontSize,
    fontWeight: "var(--sz-w-medium)",
    letterSpacing: "var(--sz-track-wide)",
    textTransform: "uppercase",
    lineHeight: 1,
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "var(--sz-hairline) solid transparent",
    borderRadius: "var(--sz-radius-sm)",
    transition:
      "background var(--sz-dur) var(--sz-ease), color var(--sz-dur) var(--sz-ease), border-color var(--sz-dur) var(--sz-ease), opacity var(--sz-dur) var(--sz-ease)",
    opacity: disabled ? 0.4 : 1,
    WebkitFontSmoothing: "antialiased",
  };

  const variants = {
    solid: { background: "var(--sz-text)", color: "var(--sz-bg)", borderColor: "var(--sz-text)" },
    outline: {
      background: "transparent",
      color: "var(--sz-text)",
      borderColor: "var(--sz-border-strong)",
    },
    ghost: { background: "transparent", color: "var(--sz-text)", borderColor: "transparent" },
    accent: {
      background: "var(--sz-accent)",
      color: "var(--sz-on-accent)",
      borderColor: "var(--sz-accent)",
    },
  };

  const Tag = href ? "a" : as;
  const safeRel = target === "_blank" ? (rel ?? "noopener noreferrer") : rel;
  return (
    <Tag
      href={href}
      target={target}
      rel={safeRel}
      aria-disabled={disabled || undefined}
      style={{ ...base, ...(variants[variant] || variants.solid), ...style }}
      {...rest}
    >
      {iconLeft ? (
        <span aria-hidden style={{ display: "inline-flex" }}>
          {iconLeft}
        </span>
      ) : null}
      {children}
      {iconRight ? (
        <span aria-hidden style={{ display: "inline-flex" }}>
          {iconRight}
        </span>
      ) : null}
    </Tag>
  );
}
