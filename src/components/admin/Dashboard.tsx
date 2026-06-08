import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,
} from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge, statusTone } from "@/components/admin/Badge";
import { Icons, type IconName } from "@/components/admin/icon";
import {
  kpis, todaySummary, systemHealth, deliveryTrend, revenueByCategory,
  growthData, topCities, recentBookings, formatINR, formatINRShort,
} from "@/lib/mock-data";
import { DashboardIllustration } from "@/components/admin/DashboardIllustration";
import { DashboardKpiCard } from "@/components/admin/DashboardKpiCard";
import { KpiGrid } from "@/components/admin/shared/KpiGrid";
import { kpiTintStyles } from "@/components/admin/shared/kpi-styles";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const fleetTintCycle = ["primary", "teal", "info", "success", "warning", "primary"] as const;

const quickActions = [
  { label: "New Order", icon: "plus" as IconName, tint: "teal" },
  { label: "Add Driver", icon: "userPlus" as IconName, tint: "info" },
  { label: "Coupons", icon: "badge" as IconName, tint: "warning" },
  { label: "Report", icon: "file" as IconName, tint: "success" },
  { label: "Notify", icon: "send" as IconName, tint: "destructive" },
];

const fleetStats = [
  { l: "Users", v: "48,210", i: "users" as IconName },
  { l: "Drivers", v: "3,842", i: "drivers" as IconName },
  { l: "Vehicles", v: "3,512", i: "vehicles" as IconName },
  { l: "Orders", v: "1.28L", i: "package" as IconName },
  { l: "Coupons", v: "42", i: "coupons" as IconName },
  { l: "Cities", v: "12", i: "cities" as IconName },
];

const actionsRequired = [
  { l: "18 withdrawals pending", tone: "warning" as const },
  { l: "5 KYC reviews waiting", tone: "info" as const },
  { l: "3 disputed orders", tone: "destructive" as const },
];

