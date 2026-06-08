import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge, statusTone } from "@/components/admin/Badge";
import { Icons } from "@/components/admin/icon";
import { EntityFormModal, type FormModalMode } from "@/components/admin/shared/EntityFormModal";
import { AppearanceSettings } from "@/components/admin/settings/AppearanceSettings";
import { chatTicketForm, emptyFormValues, companyTabDefaults, companyTabFields } from "@/components/admin/shared/entity-forms";
import { chatMessages, chatTickets as initialTickets, type ChatTicket } from "@/lib/admin-mock-data";

export function SupportChatPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selected, setSelected] = useState(tickets[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<FormModalMode>("create");
  const [editingTicket, setEditingTicket] = useState<ChatTicket | null>(null);

  const openCreate = () => {
    setEditingTicket(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEdit = () => {
    setEditingTicket(selected);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleSave = (values: Record<string, string | boolean>) => {
    if (modalMode === "create") {
      const created = chatTicketForm.toRow(values, undefined, tickets);
      setTickets((prev) => [created, ...prev]);
      setSelected(created);
      toast.success("Ticket created");
    } else if (editingTicket) {
      const updated = chatTicketForm.toRow(values, editingTicket, tickets);
      setTickets((prev) => prev.map((t) => (t.id === editingTicket.id ? updated : t)));
      setSelected(updated);
      toast.success("Ticket updated");
    }
  };

  const modalValues = editingTicket ? chatTicketForm.fromRow(editingTicket) : emptyFormValues(chatTicketForm.fields);

  return (
    <AdminLayout title="Support Chat" module="GATI Operations" breadcrumbs={["Dashboard", "Support Chat"]}>
      <div className="admin-card grid h-[calc(100vh-12rem)] min-h-[520px] grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[320px_1fr]">
        {/* Ticket list */}
        <div className="flex flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2">
                <Icons.search className="h-4 w-4 text-muted-foreground" />
                <input className="w-full bg-transparent text-sm outline-none" placeholder="Search tickets…" />
              </div>
              <button
                type="button"
                onClick={openCreate}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                aria-label="New ticket"
              >
                <Icons.plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              {["Open", "Waiting", "Resolved"].map((s) => (
                <button key={s} type="button" className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold hover:bg-surface-alt">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="scrollbar-thin flex-1 overflow-y-auto">
            {tickets.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t)}
                className={`w-full border-b border-border px-4 py-3.5 text-left transition-colors hover:bg-surface-alt ${selected.id === t.id ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-[13px]">{t.user}</span>
                  <Badge tone={statusTone(t.status)}>{t.status}</Badge>
                </div>
                <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{t.subject}</p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>{t.id}</span>
                  <span>·</span>
                  <span>{t.messages} msgs</span>
                  <span>·</span>
                  <span className={t.priority === "High" ? "font-semibold text-destructive" : ""}>{t.priority}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat thread */}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="min-w-0">
              <h3 className="truncate font-display text-[15px] font-bold">{selected.subject}</h3>
              <p className="text-[12px] text-muted-foreground">
                {selected.user} · {selected.id} · Agent: {selected.agent ?? "Unassigned"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={openEdit} className="rounded-lg border border-border px-3 py-1.5 text-[12px] font-semibold hover:bg-surface-alt">
                Edit
              </button>
              <button type="button" className="rounded-lg border border-border px-3 py-1.5 text-[12px] font-semibold hover:bg-surface-alt">
                Assign
              </button>
              <button type="button" className="rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground hover:bg-primary/90">
                Resolve
              </button>
            </div>
          </div>

          <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto bg-surface-alt/50 p-5">
            {chatMessages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] ${
                    m.from === "agent"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border border-border bg-card"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {m.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2">
              <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Type a reply…" />
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                <Icons.send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <EntityFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        entityName={chatTicketForm.entityName}
        fields={chatTicketForm.fields}
        values={modalValues}
        onSubmit={handleSave}
      />
    </AdminLayout>
  );
}

const companyTabs = ["Branding", "Operations", "Legal", "Pricing"] as const;

export function CompanyPage() {
  const [tab, setTab] = useState<(typeof companyTabs)[number]>("Branding");
  const [tabData, setTabData] = useState(companyTabDefaults);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (values: Record<string, string | boolean>) => {
    setTabData((prev) => ({ ...prev, [tab]: values }));
    toast.success(`${tab} settings saved`);
  };

  return (
    <AdminLayout title="Company Settings" module="GATI Admin" breadcrumbs={["Dashboard", "Company"]}>
      <div className="admin-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 pt-4">
          <div className="flex flex-wrap gap-4">
            {companyTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`relative pb-3 text-[13px] font-semibold ${tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t}
                {tab === t && (
                  <motion.span layoutId="company-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mb-3 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-[13px] font-semibold hover:bg-surface-alt"
          >
            <Icons.edit className="h-4 w-4" /> Edit {tab}
          </button>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          {Object.entries(tabData[tab]).map(([key, val]) => (
            <div key={key} className="rounded-xl border border-border bg-surface-alt/40 px-4 py-3">
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
              </div>
              <div className="mt-1 text-[14px] font-semibold">
                {typeof val === "boolean" ? (val ? "Enabled" : "Disabled") : String(val)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <EntityFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode="edit"
        entityName={`${tab} Settings`}
        fields={companyTabFields[tab]}
        values={tabData[tab]}
        onSubmit={handleSave}
      />
    </AdminLayout>
  );
}

const settingsSections = [
  {
    title: "General",
    items: [
      { label: "Maintenance Mode", desc: "Disable new orders platform-wide", type: "toggle" as const },
      { label: "Debug Logging", desc: "Enable verbose server logs", type: "toggle" as const },
    ],
  },
  {
    title: "Notifications",
    items: [
      { label: "Email Alerts", desc: "Send admin email for critical events", type: "toggle" as const, defaultChecked: true },
      { label: "SMS Gateway", desc: "Provider: MSG91", type: "select" as const, value: "MSG91" },
    ],
  },
  {
    title: "Security",
    items: [
      { label: "Two-Factor Auth", desc: "Require 2FA for all admins", type: "toggle" as const, defaultChecked: true },
      { label: "Session Timeout", desc: "Auto logout after inactivity", type: "select" as const, value: "30 minutes" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { label: "Payment Gateway", desc: "Razorpay — Live mode", type: "select" as const, value: "Razorpay" },
      { label: "Maps Provider", desc: "Google Maps Platform", type: "select" as const, value: "Google Maps" },
    ],
  },
];

export function SettingsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ label: string; type: "toggle" | "select"; value: string | boolean } | null>(null);

  const openEdit = (label: string, type: "toggle" | "select", value: string | boolean) => {
    setEditingItem({ label, type, value });
    setModalOpen(true);
  };

  const settingFields = editingItem
    ? editingItem.type === "toggle"
      ? [{ name: "enabled", label: editingItem.label, type: "switch" as const }]
      : [{
          name: "value", label: editingItem.label, type: "select" as const,
          options: editingItem.label.includes("Gateway")
            ? [{ label: "MSG91", value: "MSG91" }, { label: "Twilio", value: "Twilio" }]
            : editingItem.label.includes("Timeout")
              ? [{ label: "15 minutes", value: "15 minutes" }, { label: "30 minutes", value: "30 minutes" }, { label: "60 minutes", value: "60 minutes" }]
              : editingItem.label.includes("Payment")
                ? [{ label: "Razorpay", value: "Razorpay" }, { label: "Stripe", value: "Stripe" }]
                : [{ label: "Google Maps", value: "Google Maps" }, { label: "Mapbox", value: "Mapbox" }],
        }]
    : [];

  const settingValues = editingItem
    ? editingItem.type === "toggle"
      ? { enabled: editingItem.value === true }
      : { value: String(editingItem.value) }
    : {};

  return (
    <AdminLayout title="Settings" module="GATI Admin" breadcrumbs={["Dashboard", "Settings"]}>
      <div className="space-y-6">
        <AppearanceSettings />

        {settingsSections.map((section) => (
          <div key={section.title} className="admin-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="font-display text-[15px] font-bold">{section.title}</h3>
            </div>
            <div className="divide-y divide-border">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold">{item.label}</div>
                    <div className="text-[12px] text-muted-foreground">{item.desc}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.type === "toggle" ? (
                      <ToggleSwitch defaultChecked={"defaultChecked" in item ? item.defaultChecked : false} />
                    ) : (
                      <span className="text-[12px] font-medium">{item.value}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => openEdit(item.label, item.type, item.type === "toggle" ? ("defaultChecked" in item ? !!item.defaultChecked : false) : item.value)}
                      className="rounded-md p-1.5 hover:bg-muted"
                      aria-label={`Edit ${item.label}`}
                    >
                      <Icons.edit className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <EntityFormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          mode="edit"
          entityName="Setting"
          fields={settingFields}
          values={settingValues}
          onSubmit={() => toast.success(`${editingItem.label} updated`)}
        />
      )}
    </AdminLayout>
  );
}

function ToggleSwitch({ defaultChecked }: { defaultChecked?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={defaultChecked}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${defaultChecked ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${defaultChecked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}
