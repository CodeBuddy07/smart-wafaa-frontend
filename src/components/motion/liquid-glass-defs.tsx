/**
 * SVG filter that `glass-refract` references through `backdrop-filter: url()`.
 * A low-frequency turbulence displaces the blurred backdrop a few pixels,
 * which reads as glass lensing. Rendered once in the root layout.
 */
export function LiquidGlassDefs() {
  return (
    <svg aria-hidden className="pointer-events-none absolute size-0" focusable="false">
      <filter
        id="lg-refract"
        x="-5%"
        y="-5%"
        width="110%"
        height="110%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.006 0.014"
          numOctaves="2"
          seed="11"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="3" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="10"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
