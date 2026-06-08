import type { ReactNode } from "react";
import { kpiGridClass } from "./kpi-styles";

interface KpiGridProps {
  count: number;
  children: ReactNode;
  className?: string;
}

export function KpiGrid({ count, children, className = "" }: KpiGridProps) {
  return (
    <div className={`${kpiGridClass(count)} ${className}`.trim()}>
      {children}
    </div>
  );
}
