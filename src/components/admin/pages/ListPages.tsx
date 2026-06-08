import { Badge, statusTone } from "@/components/admin/Badge";
import { Icons } from "@/components/admin/icon";
import { AdminTablePage, type Column } from "@/components/admin/shared/AdminTablePage";
import {
  userForm, driverForm, fleetOwnerForm, vehicleForm, vehicleCategoryForm,
  goodsTypeForm, packageForm, couponForm, transactionForm, reviewForm,
  cityForm, subAdminForm, faqForm, homeBannerForm, homeSectionForm, notificationForm,
} from "@/components/admin/shared/entity-forms";
import { formatINR } from "@/lib/mock-data";
import {
  users, drivers, fleetOwners, vehicles, vehicleCategories, goodsTypes,
  pricingPackages, coupons, transactions, reviews, cities, subAdmins, faqs,
  homeBanners, homeSections, notifications,
} from "@/lib/admin-mock-data";

const defaultFilters = [
  { icon: "calendar" as const, label: "12 Jun 2026" },
  { icon: "cities" as const, label: "All Cities" },
];

function idBadge(id: string) {
  return (
    <span className="rounded-md bg-primary/8 px-2 py-1 font-mono text-[12px] font-semibold text-primary">
      {id}
    </span>
  );
}

function userAvatar(name: string) {
  const initials = name.split(" ").map((x) => x[0]).slice(0, 2).join("");
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
        {initials}
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
}

function statusBadge(status: string) {
  return <Badge tone={statusTone(status)}>{status}</Badge>;
}

function ratingStars(r: number) {
  return (
    <span className="flex items-center gap-1 font-semibold text-warning">
      ★ {r.toFixed(1)}
    </span>
  );
}

export function UsersPage() {
  return (
    <AdminTablePage
      title="Users"
      breadcrumbs={["Dashboard", "Users"]}
      stats={[
        { key: "all", label: "Total Users", value: 48210, icon: "users", tint: "primary" },
        { key: "active", label: "Active", value: 45820, icon: "check", tint: "success" },
        { key: "new", label: "New Today", value: 312, icon: "userPlus", tint: "teal" },
        { key: "inactive", label: "Inactive", value: 1840, icon: "clock", tint: "warning" },
        { key: "suspended", label: "Suspended", value: 550, icon: "close", tint: "destructive" },
      ]}
      tabs={["All Users", "Active", "Inactive", "Suspended"] as const}
      filterTab={(u, tab) => {
        if (tab === "All Users") return true;
        return u.status === tab;
      }}
      filters={defaultFilters}
      searchPlaceholder="Search by name, phone, email…"
      addLabel="Add User"
      data={users}
      rowKey={(u) => u.id}
      totalLabel={`${users.length} users`}
      form={userForm}
      columns={[
        { key: "id", header: "User ID", render: (u) => idBadge(u.id) },
        { key: "name", header: "Name", className: "max-w-none", render: (u) => userAvatar(u.name) },
        { key: "phone", header: "Phone", render: (u) => <span className="text-muted-foreground">{u.phone}</span> },
        { key: "email", header: "Email", render: (u) => <span className="text-muted-foreground">{u.email}</span> },
        { key: "city", header: "City", render: (u) => u.city },
        { key: "orders", header: "Orders", render: (u) => <span className="font-semibold">{u.orders}</span> },
        { key: "status", header: "Status", render: (u) => statusBadge(u.status) },
      ] satisfies Column<(typeof users)[0]>[]}
    />
  );
}

