import { useState } from "react";

export function PhotoFrame({
  src,
  alt = "",
  ratio = "3 / 2",
  bordered = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const interactive = !!onClick;

  const imageDiv = (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        aspectRatio: ratio,
        background: "var(--sz-bg-sunken)",
        border: bordered ? "var(--sz-hairline) solid var(--sz-border)" : "none",
        borderRadius: "var(--sz-radius-sm)",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: hover ? "var(--sz-img-filter-hover)" : "var(--sz-img-filter)",
          transform: hover ? "scale(1.04)" : "scale(1)",
          transition:
            "transform var(--sz-dur-slow) var(--sz-ease), filter var(--sz-dur) var(--sz-ease)",
        }}
      />
    </div>
  );

  return (
    <figure style={{ margin: 0, ...style }} {...rest}>
      {interactive ? (
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          aria-label={alt}
          style={{
            display: "block",
            width: "100%",
            padding: 0,
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          {imageDiv}
        </button>
      ) : (
        imageDiv
      )}
    </figure>
  );
}
