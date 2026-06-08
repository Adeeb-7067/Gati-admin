import { motion } from "framer-motion";
import { Icons, type IconName } from "./icon";
import { formatINRShort } from "@/lib/mock-data";
import { kpiTintStyles, type KpiTint } from "./shared/kpi-styles";
import { KpiDeltaBadge, KpiDotGrid, KpiIconBadge, KpiSparkline } from "./shared/KpiCardVisuals";

interface Props {
  label: string;
  value: number | string;
  icon: IconName;
  tint: KpiTint;
  delta?: number;
  up?: boolean;
  isCurrency?: boolean;
  active?: boolean;
  onClick?: () => void;
  index?: number;
  animated?: boolean;
}

export function StatChip({
  label,
  value,
  icon,
  tint,
  delta,
  up = true,
  isCurrency,
  active,
  onClick,
  index = 0,
  animated = true,
}: Props) {
  const Icon = Icons[icon];
  const style = kpiTintStyles[tint];
  const display =
    typeof value === "number"
      ? isCurrency
        ? formatINRShort(value)
        : value.toLocaleString("en-IN")
      : value;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={animated ? { opacity: 0, y: 16, scale: 0.97 } : false}
      animate={animated ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full min-w-0 overflow-hidden rounded-2xl border p-4 text-left shadow-card backdrop-blur-xl transition-all duration-300 hover:shadow-card-hover ${style.card} ${style.border} ${
        active ? "ring-2 ring-primary/35 shadow-glow-primary" : ""
      }`}
    >
      <KpiDotGrid className="text-foreground/[0.035]" />

      <motion.div
        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl ${style.orb}`}
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/[0.05]" />
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${style.accent}`} />

      <div className="relative flex gap-3.5">
        <KpiIconBadge icon={style.icon} iconRing={style.iconRing}>
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </KpiIconBadge>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              {label}
            </p>
            {delta !== undefined && (
              <span className="hidden shrink-0 sm:inline-flex">
                <KpiDeltaBadge delta={delta} up={up} />
              </span>
            )}
          </div>

          <div className="mt-1 font-display text-[22px] font-extrabold leading-tight tabular-nums tracking-tight">
            {display}
          </div>

          {delta !== undefined && (
            <p className={`mt-0.5 flex items-center gap-1 text-[11px] font-semibold sm:hidden ${up ? "text-success" : "text-destructive"}`}>
              {up ? "▲" : "▼"} {delta}%
            </p>
          )}

          <KpiSparkline index={index} strokeClass={style.spark} up={up} />
        </div>
      </div>

      {active && (
        <div className="absolute bottom-3 right-3 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </div>
      )}
    </motion.button>
  );
}
