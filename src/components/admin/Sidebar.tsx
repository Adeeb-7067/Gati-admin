import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useAdminShell } from "@/contexts/admin-shell-context";
import { useUiPreferences } from "@/contexts/ui-preferences-context";
import { useIsLgUp } from "@/hooks/use-media-query";
import { isNavItemActive } from "@/lib/nav-utils";
import { Icons, type IconName } from "./icon";

export type NavItem = { label: string; to: string; icon: IconName; section?: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/", icon: "dashboard", section: "Overview" },
  { label: "Orders", to: "/orders", icon: "package", section: "Operations" },
  { label: "Users", to: "/users", icon: "users" },
  { label: "Drivers", to: "/drivers", icon: "drivers" },
  { label: "Fleet Owners", to: "/fleet-owners", icon: "fleet" },
  { label: "Vehicles", to: "/vehicles", icon: "vehicles" },
  { label: "Vehicle Categories", to: "/vehicle-categories", icon: "vehicleCats" },
  { label: "Goods Types", to: "/goods-types", icon: "goods" },
  { label: "Packages", to: "/packages", icon: "packages", section: "Pricing" },
  { label: "Coupons", to: "/coupons", icon: "coupons" },
  { label: "Transactions", to: "/transactions", icon: "transactions" },
  { label: "Support Chat", to: "/support-chat", icon: "support", section: "Engage" },
  { label: "Notifications", to: "/notifications", icon: "notifications" },
  { label: "Reviews", to: "/reviews", icon: "reviews" },
  { label: "Cities", to: "/cities", icon: "cities", section: "Content" },
  { label: "Home Banners", to: "/home-banners", icon: "banners" },
  { label: "Home Sections", to: "/home-sections", icon: "sections" },
  { label: "FAQs", to: "/faqs", icon: "faq" },
  { label: "Sub-Admins", to: "/sub-admins", icon: "subAdmins", section: "Admin" },
  { label: "Company", to: "/company", icon: "company" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { sidebarOpen, setSidebarOpen } = useAdminShell();
  const { preferences } = useUiPreferences();
  const isLgUp = useIsLgUp();
  const [query, setQuery] = useState("");

  const compact = preferences.sidebarCompact && isLgUp;

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, setSidebarOpen]);

  useEffect(() => {
    if (!isLgUp && sidebarOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isLgUp, sidebarOpen]);

  const filtered = useMemo(() => {
    if (!query.trim()) return NAV_ITEMS;
    const q = query.toLowerCase();
    return NAV_ITEMS.filter(
      (it) => it.label.toLowerCase().includes(q) || it.section?.toLowerCase().includes(q),
    );
  }, [query]);

  const navItems = useMemo(() => {
    let lastSection: string | undefined;
    return filtered.map((it) => {
      const showSection = !compact && !!it.section && it.section !== lastSection;
      if (showSection) lastSection = it.section;
      return { ...it, showSection };
    });
  }, [filtered, compact]);

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && !isLgUp && (
          <motion.button
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex h-svh flex-col overflow-hidden border-r border-white/[0.08] bg-gradient-to-b from-[oklch(0.20_0.048_275)] via-sidebar to-[oklch(0.16_0.042_278)] text-sidebar-foreground shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out lg:translate-x-0 lg:shadow-none ${
          sidebarOpen || isLgUp ? "translate-x-0" : "-translate-x-full"
        } w-[min(288px,90vw)] lg:w-[var(--sidebar-width)]`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/12 to-transparent" />

        {/* Header */}
        <div className="relative shrink-0 border-b border-white/[0.06] px-4 pb-3 pt-5">
          <div className={`flex items-center gap-3 ${compact ? "justify-center" : ""}`}>
            <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setSidebarOpen(false)}>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.62_0.20_295)] text-white shadow-glow-primary">
                <span className="font-display text-lg font-extrabold">G</span>
                {!compact && (
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-success" />
                )}
              </div>
              {!compact && (
                <div className="min-w-0 leading-tight">
                  <div className="font-display text-[16px] font-extrabold tracking-tight">GATI</div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-sidebar-muted">
                    Dispatch Hub
                  </div>
                </div>
              )}
            </Link>

            {!isLgUp && (
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="ml-auto rounded-lg p-2 text-sidebar-muted transition-colors hover:bg-white/10 hover:text-sidebar-foreground"
                aria-label="Close menu"
              >
                <Icons.close className="h-5 w-5" />
              </button>
            )}
          </div>

          {!compact && (
            <div className="relative mt-3">
              <Icons.search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sidebar-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-9 pr-8 text-[12px] text-sidebar-foreground outline-none transition-colors placeholder:text-sidebar-muted focus:border-primary/35 focus:bg-white/[0.06]"
                placeholder="Filter menu…"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-sidebar-muted hover:text-sidebar-foreground"
                  aria-label="Clear filter"
                >
                  <Icons.close className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain px-2.5 py-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-[12px] text-sidebar-muted">No menu items found</p>
          ) : (
            navItems.map((it) => (
              <NavLink
                key={it.to}
                item={it}
                active={isNavItemActive(pathname, it.to)}
                compact={compact}
                onNavigate={() => setSidebarOpen(false)}
                showSection={it.showSection}
              />
            ))
          )}
        </nav>

        {/* Footer */}
        {!compact && (
          <div className="relative shrink-0 space-y-2 border-t border-white/[0.06] p-3">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/80 to-teal/80 text-white">
                  <Icons.sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-muted">
                    Active region
                  </div>
                  <div className="truncate text-[13px] font-semibold">All India</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-sidebar-muted">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                    </span>
                    12 cities live
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/settings"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal text-[11px] font-bold text-white">
                RM
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-[12px] font-semibold">Rohit Mehta</div>
                <div className="truncate text-[10px] text-sidebar-muted">Super Admin</div>
              </div>
              <Icons.settings className="h-3.5 w-3.5 shrink-0 text-sidebar-muted" />
            </Link>
          </div>
        )}

        {compact && (
          <div className="relative shrink-0 border-t border-white/[0.06] p-2">
            <Link
              to="/settings"
              title="Settings"
              onClick={() => setSidebarOpen(false)}
              className="flex justify-center rounded-xl p-2.5 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal text-[10px] font-bold text-white">
                RM
              </div>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

function NavLink({
  item,
  active,
  compact,
  showSection,
  onNavigate,
}: {
  item: NavItem & { showSection?: boolean };
  active: boolean;
  compact: boolean;
  showSection?: boolean;
  onNavigate: () => void;
}) {
  const Icon = Icons[item.icon];

  return (
    <div>
      {showSection && item.section && (
        <div className="mb-1 mt-4 px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-sidebar-muted/75 first:mt-1">
          {item.section}
        </div>
      )}
      <Link
        to={item.to}
        title={compact ? item.label : undefined}
        onClick={onNavigate}
        className={`group relative mb-0.5 flex items-center rounded-xl text-[13px] font-medium transition-colors ${
          compact ? "justify-center px-2 py-2.5" : "gap-3 px-2.5 py-2.5"
        } ${active ? "text-white" : "text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground"}`}
      >
        {active && (
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.58_0.22_295)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
        )}
        {active && (
          <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-white/90" />
        )}

        <span
          className={`relative z-10 flex items-center ${compact ? "" : "w-full gap-3"}`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
              active ? "bg-white/15" : "bg-white/[0.05] group-hover:bg-white/[0.08]"
            }`}
          >
            <Icon className="h-[17px] w-[17px]" strokeWidth={active ? 2.25 : 2} />
          </span>
          {!compact && <span className="truncate">{item.label}</span>}
          {!compact && active && (
            <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-white/90" />
          )}
        </span>
      </Link>
    </div>
  );
}