export function DriversPage() {
  return (
    <AdminTablePage
      title="Drivers"
      breadcrumbs={["Dashboard", "Drivers"]}
      stats={[
        { key: "all", label: "Total Drivers", value: 3842, icon: "drivers", tint: "primary" },
        { key: "online", label: "Online", value: 1284, icon: "car", tint: "teal" },
        { key: "trip", label: "On Trip", value: 847, icon: "truck", tint: "info" },
        { key: "kyc", label: "KYC Pending", value: 42, icon: "clock", tint: "warning" },
        { key: "rating", label: "Avg Rating", value: "4.6", icon: "star", tint: "success" },
      ]}
      tabs={["All Drivers", "Active", "Pending", "Suspended"] as const}
      filterTab={(d, tab) => tab === "All Drivers" || d.status === tab}
      filters={[...defaultFilters, { icon: "vehicles", label: "All Vehicles" }]}
      searchPlaceholder="Search drivers…"
      addLabel="Add Driver"
      data={drivers}
      rowKey={(d) => d.id}
      totalLabel={`${drivers.length} drivers`}
      form={driverForm}
      columns={[
        { key: "id", header: "Driver ID", render: (d) => idBadge(d.id) },
        { key: "name", header: "Name", render: (d) => userAvatar(d.name) },
        { key: "phone", header: "Phone", render: (d) => <span className="text-muted-foreground">{d.phone}</span> },
        { key: "city", header: "City", render: (d) => d.city },
        { key: "vehicle", header: "Vehicle", render: (d) => d.vehicle },
        { key: "rating", header: "Rating", render: (d) => ratingStars(d.rating) },
        { key: "trips", header: "Trips", render: (d) => <span className="font-semibold">{d.trips.toLocaleString()}</span> },
        { key: "kyc", header: "KYC", render: (d) => statusBadge(d.kyc) },
        { key: "status", header: "Status", render: (d) => statusBadge(d.status) },
      ]}
    />
  );
}

export function FleetOwnersPage() {
  return (
    <AdminTablePage
      title="Fleet Owners"
      breadcrumbs={["Dashboard", "Fleet Owners"]}
      stats={[
        { key: "all", label: "Fleet Owners", value: 184, icon: "fleet", tint: "primary" },
        { key: "drivers", label: "Managed Drivers", value: 1240, icon: "drivers", tint: "teal" },
        { key: "vehicles", label: "Fleet Vehicles", value: 986, icon: "vehicles", tint: "info" },
        { key: "pending", label: "Pending Approval", value: 8, icon: "clock", tint: "warning" },
      ]}
      tabs={["All", "Active", "Pending"] as const}
      filterTab={(f, tab) => tab === "All" || f.status === tab}
      filters={defaultFilters}
      searchPlaceholder="Search fleet owners…"
      addLabel="Add Fleet Owner"
      data={fleetOwners}
      rowKey={(f) => f.id}
      form={fleetOwnerForm}
      columns={[
        { key: "id", header: "ID", render: (f) => idBadge(f.id) },
        { key: "name", header: "Owner", render: (f) => userAvatar(f.name) },
        { key: "company", header: "Company", render: (f) => f.company },
        { key: "phone", header: "Phone", render: (f) => <span className="text-muted-foreground">{f.phone}</span> },
        { key: "drivers", header: "Drivers", render: (f) => f.drivers },
        { key: "vehicles", header: "Vehicles", render: (f) => f.vehicles },
        { key: "city", header: "City", render: (f) => f.city },
        { key: "status", header: "Status", render: (f) => statusBadge(f.status) },
      ]}
    />
  );
}

export function VehiclesPage() {
  return (
    <AdminTablePage
      title="Vehicles"
      breadcrumbs={["Dashboard", "Vehicles"]}
      stats={[
        { key: "all", label: "Total Vehicles", value: 3512, icon: "vehicles", tint: "primary" },
        { key: "active", label: "Active", value: 3280, icon: "check", tint: "success" },
        { key: "inactive", label: "Inactive", value: 232, icon: "clock", tint: "warning" },
      ]}
      tabs={["All", "Active", "Inactive"] as const}
      filterTab={(v, tab) => tab === "All" || v.status === tab}
      filters={[...defaultFilters, { icon: "vehicleCats", label: "All Categories" }]}
      searchPlaceholder="Search by number, driver…"
      addLabel="Register Vehicle"
      data={vehicles}
      rowKey={(v) => v.id}
      form={vehicleForm}
      columns={[
        { key: "id", header: "Vehicle ID", render: (v) => idBadge(v.id) },
        { key: "number", header: "Number", render: (v) => <span className="font-mono font-semibold">{v.number}</span> },
        { key: "type", header: "Type", render: (v) => v.type },
        { key: "category", header: "Category", render: (v) => <Badge tone="muted">{v.category}</Badge> },
        { key: "driver", header: "Driver", render: (v) => v.driver },
        { key: "city", header: "City", render: (v) => v.city },
        { key: "capacity", header: "Capacity", render: (v) => v.capacity },
        { key: "status", header: "Status", render: (v) => statusBadge(v.status) },
      ]}
    />
  );
}

