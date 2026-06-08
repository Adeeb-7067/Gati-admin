import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatChip } from "@/components/admin/StatChip";
import { KpiGrid } from "@/components/admin/shared/KpiGrid";
import { Badge, statusTone } from "@/components/admin/Badge";
import { Icons, type IconName } from "@/components/admin/icon";
import { OrderDetailPanel } from "@/components/admin/OrderDetailPanel";
import { EntityFormModal, type FormModalMode } from "@/components/admin/shared/EntityFormModal";
import { emptyFormValues, orderForm } from "@/components/admin/shared/entity-forms";
import { TableToolbar } from "@/components/admin/shared/TableToolbar";
import {
  adminTable,
  adminTableActionCell,
  adminTableActionHead,
  adminTableBodyCell,
  adminTableHeadCell,
  adminTableHeadRow,
  adminTableWrapper,
  adminCardShell,
} from "@/components/admin/shared/table-styles";
import { orders as initialOrders, orderStats, formatINR, type Order } from "@/lib/mock-data";

const tabs = ["All Orders", "Pending", "In Progress", "Completed", "Cancelled"] as const;

export function OrdersPage() {
  const [orderRows, setOrderRows] = useState(initialOrders);
  const [tab, setTab] = useState<typeof tabs[number]>("All Orders");
  const [activeStat, setActiveStat] = useState<string>("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<FormModalMode>("create");
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let rows = orderRows;
    if (tab !== "All Orders") {
      rows = rows.filter((o) => o.status === tab || (tab === "In Progress" && o.status === "Picked Up"));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((o) => JSON.stringify(o).toLowerCase().includes(q));
    }
    return rows;
  }, [tab, orderRows, query]);

  const openCreate = () => {
    setEditingOrder(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEdit = (o: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingOrder(o);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleSave = (values: Record<string, string | boolean>) => {
    if (modalMode === "create") {
      const created = orderForm.toRow(values, undefined, orderRows);
      setOrderRows((prev) => [created, ...prev]);
      toast.success("Order created successfully");
    } else if (editingOrder) {
      const updated = orderForm.toRow(values, editingOrder, orderRows);
      setOrderRows((prev) => prev.map((o) => (o.id === editingOrder.id ? updated : o)));
      if (selected?.id === editingOrder.id) setSelected(updated);
      toast.success("Order updated successfully");
    }
  };

  const modalValues = editingOrder ? orderForm.fromRow(editingOrder) : emptyFormValues(orderForm.fields);

  return (
    <AdminLayout
      title="Order Management"
      module="GATI Operations"
      breadcrumbs={["Dashboard", "Orders", "Order Management"]}
    >
      {/* Stat chips */}
      <KpiGrid count={orderStats.length}>
        {orderStats.map((s, i) => (
          <StatChip
            key={s.key}
            label={s.label}
            value={s.value}
            icon={s.icon as IconName}
            tint={s.tint as never}
            isCurrency={s.isCurrency}
            active={activeStat === s.key}
            onClick={() => setActiveStat(s.key)}
            index={i}
          />
        ))}
      </KpiGrid>

      {/* Card with tabs / filters / table */}
      <div className={adminCardShell}>
        <div className="scrollbar-thin flex gap-1 overflow-x-auto border-b border-border/50 bg-muted/15 px-4 pt-3 sm:gap-2 sm:px-5">
          {tabs.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative shrink-0 whitespace-nowrap rounded-t-lg px-4 pb-3 pt-2 text-[13px] font-semibold transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                }`}
              >
                {t}
                {active && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-primary to-[oklch(0.58_0.22_295)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <TableToolbar
          filters={[
            { icon: "calendar", label: "12 Jun 2026" },
            { icon: "cities", label: "All Cities" },
            { icon: "vehicles", label: "All Categories" },
            { icon: "wallet", label: "All Payments" },
            { icon: "dot", label: "All Status" },
          ]}
          searchPlaceholder="Search by Order No., User…"
          query={query}
          onQueryChange={setQuery}
          addLabel="New Order"
          onAdd={openCreate}
          showAdd
        />

        {/* Table */}
        <div className={adminTableWrapper}>
          <table className={`${adminTable} min-w-[960px]`}>
            <thead>
              <tr className={adminTableHeadRow}>
                <th className={`${adminTableHeadCell} w-12`}><input type="checkbox" className="rounded border-border" aria-label="Select all" /></th>
                <th className={adminTableHeadCell}>Order No.</th>
                <th className={adminTableHeadCell}>Type</th>
                <th className={adminTableHeadCell}>User</th>
                <th className={adminTableHeadCell}>Driver</th>
                <th className={adminTableHeadCell}>City</th>
                <th className={adminTableHeadCell}>Amount (₹)</th>
                <th className={adminTableHeadCell}>Status</th>
                <th className={adminTableHeadCell}>Date</th>
                <th className={adminTableActionHead}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => setSelected(o)}
                  className={`group cursor-pointer border-b border-border last:border-0 hover:bg-surface-alt/80 ${selected?.id === o.id ? "bg-primary/5" : ""}`}
                >
                  <td className={`${adminTableBodyCell} w-12 max-w-none`} onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-border" aria-label="Select order" />
                  </td>
                  <td className={adminTableBodyCell}>
                    <span className="rounded-md bg-primary/8 px-2 py-1 font-mono text-[12px] font-semibold text-primary">
                      {o.id}
                    </span>
                  </td>
                  <td className={`${adminTableBodyCell} max-w-[100px]`}>
                    <Badge tone={o.type === "Express" ? "primary" : o.type === "Scheduled" ? "info" : "muted"}>
                      {o.type}
                    </Badge>
                  </td>
                  <td className={`${adminTableBodyCell} font-medium`}>{o.user}</td>
                  <td className={`${adminTableBodyCell} text-muted-foreground`}>{o.driver ?? "—"}</td>
                  <td className={`${adminTableBodyCell} text-muted-foreground`}>{o.city}</td>
                  <td className={`${adminTableBodyCell} font-mono font-semibold`}>{formatINR(o.amount)}</td>
                  <td className={adminTableBodyCell}><Badge tone={statusTone(o.status)}>{o.status}</Badge></td>
                  <td className={`${adminTableBodyCell} text-muted-foreground`}>{o.time}</td>
                  <td className={`${adminTableActionCell} ${selected?.id === o.id ? "!bg-primary/5" : ""}`} onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-0.5">
                      <button type="button" onClick={(e) => openEdit(o, e)} className="rounded-md p-1.5 hover:bg-muted" aria-label="Edit">
                        <Icons.edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button type="button" className="rounded-md p-1.5 hover:bg-muted" aria-label="More">
                        <Icons.more className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-5 py-4 text-[12px] text-muted-foreground">
          <span>Showing 1 to {filtered.length} of 156 orders</span>
          <div className="flex items-center gap-1">
            <PageBtn><Icons.chevronLeft className="h-3.5 w-3.5" /></PageBtn>
            <PageBtn active>1</PageBtn>
            <PageBtn>2</PageBtn>
            <PageBtn>3</PageBtn>
            <span className="px-1">…</span>
            <PageBtn>16</PageBtn>
            <PageBtn><Icons.chevronRight className="h-3.5 w-3.5" /></PageBtn>
          </div>
        </div>
      </div>

      <OrderDetailPanel order={selected} onClose={() => setSelected(null)} />

      <EntityFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        entityName={orderForm.entityName}
        fields={orderForm.fields}
        values={modalValues}
        onSubmit={handleSave}
      />
    </AdminLayout>
  );
}

function PageBtn({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-[12px] font-semibold ${
        active ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
