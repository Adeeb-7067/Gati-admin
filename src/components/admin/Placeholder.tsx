import { AdminLayout } from "./AdminLayout";
import { Icons, type IconName } from "./icon";

export function Placeholder({
  title, module, icon = "wrench", description,
  breadcrumbs,
}: {
  title: string;
  module?: string;
  icon?: IconName;
  description?: string;
  breadcrumbs?: string[];
}) {
  const I = Icons[icon];
  return (
    <AdminLayout title={title} module={module ?? "GATI Admin"} breadcrumbs={breadcrumbs ?? ["Dashboard", title]}>
      <div className="admin-card flex min-h-[60vh] flex-col items-center justify-center p-12 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-teal/15 text-primary ring-1 ring-primary/20">
          <I className="h-8 w-8" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary/20 blur-sm" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description ?? "This module is scaffolded and ready to be wired to the API. The visual style matches the rest of the GATI admin system."}
        </p>
        <button className="mt-6 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.58_0.22_295)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-primary hover:opacity-95">
          Coming Soon
        </button>
      </div>
    </AdminLayout>
  );
}
