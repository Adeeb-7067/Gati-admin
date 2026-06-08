import { motion } from "framer-motion";
import { Icons, type IconName } from "./icon";
import { formatINRShort } from "@/lib/mock-data";
import { kpiTintStyles, type KpiTint } from "./shared/kpi-styles";
import { KpiDeltaBadge, KpiDotGrid, KpiIconBadge, KpiSparkline } from "./shared/KpiCardVisuals";

interface DashboardKpiCardProps {
  label: string;
  value: number | string;
  icon: IconName;
  tint: KpiTint;
  delta?: number;
  up?: boolean;
  isCurrency?: boolean;
  index?: number;
}

export function DashboardKpiCard({
  label,
  value,
  icon,
  tint,
  delta,
  up = true,
  isCurrency,
  index = 0,
}: DashboardKpiCardProps) {
  const Icon = Icons[icon];
  const style = kpiTintStyles[tint];
  const display =
    typeof value === "number"
      ? isCurrency
        ? formatINRShort(value)
        : value.toLocaleString("en-IN")
      : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border p-5 shadow-card backdrop-blur-xl transition-shadow duration-300 hover:shadow-card-hover ${style.card} ${style.border}`}
    >
      <KpiDotGrid className="text-foreground/[0.04]" />

      <motion.div
        className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl ${style.orb}`}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent dark:from-white/[0.06]" />

      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${style.accent} opacity-80`} />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <KpiIconBadge icon={style.icon} iconRing={style.iconRing}>
            <Icon className="h-5 w-5" strokeWidth={2.25} />
          </KpiIconBadge>
          {delta !== undefined && <KpiDeltaBadge delta={delta} up={up} />}
        </div>

        <motion.div
          className="mt-4 font-display text-[28px] font-extrabold leading-none tracking-tight tabular-nums"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07 + 0.15 }}
        >
          {display}
        </motion.div>

        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </p>

        <KpiSparkline index={index} strokeClass={style.spark} up={up} />
      </div>
    </motion.div>
  );
}
