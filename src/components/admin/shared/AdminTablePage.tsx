import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatChip } from "@/components/admin/StatChip";
import { KpiGrid } from "@/components/admin/shared/KpiGrid";
import { Icons, type IconName } from "@/components/admin/icon";
import { EntityFormModal, type FormModalMode } from "@/components/admin/shared/EntityFormModal";
import type { EntityFormConfig } from "@/components/admin/shared/entity-forms";
import { emptyFormValues } from "@/components/admin/shared/entity-forms";
import { TableToolbar, type ToolbarFilter } from "@/components/admin/shared/TableToolbar";
import {
  adminTable,
  adminTableActionCell,
  adminTableActionHead,
  adminTableBodyCell,
  adminTableBodyRow,
  adminTableHeadCell,
  adminTableHeadRow,
  adminTableWrapper,
  adminCardShell,
} from "@/components/admin/shared/table-styles";

export interface StatConfig {
  key: string;
  label: string;
  value: number | string;
  icon: IconName;
  tint: "primary" | "teal" | "success" | "warning" | "info" | "destructive";
  isCurrency?: boolean;
}

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export interface FilterConfig extends ToolbarFilter {}

export interface AdminTablePageProps<T> {
  title: string;
  module?: string;
  breadcrumbs: string[];
  stats?: StatConfig[];
  tabs?: readonly string[];
  filterTab?: (row: T, tab: string) => boolean;
  filters?: FilterConfig[];
  searchPlaceholder?: string;
  addLabel?: string;
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  totalLabel?: string;
  form?: EntityFormConfig<T>;
}

export function AdminTablePage<T>({
  title,
  module = "GATI Operations",
  breadcrumbs,
  stats,
  tabs,
  filterTab,
  filters = [],
  searchPlaceholder = "Search…",
  addLabel = "Add New",
  columns,
  data: initialData,
  rowKey,
  totalLabel,
  form,
}: AdminTablePageProps<T>) {
  const [rows, setRows] = useState(initialData);
  const [tab, setTab] = useState(tabs?.[0] ?? "All");
  const [activeStat, setActiveStat] = useState(stats?.[0]?.key ?? "");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<FormModalMode>("create");
  const [editingRow, setEditingRow] = useState<T | null>(null);

  useEffect(() => {
    setRows(initialData);
  }, [initialData]);

  const filtered = useMemo(() => {
    let result = rows;
    if (tabs && filterTab && tab !== tabs[0]) {
      result = result.filter((r) => filterTab(r, tab));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((r) => JSON.stringify(r).toLowerCase().includes(q));
    }
    return result;
  }, [rows, tab, tabs, filterTab, query]);

  const openCreate = () => {
    if (!form) return;
    setEditingRow(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEdit = (row: T) => {
    if (!form) return;
    setEditingRow(row);
    setModalMode("edit");
    setModalOpen(true);
  };

  const openView = (row: T) => {
    if (!form) return;
    setEditingRow(row);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleSave = (values: Record<string, string | boolean>) => {
    if (!form) return;
    if (modalMode === "create") {
      const created = form.toRow(values, undefined, rows);
      setRows((prev) => [created, ...prev]);
      toast.success(`${form.entityName} created successfully`);
    } else if (modalMode === "edit" && editingRow) {
      const updated = form.toRow(values, editingRow, rows);
      setRows((prev) => prev.map((r) => (rowKey(r) === rowKey(editingRow) ? updated : r)));
      toast.success(`${form.entityName} updated successfully`);
    }
  };

  const modalValues = form
    ? editingRow
      ? form.fromRow(editingRow)
      : emptyFormValues(form.fields)
    : {};

  return (
    <AdminLayout title={title} module={module} breadcrumbs={breadcrumbs}>
      {stats && stats.length > 0 && (
        <KpiGrid count={stats.length}>
          {stats.map((s, i) => (
            <StatChip
              key={s.key}
              label={s.label}
              value={s.value}
              icon={s.icon}
              tint={s.tint}
              isCurrency={s.isCurrency}
              active={activeStat === s.key}
              onClick={() => setActiveStat(s.key)}
              index={i}
            />
          ))}
        </KpiGrid>
      )}

      <div className={adminCardShell}>
        {tabs && tabs.length > 0 && (
          <div className="scrollbar-thin flex gap-1 overflow-x-auto border-b border-border/50 bg-muted/15 px-4 pt-3 sm:gap-2 sm:px-5">
            {tabs.map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`relative shrink-0 whitespace-nowrap rounded-t-lg px-4 pb-3 pt-2 text-[13px] font-semibold transition-colors ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  {t}
                  {active && (
                    <motion.span
                      layoutId={`tab-${title}`}
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-primary to-[oklch(0.58_0.22_295)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <TableToolbar
          filters={filters}
          searchPlaceholder={searchPlaceholder}
          query={query}
          onQueryChange={setQuery}
          addLabel={addLabel}
          onAdd={openCreate}
          showAdd={!!form}
        />

        <div className={adminTableWrapper}>
          <table className={adminTable}>
            <thead>
              <tr className={adminTableHeadRow}>
                <th className={`${adminTableHeadCell} w-12`}>
                  <input type="checkbox" className="rounded border-border" aria-label="Select all" />
                </th>
                {columns.map((c) => (
                  <th key={c.key} className={`${adminTableHeadCell} ${c.className ?? ""}`}>
                    {c.header}
                  </th>
                ))}
                <th className={adminTableActionHead}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={rowKey(row)}
                  className={`group ${adminTableBodyRow}`}
                >
                  <td className={`${adminTableBodyCell} w-12 max-w-none`}>
                    <input type="checkbox" className="rounded border-border" aria-label="Select row" />
                  </td>
                  {columns.map((c) => (
                    <td key={c.key} className={`${adminTableBodyCell} ${c.className ?? ""}`}>
                      {c.render(row)}
                    </td>
                  ))}
                  <td className={adminTableActionCell}>
                    <div className="flex items-center justify-end gap-0.5">
                      {form && (
                        <button
                          type="button"
                          onClick={() => openView(row)}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                          aria-label="View"
                        >
                          <Icons.view className="h-4 w-4" />
                        </button>
                      )}
                      {form && (
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                          aria-label="Edit"
                        >
                          <Icons.edit className="h-4 w-4" />
                        </button>
                      )}
                      <button type="button" className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted" aria-label="More">
                        <Icons.more className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 bg-muted/15 px-5 py-4 text-[12px] text-muted-foreground">
          <span>
            Showing 1 to {filtered.length} of {totalLabel ?? `${rows.length} records`}
          </span>
          <div className="flex items-center gap-1">
            <PageBtn><Icons.chevronLeft className="h-3.5 w-3.5" /></PageBtn>
            <PageBtn active>1</PageBtn>
            <PageBtn>2</PageBtn>
            <PageBtn>3</PageBtn>
            <PageBtn><Icons.chevronRight className="h-3.5 w-3.5" /></PageBtn>
          </div>
        </div>
      </div>

      {form && (
        <EntityFormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          mode={modalMode}
          entityName={form.entityName}
          fields={form.fields}
          values={modalValues}
          onSubmit={handleSave}
        />
      )}
    </AdminLayout>
  );
}

function PageBtn({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2.5 text-[12px] font-semibold transition-all ${
        active
          ? "bg-gradient-to-r from-primary to-[oklch(0.58_0.22_295)] text-primary-foreground shadow-glow-primary"
          : "border border-border/60 bg-background/70 text-foreground hover:border-primary/20 hover:bg-background"
      }`}
    >
      {children}
    </button>
  );
}
