import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "./icon";
import { Badge, statusTone } from "./Badge";
import type { Order } from "@/lib/mock-data";
import { formatINR } from "@/lib/mock-data";

export function OrderDetailPanel({ order, onClose }: { order: Order | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {order && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black"
          />
          <motion.aside
            initial={{ x: 440 }}
            animate={{ x: 0 }}
            exit={{ x: 440 }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 flex w-[420px] flex-col bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[16px] font-bold">Order Details</h3>
                <button onClick={onClose} className="rounded-md p-1 hover:bg-muted">
                  <Icons.close className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="font-mono text-[15px] font-bold text-primary">{order.id}</div>
                <Badge tone={statusTone(order.status)}>{order.status}</Badge>
              </div>
              <div className="mt-3 flex items-center gap-4 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><Icons.truck className="h-3.5 w-3.5" />{order.type}</span>
                <span className="flex items-center gap-1.5"><Icons.mapPin className="h-3.5 w-3.5" />{order.city}</span>
                <span className="flex items-center gap-1.5"><Icons.clock className="h-3.5 w-3.5" />{order.time}</span>
              </div>
            </div>

            {/* Scroll body */}
            <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* Customer */}
              <Section title="Customer Details">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-[13px] font-bold text-primary">
                    {order.user.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold">{order.user}</div>
                    <div className="text-[12px] text-muted-foreground">{order.phone}</div>
                  </div>
                  <button className="rounded-lg border border-border p-1.5 hover:bg-muted">
                    <Icons.phone className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </Section>

              {/* Route */}
              <Section title="Route">
                <div className="space-y-2 rounded-xl bg-surface-alt p-3 text-[13px]">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-success" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pickup</div>
                      <div className="font-medium">{order.pickup}</div>
                    </div>
                  </div>
                  <div className="ml-1 h-4 border-l-2 border-dashed border-border" />
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-destructive" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Drop</div>
                      <div className="font-medium">{order.drop}</div>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Goods */}
              <Section title={`Goods (${order.goods.length})`}>
                <div className="space-y-2">
                  {order.goods.map((g, i) => (
                    <div key={i} className="flex items-center gap-3 text-[13px]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">{i + 1}</span>
                      <div className="flex-1">
                        <div className="font-medium">{g.name}</div>
                        <div className="text-[11px] text-muted-foreground">{g.weight}</div>
                      </div>
                      <span className="font-mono text-[13px] font-semibold">₹{g.price}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Pricing */}
              <Section title="Pricing Breakdown">
                <div className="space-y-2 text-[13px]">
                  {[
                    ["Subtotal", order.amount * 0.85],
                    ["Platform Fee", order.amount * 0.05],
                    ["GST (2.5%)", order.amount * 0.025],
                    ["Driver Tip", 0],
                    ["Discount", -order.amount * 0.04],
                  ].map(([l, v]) => (
                    <div key={l as string} className="flex justify-between">
                      <span className="text-muted-foreground">{l}</span>
                      <span className={`font-mono font-medium ${(v as number) < 0 ? "text-destructive" : ""}`}>
                        {(v as number) < 0 ? "- " : ""}{formatINR(Math.abs(Math.round(v as number)))}
                      </span>
                    </div>
                  ))}
                  <div className="my-2 border-t border-border" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[15px] font-bold">Total</span>
                    <span className="font-display text-[20px] font-bold text-primary">{formatINR(order.amount)}</span>
                  </div>
                </div>
              </Section>

              {/* Timeline */}
              <Section title="Order Timeline">
                <div className="space-y-3 text-[13px]">
                  {[
                    { c: "bg-success", l: "Order Placed", t: order.time },
                    { c: "bg-info", l: "Driver Assigned", t: "11:31 AM" },
                    { c: "bg-warning", l: "Picked Up", t: "11:35 AM" },
                    { c: "bg-muted-foreground/30", l: "Delivered", t: "—" },
                  ].map((e) => (
                    <div key={e.l} className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${e.c}`} />
                      <span className="flex-1">{e.l}</span>
                      <span className="text-[11px] text-muted-foreground">{e.t}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Footer actions */}
            <div className="grid grid-cols-3 gap-2 border-t border-border bg-card p-4">
              <button className="rounded-lg bg-primary px-3 py-2.5 text-[12px] font-semibold text-primary-foreground hover:bg-primary/90">
                View / Edit
              </button>
              <button className="rounded-lg border border-border px-3 py-2.5 text-[12px] font-semibold hover:bg-muted">
                Export PDF
              </button>
              <button className="rounded-lg border border-destructive/40 px-3 py-2.5 text-[12px] font-semibold text-destructive hover:bg-destructive/10">
                Cancel Order
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  );
}