export function VehicleCategoriesPage() {
  return (
    <AdminTablePage
      title="Vehicle Categories"
      breadcrumbs={["Dashboard", "Vehicle Categories"]}
      stats={[
        { key: "cats", label: "Categories", value: 5, icon: "vehicleCats", tint: "primary" },
        { key: "vehicles", label: "Total Vehicles", value: 3502, icon: "vehicles", tint: "teal" },
      ]}
      filters={[]}
      searchPlaceholder="Search categories…"
      addLabel="Add Category"
      data={vehicleCategories}
      rowKey={(v) => v.id}
      form={vehicleCategoryForm}
      columns={[
        { key: "id", header: "ID", render: (v) => idBadge(v.id) },
        { key: "name", header: "Category", render: (v) => <span className="font-semibold">{v.name}</span> },
        { key: "sub", header: "Sub-Category", render: (v) => v.subCategory },
        { key: "base", header: "Base Fare", render: (v) => formatINR(v.baseFare) },
        { key: "km", header: "Per Km", render: (v) => formatINR(v.perKm) },
        { key: "vehicles", header: "Vehicles", render: (v) => v.vehicles.toLocaleString() },
        { key: "status", header: "Status", render: (v) => statusBadge(v.status) },
      ]}
    />
  );
}

export function GoodsTypesPage() {
  return (
    <AdminTablePage
      title="Goods Types"
      breadcrumbs={["Dashboard", "Goods Types"]}
      stats={[
        { key: "types", label: "Goods Types", value: 24, icon: "goods", tint: "primary" },
        { key: "orders", label: "Orders (MTD)", value: 16856, icon: "package", tint: "teal" },
        { key: "fragile", label: "Fragile Types", value: 8, icon: "clock", tint: "warning" },
      ]}
      tabs={["All", "Active", "Inactive"] as const}
      filterTab={(g, tab) => tab === "All" || g.status === tab}
      searchPlaceholder="Search goods types…"
      addLabel="Add Goods Type"
      data={goodsTypes}
      rowKey={(g) => g.id}
      form={goodsTypeForm}
      columns={[
        { key: "id", header: "ID", render: (g) => idBadge(g.id) },
        { key: "name", header: "Name", render: (g) => <span className="font-semibold">{g.name}</span> },
        { key: "cat", header: "Category", render: (g) => <Badge tone="muted">{g.category}</Badge> },
        { key: "weight", header: "Max Weight", render: (g) => g.maxWeight },
        { key: "fragile", header: "Fragile", render: (g) => <Badge tone={g.fragile ? "warning" : "muted"}>{g.fragile ? "Yes" : "No"}</Badge> },
        { key: "orders", header: "Orders", render: (g) => g.orders.toLocaleString() },
        { key: "status", header: "Status", render: (g) => statusBadge(g.status) },
      ]}
    />
  );
}

export function PackagesPage() {
  return (
    <AdminTablePage
      title="Packages"
      breadcrumbs={["Dashboard", "Packages"]}
      stats={[
        { key: "pkgs", label: "Active Packages", value: 18, icon: "packages", tint: "primary" },
        { key: "subs", label: "Subscribers", value: 457, icon: "users", tint: "teal" },
        { key: "rev", label: "MRR", value: 842000, icon: "rupee", tint: "success", isCurrency: true },
      ]}
      filters={[{ icon: "cities", label: "All Cities" }, { icon: "vehicleCats", label: "All Categories" }]}
      searchPlaceholder="Search packages…"
      addLabel="Create Package"
      data={pricingPackages}
      rowKey={(p) => p.id}
      form={packageForm}
      columns={[
        { key: "id", header: "ID", render: (p) => idBadge(p.id) },
        { key: "name", header: "Package", render: (p) => <span className="font-semibold">{p.name}</span> },
        { key: "city", header: "City", render: (p) => p.city },
        { key: "cat", header: "Category", render: (p) => p.category },
        { key: "price", header: "Price", render: (p) => <span className="font-semibold">{formatINR(p.price)}</span> },
        { key: "duration", header: "Duration", render: (p) => p.duration },
        { key: "subs", header: "Subscribers", render: (p) => p.subscribers },
        { key: "status", header: "Status", render: (p) => statusBadge(p.status) },
      ]}
    />
  );
}

