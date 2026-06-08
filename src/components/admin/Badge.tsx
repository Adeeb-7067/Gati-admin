import type { ReactNode } from "react";

type Tone = "success" | "warning" | "info" | "primary" | "teal" | "danger" | "muted";

const tones: Record<Tone, { bg: string; dot: string; text: string }> = {
  success: { bg: "bg-success/10 ring-success/20", dot: "bg-success", text: "text-success" },
  warning: { bg: "bg-warning/12 ring-warning/25", dot: "bg-warning", text: "text-[oklch(0.52_0.16_75)]" },
  info: { bg: "bg-info/10 ring-info/20", dot: "bg-info", text: "text-info" },
  primary: { bg: "bg-primary/10 ring-primary/20", dot: "bg-primary", text: "text-primary" },
  teal: { bg: "bg-teal/12 ring-teal/25", dot: "bg-teal", text: "text-[oklch(0.48_0.13_185)]" },
  danger: { bg: "bg-destructive/10 ring-destructive/20", dot: "bg-destructive", text: "text-destructive" },
  muted: { bg: "bg-muted ring-border/60", dot: "bg-muted-foreground/50", text: "text-muted-foreground" },
};

export function Badge({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  const t = tones[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${t.bg} ${t.text}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
      {children}
    </span>
  );
}

export function statusTone(s: string): Tone {
  switch (s) {
    case "Completed":
    case "Confirmed":
    case "Active":
    case "Verified":
    case "Sent":
    case "Resolved": return "success";
    case "In Progress":
    case "Pending":
    case "Waiting":
    case "Scheduled":
    case "Open": return "warning";
    case "Picked Up":
    case "Draft": return "info";
    case "Cancelled":
    case "Failed":
    case "Suspended":
    case "Rejected":
    case "Inactive": return "danger";
    default: return "muted";
  }
}
