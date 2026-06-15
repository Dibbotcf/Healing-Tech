"use client";

interface RouteData {
  start: { lat: number; lng: number; label?: string };
  end:   { lat: number; lng: number; label?: string };
}

interface MapProps {
  dots?:      RouteData[];
  lineColor?: string;
}

const W = 1000;
const H = 460;

function project(lat: number, lng: number) {
  return {
    x: Math.round(((lng + 180) / 360) * W),
    y: Math.round(((90  - lat) / 180) * H),
  };
}

function arcPath(sx: number, sy: number, ex: number, ey: number): string {
  const cx = (sx + ex) / 2;
  const cy = Math.min(sy, ey) - 80;
  return `M ${sx},${sy} Q ${cx},${cy} ${ex},${ey}`;
}

export function WorldMap({ dots = [], lineColor = "#12B5CB" }: MapProps) {
  if (dots.length === 0) return null;

  const dest = project(dots[0].end.lat, dots[0].end.lng);

  return (
    <div className="w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        aria-label="Global supply route map to Bangladesh"
      >
        <defs>
          <pattern id="mapdots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="11" cy="11" r="1.1" fill="#CBD5E1" />
          </pattern>
        </defs>

        {/* Dot-grid background */}
        <rect width={W} height={H} fill="url(#mapdots)" rx="12" />

        {/* Animated arcs from each source country → Bangladesh */}
        {dots.map((route, i) => {
          const src = project(route.start.lat, route.start.lng);
          return (
            <path
              key={i}
              d={arcPath(src.x, src.y, dest.x, dest.y)}
              stroke={lineColor}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              strokeLinecap="round"
              style={{
                animation: "draw-arc 1.8s ease-out forwards",
                animationDelay: `${i * 0.1}s`,
                opacity: 0.6,
              }}
            />
          );
        })}

        {/* Source dots — appear after their arc finishes */}
        {dots.map((route, i) => {
          const src = project(route.start.lat, route.start.lng);
          return (
            <circle
              key={`src-${i}`}
              cx={src.x}
              cy={src.y}
              r="3.5"
              fill={lineColor}
              style={{
                animation: "fade-in-dot 0.4s ease-out forwards",
                animationDelay: `${i * 0.1 + 1.6}s`,
                opacity: 0,
              }}
            />
          );
        })}

        {/* Destination — Bangladesh — concentric glow rings */}
        <circle cx={dest.x} cy={dest.y} r="22" fill={lineColor} opacity="0.07" />
        <circle cx={dest.x} cy={dest.y} r="12" fill={lineColor} opacity="0.13" />
        <circle cx={dest.x} cy={dest.y} r="5"  fill={lineColor} />

        {/* Destination label */}
        <text
          x={dest.x}
          y={dest.y - 22}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#00355D"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Bangladesh
        </text>
      </svg>
    </div>
  );
}