export function CouponsPage() {
  return (
    <AdminTablePage
      title="Coupons"
      breadcrumbs={["Dashboard", "Coupons"]}
      stats={[
        { key: "active", label: "Active Coupons", value: 42, icon: "coupons", tint: "primary" },
        { key: "uses", label: "Uses Today", value: 842, icon: "receipt", tint: "teal" },
        { key: "saved", label: "Total Saved", value: 124500, icon: "rupee", tint: "success", isCurrency: true },
      ]}
      tabs={["All", "Active", "Inactive"] as const}
      filterTab={(c, tab) => tab === "All" || c.status === tab}
      searchPlaceholder="Search coupon codes…"
      addLabel="Create Coupon"
      data={coupons}
      rowKey={(c) => c.id}
      form={couponForm}
      columns={[
        { key: "code", header: "Code", render: (c) => <span className="font-mono font-bold text-primary">{c.code}</span> },
        { key: "discount", header: "Discount", render: (c) => <span className="font-semibold">{c.discount}</span> },
        { key: "type", header: "Type", render: (c) => <Badge tone={c.type === "Percent" ? "info" : "teal"}>{c.type}</Badge> },
        { key: "min", header: "Min Order", render: (c) => formatINR(c.minOrder) },
        { key: "uses", header: "Uses", render: (c) => `${c.uses} / ${c.maxUses}` },
        { key: "expires", header: "Expires", render: (c) => <span className="text-muted-foreground">{c.expires}</span> },
        { key: "status", header: "Status", render: (c) => statusBadge(c.status) },
      ]}
    />
  );
}

export function TransactionsPage() {
  return (
    <AdminTablePage
      title="Transactions"
      breadcrumbs={["Dashboard", "Transactions"]}
      stats={[
        { key: "vol", label: "Volume Today", value: 1245000, icon: "transactions", tint: "primary", isCurrency: true },
        { key: "pending", label: "Pending Withdrawals", value: 18, icon: "clock", tint: "warning" },
        { key: "completed", label: "Completed", value: 842, icon: "check", tint: "success" },
        { key: "failed", label: "Failed", value: 12, icon: "close", tint: "destructive" },
      ]}
      tabs={["All", "Completed", "Pending", "Failed"] as const}
      filterTab={(t, tab) => tab === "All" || t.status === tab}
      filters={[...defaultFilters, { icon: "wallet", label: "All Types" }]}
      searchPlaceholder="Search transactions…"
      addLabel="Add Transaction"
      data={transactions}
      rowKey={(t) => t.id}
      form={transactionForm}
      columns={[
        { key: "id", header: "Txn ID", render: (t) => idBadge(t.id) },
        { key: "user", header: "User", render: (t) => t.user },
        { key: "type", header: "Type", render: (t) => <Badge tone={t.type === "Credit" ? "success" : t.type === "Withdrawal" ? "warning" : "info"}>{t.type}</Badge> },
        { key: "amount", header: "Amount", render: (t) => <span className="font-semibold">{formatINR(t.amount)}</span> },
        { key: "method", header: "Method", render: (t) => t.method },
        { key: "ref", header: "Reference", render: (t) => <span className="font-mono text-[11px] text-muted-foreground">{t.ref}</span> },
        { key: "date", header: "Date", render: (t) => t.date },
        { key: "status", header: "Status", render: (t) => statusBadge(t.status) },
      ]}
    />
  );
}

export function ReviewsPage() {
  return (
    <AdminTablePage
      title="Reviews"
      breadcrumbs={["Dashboard", "Reviews"]}
      stats={[
        { key: "total", label: "Total Reviews", value: 8420, icon: "reviews", tint: "primary" },
        { key: "avg", label: "Avg Rating", value: "4.6", icon: "star", tint: "warning" },
        { key: "today", label: "Today", value: 124, icon: "clock", tint: "teal" },
      ]}
      tabs={["All", "User Reviews", "Driver Reviews"] as const}
      filterTab={(r, tab) => {
        if (tab === "All") return true;
        return tab === "User Reviews" ? r.role === "User" : r.role === "Driver";
      }}
      searchPlaceholder="Search reviews…"
      addLabel="Add Review"
      data={reviews}
      rowKey={(r) => r.id}
      form={reviewForm}
      columns={[
        { key: "from", header: "From", render: (r) => userAvatar(r.from) },
        { key: "to", header: "To", render: (r) => r.to },
        { key: "role", header: "Type", render: (r) => <Badge tone={r.role === "User" ? "primary" : "teal"}>{r.role}</Badge> },
        { key: "rating", header: "Rating", render: (r) => ratingStars(r.rating) },
        { key: "comment", header: "Comment", render: (r) => <span className="max-w-[200px] truncate text-muted-foreground">{r.comment}</span> },
        { key: "order", header: "Order", render: (r) => <span className="font-mono text-[11px]">{r.orderId}</span> },
        { key: "date", header: "Date", render: (r) => r.date },
      ]}
    />
  );
}