export function Dashboard() {
  const totalRev = revenueByCategory.reduce((a, b) => a + b.value, 0);

  return (
    <AdminLayout title="GATI Admin" module="Operations Dashboard" breadcrumbs={["Dashboard"]}>
      <div className="space-y-8">
        {/* ── Welcome hero with illustration ── */}
        <motion.section
          {...fadeUp}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary via-[oklch(0.52_0.22_278)] to-[oklch(0.58_0.18_195)] p-6 text-white shadow-glow-primary sm:p-7"
        >
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 max-w-xl">
              <p className="text-sm font-medium text-white/80">Friday, 12 June 2026</p>
              <h2 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-[28px]">
                Welcome back, Rohit
              </h2>
              <p className="mt-2 text-sm text-white/85">
                Live overview of deliveries, revenue, and fleet activity across 12 cities.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  ↑ 12.4% deliveries
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  1,284 drivers online
                </span>
              </div>
            </div>
            <div className="relative z-10 flex shrink-0 flex-wrap items-center gap-2">
              <FilterPillHero active>Today</FilterPillHero>
              <FilterPillHero>This Week</FilterPillHero>
              <FilterPillHero>This Month</FilterPillHero>
            </div>
          </div>
          <DashboardIllustration />
        </motion.section>

        {/* ── KPI bento row ── */}
        <KpiGrid count={kpis.length}>
          {kpis.map((k, i) => (
            <DashboardKpiCard
              key={k.label}
              label={k.label}
              value={k.value}
              icon={k.icon as IconName}
              tint={k.tint as keyof typeof kpiTintStyles}
              delta={k.delta}
              up={k.up}
              isCurrency={"isCurrency" in k ? k.isCurrency : undefined}
              index={i}
            />
          ))}
        </KpiGrid>

        {/* ── Main bento grid ── */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left analytics column */}
          <div className="space-y-6 xl:col-span-8">
            {/* Primary chart — full width of column */}
            <Card>
              <CardHeader
                title="Delivery Overview"
                subtitle="Daily completed deliveries"
                filter="This Week"
              />
              <div className="h-[280px] px-2 pb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={deliveryTrend}>
                    <defs>
                      <linearGradient id="deliveryGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="var(--color-primary)" stopOpacity={0.3} />
                        <stop offset="1" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} style={{ fontSize: 11 }} />
                    <YAxis tickLine={false} axisLine={false} style={{ fontSize: 11 }} width={40} />
                    <Tooltip
                      contentStyle={{ background: "#0F172A", border: "none", borderRadius: 8, color: "white", fontSize: 12 }}
                      labelStyle={{ color: "white" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#deliveryGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Secondary charts — 3-up bento */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card className="min-w-0">
                <CardHeader title="Revenue Mix" filter="Month" />
                <div className="relative mx-auto h-36 w-36 pb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={revenueByCategory} dataKey="value" innerRadius={42} outerRadius={62} paddingAngle={3}>
                        {revenueByCategory.map((c) => (
                          <Cell key={c.name} fill={c.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-display text-[15px] font-bold">{formatINRShort(totalRev)}</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Total</div>
                  </div>
                </div>
                <div className="space-y-2 border-t border-border px-4 pb-4 pt-3">
                  {revenueByCategory.map((c) => (
                    <div key={c.name} className="flex items-center gap-2 text-[11px]">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} />
                      <span className="min-w-0 flex-1 truncate">{c.name}</span>
                      <span className="font-mono font-semibold">{formatINRShort(c.value)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="min-w-0">
                <CardHeader title="Growth" filter="2026" />
                <div className="h-44 px-1 pb-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: 9 }} interval={2} />
                      <YAxis tickLine={false} axisLine={false} style={{ fontSize: 9 }} width={32} />
                      <Tooltip contentStyle={{ background: "#0F172A", border: "none", borderRadius: 8, color: "white", fontSize: 11 }} />
                      <Line type="monotone" dataKey="users" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="drivers" stroke="var(--color-teal)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 border-t border-border px-4 py-2.5 text-[10px]">
                  <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded bg-primary" /> Users</span>
                  <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded border border-teal bg-teal" style={{ borderStyle: "dashed" }} /> Drivers</span>
                </div>
              </Card>

              <Card className="min-w-0">
                <CardHeader title="Top Cities" link="Report" />
                <div className="space-y-3 px-4 pb-4">
                  {topCities.slice(0, 5).map((c) => {
                    const pct = (c.count / topCities[0].count) * 100;
                    return (
                      <div key={c.name} className="flex items-center gap-2">
                        <span className="w-4 text-[11px] font-bold text-muted-foreground">{c.rank}</span>
                        <span className="w-16 truncate text-[12px] font-medium">{c.name}</span>
                        <div className="min-w-0 flex-1">
                          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ background: c.color }}
                            />
                          </div>
                        </div>
                        <span className="w-10 text-right text-[10px] font-medium text-muted-foreground">
                          {(c.count / 1000).toFixed(1)}k
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Recent deliveries */}
            <Card>
              <CardHeader title="Recent Deliveries" subtitle="Latest booking activity" link="View All" />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-border bg-surface-alt text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                      <th className="whitespace-nowrap px-5 py-2.5 font-semibold">ID</th>
                      <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Customer</th>
                      <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Driver</th>
                      <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Amount</th>
                      <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id} className="border-b border-border last:border-0 transition-colors hover:bg-surface-alt/80">
                        <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] font-semibold text-primary">{b.id}</td>
                        <td className="max-w-[160px] px-3 py-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <Avatar initials={b.user} />
                            <span className="truncate text-[13px]">{b.user}</span>
                          </div>
                        </td>
                        <td className="max-w-[120px] truncate px-3 py-3 text-[13px] text-muted-foreground">{b.driver}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-[13px] font-semibold">{formatINR(b.amount)}</td>
                        <td className="whitespace-nowrap px-3 py-3"><Badge tone={statusTone(b.status)}>{b.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right intelligence panel */}
          <aside className="min-w-0 space-y-5 xl:col-span-4 xl:sticky xl:top-28 xl:self-start">
            {/* Live status card */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-primary/90 via-primary to-teal px-5 py-5 text-white">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/75">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  Live Now
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/10 px-3 py-2.5 backdrop-blur">
                    <div className="text-[22px] font-bold leading-none">1,284</div>
                    <div className="mt-0.5 text-[10px] text-white/80">Drivers online</div>
                  </div>
                  <div className="rounded-lg bg-white/10 px-3 py-2.5 backdrop-blur">
                    <div className="text-[22px] font-bold leading-none">847</div>
                    <div className="mt-0.5 text-[10px] text-white/80">On active trips</div>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {todaySummary.slice(2).map((r) => {
                  const I = Icons[r.icon as IconName];
                  return (
                    <div key={r.label} className="flex items-center gap-3 px-5 py-3 text-[13px]">
                      <I className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1 text-muted-foreground">{r.label}</span>
                      <span className="font-semibold">{r.value}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border p-4">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90">
                  Full Report <Icons.arrowRight className="h-4 w-4" />
                </button>
              </div>
            </Card>

            {/* Action required */}
            <Card>
              <CardHeader title="Needs Attention" subtitle="3 items pending" />
              <div className="space-y-2 px-4 pb-4">
                {actionsRequired.map((a) => (
                  <button
                    key={a.l}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg border border-border bg-surface-alt/50 px-3 py-2.5 text-left text-[12px] transition-colors hover:bg-surface-alt"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${a.tone === "warning" ? "bg-warning" : a.tone === "info" ? "bg-info" : "bg-destructive"}`} />
                    <span className="flex-1">{a.l}</span>
                    <Icons.arrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Quick actions */}
            <Card>
              <CardHeader title="Quick Actions" />
              <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                {quickActions.map((a) => {
                  const Icon = Icons[a.icon];
                  const style = kpiTintStyles[a.tint as keyof typeof kpiTintStyles];
                  return (
                    <motion.button
                      key={a.label}
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-surface-alt/40 px-2 py-3 text-center transition-colors hover:bg-surface-alt"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.icon}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-semibold leading-tight">{a.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </Card>

            {/* System health */}
            <Card>
              <CardHeader title="System Health" />
              <div className="space-y-2.5 px-4 pb-4">
                {systemHealth.map((s) => (
                  <div key={s.name} className="flex items-center gap-2.5 text-[12px]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                    <span className="flex-1 text-muted-foreground">{s.name}</span>
                    <span className="font-mono text-[11px] font-semibold text-success">{s.uptime}</span>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>

        {/* ── Fleet snapshot strip ── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-[15px] font-bold">Fleet Snapshot</h3>
            <button className="text-[12px] font-semibold text-primary hover:underline">Manage fleet</button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {fleetStats.map((t, i) => {
              const Icon = Icons[t.i];
              const style = kpiTintStyles[fleetTintCycle[i % fleetTintCycle.length]];
              return (
                <motion.div
                  key={t.l}
                  {...fadeUp}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3 }}
                  className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3.5 shadow-card ${style.card} ${style.border}`}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow} to-transparent opacity-70`} />
                  <div className={`absolute inset-x-0 top-0 h-0.5 ${style.accent}`} />
                  <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.icon}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="relative min-w-0">
                    <div className="truncate text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{t.l}</div>
                    <div className="font-display text-[17px] font-bold leading-tight">{t.v}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function FilterPillHero({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      className={`rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
        active
          ? "bg-white/20 text-white backdrop-blur"
          : "bg-white/10 text-white/90 hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}

function Avatar({ initials: name }: { initials: string }) {
  const letters = name.split(" ").map((x) => x[0]).slice(0, 2).join("");
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
      {letters}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`admin-card overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({
  title,
  subtitle,
  filter,
  link,
}: {
  title: string;
  subtitle?: string;
  filter?: string;
  link?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pb-2 pt-4">
      <div className="min-w-0">
        <h3 className="font-display text-[14px] font-bold">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>
      {filter && (
        <button className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground hover:bg-surface-alt">
          {filter} <Icons.chevronDown className="h-3 w-3" />
        </button>
      )}
      {link && (
        <button className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
          {link} <Icons.arrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
