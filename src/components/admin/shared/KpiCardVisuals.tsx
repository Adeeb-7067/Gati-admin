import { KPI_SPARKLINE_PATHS } from "./kpi-styles";

export function KpiDotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.45] ${className}`}
      style={{
        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

export function KpiSparkline({
  index = 0,
  strokeClass,
  up = true,
}: {
  index?: number;
  strokeClass: string;
  up?: boolean;
}) {
  const path = KPI_SPARKLINE_PATHS[index % KPI_SPARKLINE_PATHS.length];
  const fillPath = `${path} L72 24 L0 24 Z`;
  const gradId = `spark-fill-${index % KPI_SPARKLINE_PATHS.length}`;
  const textClass = strokeClass.replace("stroke-", "text-");

  return (
    <div className={`relative mt-3 h-9 w-full overflow-hidden ${textClass}`}>
      <svg viewBox="0 0 72 24" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill={`url(#${gradId})`} stroke="none" />
        <path
          d={path}
          fill="none"
          className={strokeClass}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        className={`absolute right-0 top-0.5 flex h-4 w-4 items-center justify-center rounded text-[8px] font-bold ${
          up ? "text-success" : "text-destructive"
        }`}
      >
        {up ? "↗" : "↘"}
      </div>
    </div>
  );
}

export function KpiIconBadge({
  children,
  iconRing,
  icon,
}: {
  children: React.ReactNode;
  iconRing: string;
  icon: string;
}) {
  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-inset backdrop-blur-sm ${icon} ${iconRing}`}
    >
      {children}
    </div>
  );
}

export function KpiDeltaBadge({ delta, up }: { delta: number; up?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm ${
        up
          ? "border-success/25 bg-success/10 text-success"
          : "border-destructive/20 bg-destructive/10 text-destructive"
      }`}
    >
      <span className="text-[10px]">{up ? "▲" : "▼"}</span>
      {delta}%
    </span>
  );
}
