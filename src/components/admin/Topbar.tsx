import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAdminShell } from "@/contexts/admin-shell-context";
import { useUiPreferences } from "@/contexts/ui-preferences-context";
import { Icons } from "./icon";

interface TopbarProps {
  title: string;
  module?: string;
  breadcrumbs?: string[];
}

export function Topbar({ title, module, breadcrumbs }: TopbarProps) {
  const { setSidebarOpen } = useAdminShell();
  const { preferences, setPreference } = useUiPreferences();

  const openMobileNav = () => setSidebarOpen(true);
  const toggleCompact = () => setPreference("sidebarCompact", !preferences.sidebarCompact);

  return (
    <header className="glass-panel sticky top-0 z-30 border-b border-border/50">
      <div className="flex h-16 min-w-0 items-center gap-2 px-4 sm:h-[68px] sm:gap-3 sm:px-6 lg:px-7">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={openMobileNav}
          className="shrink-0 rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground lg:hidden"
          aria-label="Open navigation menu"
        >
          <Icons.menu className="h-5 w-5" />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          type="button"
          onClick={toggleCompact}
          className="hidden shrink-0 rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground lg:inline-flex"
          aria-label={preferences.sidebarCompact ? "Expand sidebar" : "Collapse sidebar"}
          title={preferences.sidebarCompact ? "Expand sidebar" : "Collapse sidebar"}
        >
          {preferences.sidebarCompact ? (
            <Icons.panelLeft className="h-5 w-5" />
          ) : (
            <Icons.panelLeftClose className="h-5 w-5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          {module && (
            <div className="mb-0.5 hidden items-center gap-2 sm:flex">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Live
              </span>
              <span className="truncate text-[11px] font-semibold text-muted-foreground">{module}</span>
            </div>
          )}
          <h1 className="truncate font-display text-[17px] font-extrabold leading-tight tracking-tight text-foreground sm:text-[20px] lg:text-[22px]">
            {title}
          </h1>
        </div>

        <div className="hidden min-w-0 flex-1 items-center lg:flex xl:max-w-sm 2xl:max-w-md">
          <div className="group flex w-full items-center gap-2.5 rounded-xl border border-border/60 bg-background/60 px-3.5 py-2.5 shadow-sm transition-all focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10">
            <Icons.search className="h-4 w-4 shrink-0 text-muted-foreground group-focus-within:text-primary" />
            <input
              className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
              placeholder="Search orders, drivers, users…"
            />
            <kbd className="hidden shrink-0 rounded-md border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground xl:inline">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <TopbarIconBtn label="Notifications">
            <Icons.bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-white ring-2 ring-card">
              5
            </span>
          </TopbarIconBtn>

          <Link
            to="/settings"
            className="hidden items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-[13px] font-semibold shadow-sm transition-all hover:border-primary/20 md:inline-flex"
          >
            <Icons.settings className="h-4 w-4 text-primary" />
            <span className="hidden lg:inline">Settings</span>
          </Link>

          <div className="ml-1 flex items-center gap-2 border-l border-border/60 pl-2 sm:ml-2 sm:gap-2.5 sm:pl-3">
            <Link to="/settings" aria-label="Profile settings">
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.62_0.20_295)] text-sm font-bold text-white shadow-glow-primary"
              >
                RM
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
              </motion.div>
            </Link>
            <div className="hidden leading-tight xl:block">
              <div className="text-[13px] font-semibold text-foreground">Rohit Mehta</div>
              <div className="text-[11px] text-muted-foreground">Super Admin</div>
            </div>
          </div>
        </div>
      </div>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="scrollbar-thin flex items-center gap-1 overflow-x-auto border-t border-border/40 px-4 pb-2.5 pt-0 sm:px-6 lg:px-7">
          <Link
            to="/"
            className="flex shrink-0 items-center text-muted-foreground/60 hover:text-primary"
            aria-label="Dashboard home"
          >
            <Icons.dashboard className="h-3.5 w-3.5" />
          </Link>
          {breadcrumbs.map((b, i) => (
            <span key={`${b}-${i}`} className="flex shrink-0 items-center gap-1 text-[12px]">
              <Icons.chevronRight className="h-3 w-3 text-muted-foreground/40" />
              <span
                className={
                  i === breadcrumbs.length - 1
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }
              >
                {b}
              </span>
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

function TopbarIconBtn({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      className={`relative rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground ${className}`}
    >
      {children}
    </motion.button>
  );
}
