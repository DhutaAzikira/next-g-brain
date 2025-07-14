export function GlassDisplacementFilter() {
  return (
    <>
      <svg id="lens-map" className="size-0">
        <linearGradient id="red" />
        <linearGradient id="blue" />
      </svg>

      <svg className="size-0">
        <defs>
          <filter id="glass-distortion" colorInterpolationFilters="sRGB">
            <feImage href="#lens-map" result="map" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
