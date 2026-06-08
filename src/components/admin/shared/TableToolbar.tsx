import { motion } from "framer-motion";
import { Icons, type IconName } from "@/components/admin/icon";

export interface ToolbarFilter {
  icon: IconName;
  label: string;
}

interface TableToolbarProps {
  filters?: ToolbarFilter[];
  searchPlaceholder?: string;
  query: string;
  onQueryChange: (value: string) => void;
  addLabel?: string;
  onAdd?: () => void;
  showAdd?: boolean;
}

export function TableToolbar({
  filters = [],
  searchPlaceholder = "Search…",
  query,
  onQueryChange,
  addLabel = "Add New",
  onAdd,
  showAdd = false,
}: TableToolbarProps) {
  return (
    <div className="space-y-3 border-b border-border/50 bg-muted/20 px-5 py-4">
      {filters.length > 0 && (
        <div className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto overscroll-x-contain pb-0.5">
          {filters.map((f, i) => (
            <FilterChip key={f.label} icon={f.icon} label={f.label} index={i} />
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-border/60 bg-background/70 px-3.5 py-2.5 shadow-sm transition-all focus-within:border-primary/30 focus-within:shadow-[0_0_0_3px_oklch(0.56_0.24_285/0.08)]">
          <Icons.search className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            placeholder={searchPlaceholder}
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <Icons.close className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-3.5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/20 sm:flex"
          >
            <Icons.filter className="h-4 w-4 text-primary" />
            <span className="hidden md:inline">Filters</span>
          </button>
          {showAdd && onAdd && (
            <motion.button
              type="button"
              onClick={onAdd}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.58_0.22_295)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-primary hover:opacity-95"
            >
              <Icons.plus className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{addLabel}</span>
              <span className="sm:hidden">Add</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ icon, label, index }: ToolbarFilter & { index: number }) {
  const I = Icons[icon];
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -1 }}
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-border/60 bg-background/80 px-3.5 py-2 text-[13px] font-medium shadow-sm transition-colors hover:border-primary/20 hover:bg-background"
    >
      <I className="h-4 w-4 shrink-0 text-primary/70" />
      {label}
      <Icons.chevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
    </motion.button>
  );
}