export function CitiesPage() {
  return (
    <AdminTablePage
      title="Cities"
      breadcrumbs={["Dashboard", "Cities"]}
      stats={[
        { key: "cities", label: "Active Cities", value: 12, icon: "cities", tint: "primary" },
        { key: "zones", label: "Total Zones", value: 55, icon: "mapPin", tint: "teal" },
        { key: "pending", label: "Pending Launch", value: 2, icon: "clock", tint: "warning" },
      ]}
      tabs={["All", "Active", "Pending"] as const}
      filterTab={(c, tab) => tab === "All" || c.status === tab}
      searchPlaceholder="Search cities…"
      addLabel="Add City"
      data={cities}
      rowKey={(c) => c.id}
      form={cityForm}
      columns={[
        { key: "name", header: "City", render: (c) => <span className="font-semibold">{c.name}</span> },
        { key: "state", header: "State", render: (c) => c.state },
        { key: "drivers", header: "Drivers", render: (c) => c.drivers.toLocaleString() },
        { key: "orders", header: "Orders", render: (c) => c.orders.toLocaleString() },
        { key: "zones", header: "Zones", render: (c) => c.zones },
        { key: "status", header: "Status", render: (c) => statusBadge(c.status) },
      ]}
    />
  );
}

export function SubAdminsPage() {
  return (
    <AdminTablePage
      title="Sub-Admins"
      breadcrumbs={["Dashboard", "Sub-Admins"]}
      stats={[
        { key: "admins", label: "Total Admins", value: 8, icon: "subAdmins", tint: "primary" },
        { key: "active", label: "Active", value: 7, icon: "check", tint: "success" },
      ]}
      tabs={["All", "Active", "Inactive"] as const}
      filterTab={(a, tab) => tab === "All" || a.status === tab}
      searchPlaceholder="Search admins…"
      addLabel="Invite Admin"
      data={subAdmins}
      rowKey={(a) => a.id}
      form={subAdminForm}
      columns={[
        { key: "name", header: "Name", render: (a) => userAvatar(a.name) },
        { key: "email", header: "Email", render: (a) => <span className="text-muted-foreground">{a.email}</span> },
        { key: "role", header: "Role", render: (a) => <Badge tone="primary">{a.role}</Badge> },
        { key: "perms", header: "Permissions", render: (a) => `${a.permissions} modules` },
        { key: "login", header: "Last Login", render: (a) => a.lastLogin },
        { key: "status", header: "Status", render: (a) => statusBadge(a.status) },
      ]}
    />
  );
}

export function FaqsPage() {
  return (
    <AdminTablePage
      title="FAQs"
      breadcrumbs={["Dashboard", "FAQs"]}
      stats={[
        { key: "faqs", label: "Total FAQs", value: 48, icon: "faq", tint: "primary" },
        { key: "views", label: "Views (MTD)", value: 22670, icon: "view", tint: "teal" },
      ]}
      tabs={["All", "Orders", "Payments", "Drivers"] as const}
      filterTab={(f, tab) => tab === "All" || f.category === tab}
      searchPlaceholder="Search FAQs…"
      addLabel="Add FAQ"
      data={faqs}
      rowKey={(f) => f.id}
      form={faqForm}
      columns={[
        { key: "q", header: "Question", render: (f) => <span className="font-medium">{f.question}</span> },
        { key: "cat", header: "Category", render: (f) => <Badge tone="muted">{f.category}</Badge> },
        { key: "views", header: "Views", render: (f) => f.views.toLocaleString() },
        { key: "updated", header: "Updated", render: (f) => f.updated },
        { key: "status", header: "Status", render: (f) => statusBadge(f.status) },
      ]}
    />
  );
}

