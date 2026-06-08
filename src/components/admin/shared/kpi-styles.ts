export type KpiTint = "primary" | "teal" | "success" | "warning" | "info" | "destructive";

export const kpiTintStyles: Record<
  KpiTint,
  {
    card: string;
    border: string;
    icon: string;
    iconRing: string;
    accent: string;
    glow: string;
    spark: string;
    orb: string;
  }
> = {
  primary: {
    card: "bg-gradient-to-br from-primary/[0.09] via-card/90 to-primary/[0.04]",
    border: "border-primary/25",
    icon: "bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
    iconRing: "ring-primary/30",
    accent: "from-primary via-primary/70 to-primary/30",
    glow: "from-primary/25 via-primary/8",
    spark: "stroke-primary",
    orb: "bg-primary/20",
  },
  teal: {
    card: "bg-gradient-to-br from-teal/[0.10] via-card/90 to-teal/[0.04]",
    border: "border-teal/30",
    icon: "bg-gradient-to-br from-teal/25 to-teal/5 text-[oklch(0.48_0.13_185)]",
    iconRing: "ring-teal/35",
    accent: "from-teal via-teal/70 to-teal/30",
    glow: "from-teal/25 via-teal/8",
    spark: "stroke-teal",
    orb: "bg-teal/20",
  },
  success: {
    card: "bg-gradient-to-br from-success/[0.10] via-card/90 to-success/[0.04]",
    border: "border-success/30",
    icon: "bg-gradient-to-br from-success/20 to-success/5 text-success",
    iconRing: "ring-success/35",
    accent: "from-success via-success/70 to-success/30",
    glow: "from-success/25 via-success/8",
    spark: "stroke-success",
    orb: "bg-success/20",
  },
  warning: {
    card: "bg-gradient-to-br from-warning/[0.12] via-card/90 to-warning/[0.04]",
    border: "border-warning/35",
    icon: "bg-gradient-to-br from-warning/30 to-warning/8 text-[oklch(0.52_0.16_75)]",
    iconRing: "ring-warning/40",
    accent: "from-warning via-warning/70 to-warning/30",
    glow: "from-warning/30 via-warning/10",
    spark: "stroke-warning",
    orb: "bg-warning/25",
  },
  info: {
    card: "bg-gradient-to-br from-info/[0.10] via-card/90 to-info/[0.04]",
    border: "border-info/30",
    icon: "bg-gradient-to-br from-info/20 to-info/5 text-info",
    iconRing: "ring-info/35",
    accent: "from-info via-info/70 to-info/30",
    glow: "from-info/25 via-info/8",
    spark: "stroke-info",
    orb: "bg-info/20",
  },
  destructive: {
    card: "bg-gradient-to-br from-destructive/[0.09] via-card/90 to-destructive/[0.04]",
    border: "border-destructive/25",
    icon: "bg-gradient-to-br from-destructive/18 to-destructive/5 text-destructive",
    iconRing: "ring-destructive/30",
    accent: "from-destructive via-destructive/70 to-destructive/30",
    glow: "from-destructive/25 via-destructive/8",
    spark: "stroke-destructive",
    orb: "bg-destructive/18",
  },
};

/** Responsive KPI grid — adapts column count to number of items */
export function kpiGridClass(count: number) {
  if (count <= 2) return "grid grid-cols-1 gap-4 sm:grid-cols-2";
  if (count === 3) return "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";
  if (count === 4) return "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4";
  if (count === 5) return "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
  return "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6";
}

/** Sparkline paths — varied curves per card index */
export const KPI_SPARKLINE_PATHS = [
  "M0 18 L8 14 L16 16 L24 10 L32 12 L40 6 L48 9 L56 4 L64 7 L72 2",
  "M0 12 L8 16 L16 8 L24 14 L32 6 L40 10 L48 4 L56 8 L64 3 L72 6",
  "M0 16 L8 10 L16 14 L24 6 L32 12 L40 8 L48 14 L56 5 L64 10 L72 3",
  "M0 8 L8 12 L16 6 L24 10 L32 14 L40 7 L48 11 L56 4 L64 9 L72 2",
  "M0 14 L8 8 L16 12 L24 4 L32 10 L40 6 L48 12 L56 7 L64 4 L72 8",
  "M0 10 L8 14 L16 6 L24 12 L32 8 L40 14 L48 6 L56 11 L64 5 L72 9",
];
