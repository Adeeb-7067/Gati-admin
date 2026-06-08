/** Decorative logistics hero illustration for the dashboard welcome banner */
export function DashboardIllustration() {
  return (
    <svg
      className="pointer-events-none absolute -right-4 bottom-0 hidden h-44 w-64 opacity-95 sm:block md:-right-2 md:h-52 md:w-80 lg:h-56 lg:w-[22rem]"
      viewBox="0 0 320 200"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#heroSky)" />
      <g opacity="0.35" fill="white">
        <rect x="20" y="80" width="20" height="60" />
        <rect x="44" y="60" width="24" height="80" />
        <rect x="72" y="90" width="16" height="50" />
        <rect x="92" y="70" width="20" height="70" />
        <rect x="220" y="70" width="20" height="70" />
        <rect x="244" y="55" width="24" height="85" />
        <rect x="272" y="85" width="18" height="55" />
      </g>
      <g transform="translate(110 90)">
        <rect x="0" y="0" width="90" height="46" rx="6" fill="white" />
        <rect x="92" y="14" width="42" height="32" rx="4" fill="white" opacity="0.85" />
        <rect x="98" y="20" width="20" height="14" rx="2" fill="oklch(0.58 0.22 285)" />
        <circle cx="22" cy="50" r="10" fill="#1A1A2E" />
        <circle cx="22" cy="50" r="5" fill="white" />
        <circle cx="112" cy="50" r="10" fill="#1A1A2E" />
        <circle cx="112" cy="50" r="5" fill="white" />
        <text x="10" y="28" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="14" fontWeight="800" fill="oklch(0.58 0.22 285)">
          GATI
        </text>
      </g>
      <line x1="0" y1="160" x2="320" y2="160" stroke="white" strokeOpacity="0.4" strokeDasharray="8 8" strokeWidth="2" />
    </svg>
  );
}