export function HomeBannersPage() {
  return (
    <AdminTablePage
      title="Home Banners"
      breadcrumbs={["Dashboard", "Home Banners"]}
      stats={[
        { key: "active", label: "Active Banners", value: 6, icon: "banners", tint: "primary" },
        { key: "clicks", label: "Clicks (MTD)", value: 28300, icon: "trending", tint: "teal" },
      ]}
      tabs={["All", "Active", "Inactive"] as const}
      filterTab={(b, tab) => tab === "All" || b.status === tab}
      filters={[{ icon: "cities", label: "All Cities" }, { icon: "banners", label: "All Placements" }]}
      searchPlaceholder="Search banners…"
      addLabel="Upload Banner"
      data={homeBanners}
      rowKey={(b) => b.id}
      form={homeBannerForm}
      columns={[
        { key: "title", header: "Title", className: "max-w-[240px]", render: (b) => (
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-teal/30 ring-1 ring-border">
              <Icons.banners className="h-4 w-4 text-primary" />
            </div>
            <span className="truncate font-semibold">{b.title}</span>
          </div>
        )},
        { key: "placement", header: "Placement", render: (b) => b.placement },
        { key: "city", header: "City", render: (b) => b.city },
        { key: "clicks", header: "Clicks", render: (b) => b.clicks.toLocaleString() },
        { key: "period", header: "Period", render: (b) => <span className="text-[12px] text-muted-foreground">{b.starts} – {b.ends}</span> },
        { key: "status", header: "Status", render: (b) => statusBadge(b.status) },
      ]}
    />
  );
}

export function HomeSectionsPage() {
  return (
    <AdminTablePage
      title="Home Sections"
      breadcrumbs={["Dashboard", "Home Sections"]}
      stats={[
        { key: "sections", label: "Sections", value: 8, icon: "sections", tint: "primary" },
        { key: "active", label: "Active", value: 6, icon: "check", tint: "success" },
      ]}
      searchPlaceholder="Search sections…"
      addLabel="Add Section"
      data={homeSections}
      rowKey={(s) => s.id}
      form={homeSectionForm}
      columns={[
        { key: "order", header: "#", render: (s) => <span className="font-bold text-muted-foreground">{s.order}</span> },
        { key: "title", header: "Section", render: (s) => <span className="font-semibold">{s.title}</span> },
        { key: "type", header: "Type", render: (s) => <Badge tone="muted">{s.type}</Badge> },
        { key: "items", header: "Items", render: (s) => s.items },
        { key: "updated", header: "Updated", render: (s) => s.updated },
        { key: "status", header: "Status", render: (s) => statusBadge(s.status) },
      ]}
    />
  );
}

export function NotificationsPage() {
  return (
    <AdminTablePage
      title="Notifications"
      breadcrumbs={["Dashboard", "Notifications"]}
      stats={[
        { key: "sent", label: "Sent Today", value: 52052, icon: "notifications", tint: "primary" },
        { key: "opened", label: "Open Rate", value: "38%", icon: "trending", tint: "teal" },
        { key: "scheduled", label: "Scheduled", value: 3, icon: "clock", tint: "warning" },
      ]}
      tabs={["All", "Sent", "Scheduled", "Draft"] as const}
      filterTab={(n, tab) => tab === "All" || n.status === tab}
      searchPlaceholder="Search notifications…"
      addLabel="Compose"
      data={notifications}
      rowKey={(n) => n.id}
      form={notificationForm}
      columns={[
        { key: "title", header: "Title", render: (n) => <span className="font-semibold">{n.title}</span> },
        { key: "audience", header: "Audience", render: (n) => n.audience },
        { key: "channel", header: "Channel", render: (n) => <Badge tone={n.channel === "Push" ? "primary" : n.channel === "SMS" ? "teal" : "info"}>{n.channel}</Badge> },
        { key: "sent", header: "Sent", render: (n) => n.sent.toLocaleString() },
        { key: "opened", header: "Opened", render: (n) => n.opened.toLocaleString() },
        { key: "date", header: "Date", render: (n) => n.date },
        { key: "status", header: "Status", render: (n) => statusBadge(n.status) },
      ]}
    />
  );
}
