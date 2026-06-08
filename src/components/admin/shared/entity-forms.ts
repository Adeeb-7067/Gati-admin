export type FormFieldType = "text" | "email" | "tel" | "number" | "textarea" | "select" | "switch" | "date";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  colSpan?: 1 | 2;
}

export type FormValues = Record<string, string | boolean>;

export interface EntityFormConfig<T> {
  entityName: string;
  fields: FormFieldConfig[];
  fromRow: (row: T) => FormValues;
  toRow: (values: FormValues, existing?: T, allRows?: T[]) => T;
}

import type {
  User, Driver, FleetOwner, Vehicle, VehicleCategory, GoodsType,
  PricingPackage, Coupon, Transaction, Review, City, SubAdmin, Faq,
  HomeBanner, HomeSection, NotificationRecord, ChatTicket,
} from "@/lib/admin-mock-data";
import type { Order } from "@/lib/mock-data";

const cities = ["Mumbai", "Bengaluru", "Delhi NCR", "Pune", "Hyderabad", "Chennai"];
const cityOptions = cities.map((c) => ({ label: c, value: c }));

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pending", value: "Pending" },
  { label: "Suspended", value: "Suspended" },
];

function str(v: FormValues, key: string, fallback = "") {
  const val = v[key];
  return typeof val === "string" ? val : fallback;
}

function num(v: FormValues, key: string, fallback = 0) {
  const n = Number(str(v, key));
  return Number.isFinite(n) ? n : fallback;
}

function bool(v: FormValues, key: string) {
  return v[key] === true || v[key] === "true";
}

function nextNumId(prefix: string, rows: { id: string }[]) {
  const nums = rows.map((r) => {
    const part = r.id.split("-").pop() ?? "0";
    return parseInt(part.replace(/\D/g, "") || "0", 10);
  });
  return `${prefix}-${String(Math.max(0, ...nums, 0) + 1).padStart(3, "0")}`;
}

export const userForm: EntityFormConfig<User> = {
  entityName: "User",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Enter full name" },
    { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91 98765 43210" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "user@email.com" },
    { name: "city", label: "City", type: "select", options: cityOptions },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (u) => ({ name: u.name, phone: u.phone, email: u.email, city: u.city, status: u.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("USR", all),
    name: str(v, "name"),
    phone: str(v, "phone"),
    email: str(v, "email"),
    city: str(v, "city", cities[0]),
    orders: existing?.orders ?? 0,
    joined: existing?.joined ?? "Jun 2026",
    status: str(v, "status", "Active") as User["status"],
  }),
};

export const driverForm: EntityFormConfig<Driver> = {
  entityName: "Driver",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "city", label: "City", type: "select", options: cityOptions },
    { name: "vehicle", label: "Vehicle", type: "text", placeholder: "Tata Ace" },
    { name: "rating", label: "Rating", type: "number", placeholder: "4.5" },
    { name: "kyc", label: "KYC Status", type: "select", options: [
      { label: "Verified", value: "Verified" }, { label: "Pending", value: "Pending" }, { label: "Rejected", value: "Rejected" },
    ]},
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (d) => ({ name: d.name, phone: d.phone, city: d.city, vehicle: d.vehicle, rating: String(d.rating), kyc: d.kyc, status: d.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("DRV", all),
    name: str(v, "name"),
    phone: str(v, "phone"),
    city: str(v, "city", cities[0]),
    vehicle: str(v, "vehicle"),
    rating: num(v, "rating", 4.5),
    trips: existing?.trips ?? 0,
    kyc: str(v, "kyc", "Pending") as Driver["kyc"],
    status: str(v, "status", "Active") as Driver["status"],
  }),
};

export const fleetOwnerForm: EntityFormConfig<FleetOwner> = {
  entityName: "Fleet Owner",
  fields: [
    { name: "name", label: "Owner Name", type: "text", required: true },
    { name: "company", label: "Company", type: "text", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "city", label: "City", type: "select", options: cityOptions },
    { name: "drivers", label: "Drivers", type: "number" },
    { name: "vehicles", label: "Vehicles", type: "number" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (f) => ({ name: f.name, company: f.company, phone: f.phone, city: f.city, drivers: String(f.drivers), vehicles: String(f.vehicles), status: f.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("FLT", all),
    name: str(v, "name"),
    company: str(v, "company"),
    phone: str(v, "phone"),
    city: str(v, "city", cities[0]),
    drivers: num(v, "drivers"),
    vehicles: num(v, "vehicles"),
    status: str(v, "status", "Active") as FleetOwner["status"],
  }),
};

export const vehicleForm: EntityFormConfig<Vehicle> = {
  entityName: "Vehicle",
  fields: [
    { name: "number", label: "Registration No.", type: "text", required: true, placeholder: "MH-01-AB-1234" },
    { name: "type", label: "Type", type: "text", required: true },
    { name: "category", label: "Category", type: "select", options: [
      { label: "Light Commercial", value: "Light Commercial" },
      { label: "Medium Commercial", value: "Medium Commercial" },
      { label: "Heavy Commercial", value: "Heavy Commercial" },
    ]},
    { name: "driver", label: "Assigned Driver", type: "text" },
    { name: "city", label: "City", type: "select", options: cityOptions },
    { name: "capacity", label: "Capacity", type: "text", placeholder: "750 kg" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (v) => ({ number: v.number, type: v.type, category: v.category, driver: v.driver, city: v.city, capacity: v.capacity, status: v.status }),
  toRow: (vals, existing, all = []) => ({
    id: existing?.id ?? nextNumId("VEH", all),
    number: str(vals, "number"),
    type: str(vals, "type"),
    category: str(vals, "category"),
    driver: str(vals, "driver"),
    city: str(vals, "city", cities[0]),
    capacity: str(vals, "capacity"),
    status: str(vals, "status", "Active") as Vehicle["status"],
  }),
};

export const vehicleCategoryForm: EntityFormConfig<VehicleCategory> = {
  entityName: "Vehicle Category",
  fields: [
    { name: "name", label: "Category Name", type: "text", required: true },
    { name: "subCategory", label: "Sub-Category", type: "text", required: true },
    { name: "baseFare", label: "Base Fare (₹)", type: "number", required: true },
    { name: "perKm", label: "Per Km (₹)", type: "number", required: true },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (v) => ({ name: v.name, subCategory: v.subCategory, baseFare: String(v.baseFare), perKm: String(v.perKm), status: v.status }),
  toRow: (vals, existing, all = []) => ({
    id: existing?.id ?? nextNumId("VC", all),
    name: str(vals, "name"),
    subCategory: str(vals, "subCategory"),
    baseFare: num(vals, "baseFare"),
    perKm: num(vals, "perKm"),
    vehicles: existing?.vehicles ?? 0,
    status: str(vals, "status", "Active") as VehicleCategory["status"],
  }),
};

export const goodsTypeForm: EntityFormConfig<GoodsType> = {
  entityName: "Goods Type",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "category", label: "Category", type: "select", options: [
      { label: "General", value: "General" }, { label: "Fragile", value: "Fragile" },
      { label: "Bulky", value: "Bulky" }, { label: "Food", value: "Food" }, { label: "Heavy", value: "Heavy" },
    ]},
    { name: "maxWeight", label: "Max Weight", type: "text", placeholder: "25 kg" },
    { name: "fragile", label: "Fragile Item", type: "switch" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (g) => ({ name: g.name, category: g.category, maxWeight: g.maxWeight, fragile: g.fragile, status: g.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("GT", all),
    name: str(v, "name"),
    category: str(v, "category"),
    maxWeight: str(v, "maxWeight"),
    fragile: bool(v, "fragile"),
    orders: existing?.orders ?? 0,
    status: str(v, "status", "Active") as GoodsType["status"],
  }),
};

export const packageForm: EntityFormConfig<PricingPackage> = {
  entityName: "Package",
  fields: [
    { name: "name", label: "Package Name", type: "text", required: true },
    { name: "city", label: "City", type: "select", options: cityOptions },
    { name: "category", label: "Category", type: "text" },
    { name: "price", label: "Price (₹)", type: "number", required: true },
    { name: "duration", label: "Duration", type: "select", options: [
      { label: "Monthly", value: "Monthly" }, { label: "Quarterly", value: "Quarterly" }, { label: "Yearly", value: "Yearly" },
    ]},
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (p) => ({ name: p.name, city: p.city, category: p.category, price: String(p.price), duration: p.duration, status: p.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("PKG", all),
    name: str(v, "name"),
    city: str(v, "city", cities[0]),
    category: str(v, "category"),
    price: num(v, "price"),
    duration: str(v, "duration", "Monthly"),
    subscribers: existing?.subscribers ?? 0,
    status: str(v, "status", "Active") as PricingPackage["status"],
  }),
};

export const couponForm: EntityFormConfig<Coupon> = {
  entityName: "Coupon",
  fields: [
    { name: "code", label: "Coupon Code", type: "text", required: true, placeholder: "GATI50" },
    { name: "discount", label: "Discount", type: "text", required: true, placeholder: "₹50 or 20%" },
    { name: "type", label: "Type", type: "select", options: [{ label: "Flat", value: "Flat" }, { label: "Percent", value: "Percent" }] },
    { name: "minOrder", label: "Min Order (₹)", type: "number" },
    { name: "maxUses", label: "Max Uses", type: "number" },
    { name: "expires", label: "Expiry Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (c) => ({ code: c.code, discount: c.discount, type: c.type, minOrder: String(c.minOrder), maxUses: String(c.maxUses), expires: c.expires, status: c.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("CPN", all),
    code: str(v, "code").toUpperCase(),
    discount: str(v, "discount"),
    type: str(v, "type", "Flat") as Coupon["type"],
    minOrder: num(v, "minOrder"),
    uses: existing?.uses ?? 0,
    maxUses: num(v, "maxUses", 1000),
    expires: str(v, "expires", "31 Dec 2026"),
    status: str(v, "status", "Active") as Coupon["status"],
  }),
};

export const transactionForm: EntityFormConfig<Transaction> = {
  entityName: "Transaction",
  fields: [
    { name: "user", label: "User / Driver", type: "text", required: true },
    { name: "type", label: "Type", type: "select", options: [
      { label: "Credit", value: "Credit" }, { label: "Debit", value: "Debit" }, { label: "Withdrawal", value: "Withdrawal" },
    ]},
    { name: "amount", label: "Amount (₹)", type: "number", required: true },
    { name: "method", label: "Method", type: "select", options: [
      { label: "UPI", value: "UPI" }, { label: "Wallet", value: "Wallet" }, { label: "Bank Transfer", value: "Bank Transfer" }, { label: "Card", value: "Card" },
    ]},
    { name: "ref", label: "Reference", type: "text" },
    { name: "status", label: "Status", type: "select", options: [
      { label: "Completed", value: "Completed" }, { label: "Pending", value: "Pending" }, { label: "Failed", value: "Failed" },
    ]},
  ],
  fromRow: (t) => ({ user: t.user, type: t.type, amount: String(t.amount), method: t.method, ref: t.ref, status: t.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("TXN", all),
    user: str(v, "user"),
    type: str(v, "type", "Credit") as Transaction["type"],
    amount: num(v, "amount"),
    method: str(v, "method", "UPI"),
    ref: str(v, "ref", `REF/${Date.now()}`),
    date: existing?.date ?? "12 Jun 2026",
    status: str(v, "status", "Pending") as Transaction["status"],
  }),
};

export const reviewForm: EntityFormConfig<Review> = {
  entityName: "Review",
  fields: [
    { name: "from", label: "From", type: "text", required: true },
    { name: "to", label: "To", type: "text", required: true },
    { name: "role", label: "Reviewer Type", type: "select", options: [{ label: "User", value: "User" }, { label: "Driver", value: "Driver" }] },
    { name: "rating", label: "Rating (1–5)", type: "number", required: true },
    { name: "comment", label: "Comment", type: "textarea", colSpan: 2 },
    { name: "orderId", label: "Order ID", type: "text" },
  ],
  fromRow: (r) => ({ from: r.from, to: r.to, role: r.role, rating: String(r.rating), comment: r.comment, orderId: r.orderId }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("REV", all),
    from: str(v, "from"),
    to: str(v, "to"),
    role: str(v, "role", "User") as Review["role"],
    rating: Math.min(5, Math.max(1, num(v, "rating", 5))),
    comment: str(v, "comment"),
    orderId: str(v, "orderId"),
    date: existing?.date ?? "12 Jun 2026",
  }),
};

export const cityForm: EntityFormConfig<City> = {
  entityName: "City",
  fields: [
    { name: "name", label: "City Name", type: "text", required: true },
    { name: "state", label: "State", type: "text", required: true },
    { name: "zones", label: "Zones", type: "number" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (c) => ({ name: c.name, state: c.state, zones: String(c.zones), status: c.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("CITY", all),
    name: str(v, "name"),
    state: str(v, "state"),
    drivers: existing?.drivers ?? 0,
    orders: existing?.orders ?? 0,
    zones: num(v, "zones", 1),
    status: str(v, "status", "Active") as City["status"],
  }),
};

export const subAdminForm: EntityFormConfig<SubAdmin> = {
  entityName: "Sub-Admin",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "role", label: "Role", type: "select", options: [
      { label: "Super Admin", value: "Super Admin" }, { label: "Operations", value: "Operations" },
      { label: "Finance", value: "Finance" }, { label: "Support", value: "Support" },
    ]},
    { name: "permissions", label: "Permissions (modules)", type: "number" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (a) => ({ name: a.name, email: a.email, role: a.role, permissions: String(a.permissions), status: a.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("ADM", all),
    name: str(v, "name"),
    email: str(v, "email"),
    role: str(v, "role", "Support"),
    permissions: num(v, "permissions", 8),
    lastLogin: existing?.lastLogin ?? "—",
    status: str(v, "status", "Active") as SubAdmin["status"],
  }),
};

export const faqForm: EntityFormConfig<Faq> = {
  entityName: "FAQ",
  fields: [
    { name: "question", label: "Question", type: "text", required: true, colSpan: 2 },
    { name: "answer", label: "Answer", type: "textarea", required: true, colSpan: 2 },
    { name: "category", label: "Category", type: "select", options: [
      { label: "Orders", value: "Orders" }, { label: "Payments", value: "Payments" }, { label: "Drivers", value: "Drivers" },
    ]},
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (f) => ({ question: f.question, answer: f.answer, category: f.category, status: f.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("FAQ", all),
    question: str(v, "question"),
    answer: str(v, "answer"),
    category: str(v, "category", "Orders"),
    views: existing?.views ?? 0,
    updated: "12 Jun 2026",
    status: str(v, "status", "Active") as Faq["status"],
  }),
};

export const homeBannerForm: EntityFormConfig<HomeBanner> = {
  entityName: "Banner",
  fields: [
    { name: "title", label: "Title", type: "text", required: true, colSpan: 2 },
    { name: "placement", label: "Placement", type: "select", options: [
      { label: "Hero Carousel", value: "Hero Carousel" }, { label: "Mid Banner", value: "Mid Banner" }, { label: "Footer Strip", value: "Footer Strip" },
    ]},
    { name: "city", label: "City", type: "select", options: [{ label: "All Cities", value: "All Cities" }, ...cityOptions] },
    { name: "starts", label: "Start Date", type: "date" },
    { name: "ends", label: "End Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (b) => ({ title: b.title, placement: b.placement, city: b.city, starts: b.starts, ends: b.ends, status: b.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("BNR", all),
    title: str(v, "title"),
    placement: str(v, "placement"),
    city: str(v, "city", "All Cities"),
    clicks: existing?.clicks ?? 0,
    starts: str(v, "starts", "01 Jun 2026"),
    ends: str(v, "ends", "30 Jun 2026"),
    status: str(v, "status", "Active") as HomeBanner["status"],
  }),
};

export const homeSectionForm: EntityFormConfig<HomeSection> = {
  entityName: "Home Section",
  fields: [
    { name: "title", label: "Section Title", type: "text", required: true },
    { name: "type", label: "Type", type: "select", options: [
      { label: "Service Grid", value: "Service Grid" }, { label: "City List", value: "City List" },
      { label: "Review Carousel", value: "Review Carousel" }, { label: "Offer Cards", value: "Offer Cards" },
    ]},
    { name: "order", label: "Display Order", type: "number" },
    { name: "items", label: "Item Count", type: "number" },
    { name: "status", label: "Status", type: "select", options: statusOptions },
  ],
  fromRow: (s) => ({ title: s.title, type: s.type, order: String(s.order), items: String(s.items), status: s.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("SEC", all),
    title: str(v, "title"),
    type: str(v, "type"),
    order: num(v, "order", 1),
    items: num(v, "items", 0),
    updated: "12 Jun 2026",
    status: str(v, "status", "Active") as HomeSection["status"],
  }),
};

export const notificationForm: EntityFormConfig<NotificationRecord> = {
  entityName: "Notification",
  fields: [
    { name: "title", label: "Title", type: "text", required: true, colSpan: 2 },
    { name: "audience", label: "Audience", type: "select", options: [
      { label: "All Users", value: "All Users" }, { label: "All Drivers", value: "All Drivers" }, { label: "Mumbai Users", value: "Mumbai Users" },
    ]},
    { name: "channel", label: "Channel", type: "select", options: [
      { label: "Push", value: "Push" }, { label: "SMS", value: "SMS" }, { label: "Email", value: "Email" },
    ]},
    { name: "date", label: "Schedule Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [
      { label: "Draft", value: "Draft" }, { label: "Scheduled", value: "Scheduled" }, { label: "Sent", value: "Sent" },
    ]},
  ],
  fromRow: (n) => ({ title: n.title, audience: n.audience, channel: n.channel, date: n.date === "—" ? "" : n.date, status: n.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("NTF", all),
    title: str(v, "title"),
    audience: str(v, "audience", "All Users"),
    sent: existing?.sent ?? 0,
    opened: existing?.opened ?? 0,
    channel: str(v, "channel", "Push") as NotificationRecord["channel"],
    date: str(v, "date", "—") || "—",
    status: str(v, "status", "Draft") as NotificationRecord["status"],
  }),
};

export const orderForm: EntityFormConfig<Order> = {
  entityName: "Order",
  fields: [
    { name: "type", label: "Order Type", type: "select", options: [
      { label: "Express", value: "Express" }, { label: "Standard", value: "Standard" }, { label: "Scheduled", value: "Scheduled" },
    ]},
    { name: "user", label: "Customer Name", type: "text", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "driver", label: "Driver", type: "text", placeholder: "Leave empty if unassigned" },
    { name: "city", label: "City", type: "select", options: cityOptions },
    { name: "amount", label: "Amount (₹)", type: "number", required: true },
    { name: "status", label: "Status", type: "select", options: [
      { label: "Pending", value: "Pending" }, { label: "In Progress", value: "In Progress" },
      { label: "Picked Up", value: "Picked Up" }, { label: "Completed", value: "Completed" }, { label: "Cancelled", value: "Cancelled" },
    ]},
    { name: "pickup", label: "Pickup Location", type: "text", colSpan: 2 },
    { name: "drop", label: "Drop Location", type: "text", colSpan: 2 },
  ],
  fromRow: (o) => ({
    type: o.type, user: o.user, phone: o.phone, driver: o.driver ?? "", city: o.city,
    amount: String(o.amount), status: o.status, pickup: o.pickup, drop: o.drop,
  }),
  toRow: (v, existing, all = []) => {
    const id = existing?.id ?? `GATI-2026-${String(Math.max(100, ...all.map((o) => parseInt(o.id.split("-").pop() ?? "0", 10))) + 1)}`;
    return {
      id,
      type: str(v, "type", "Standard") as Order["type"],
      user: str(v, "user"),
      driver: str(v, "driver") || null,
      city: str(v, "city", cities[0]),
      amount: num(v, "amount"),
      status: str(v, "status", "Pending") as Order["status"],
      date: existing?.date ?? "12 Jun 2026",
      time: existing?.time ?? "12:00 PM",
      phone: str(v, "phone"),
      pickup: str(v, "pickup"),
      drop: str(v, "drop"),
      goods: existing?.goods ?? [{ name: "General Goods", weight: "10 kg", price: num(v, "amount") }],
    };
  },
};

export function emptyFormValues(fields: FormFieldConfig[]): FormValues {
  return Object.fromEntries(
    fields.map((f) => [f.name, f.type === "switch" ? false : ""]),
  );
}

export const companyTabFields: Record<string, FormFieldConfig[]> = {
  Branding: [
    { name: "companyName", label: "Company Name", type: "text", required: true },
    { name: "tagline", label: "Tagline", type: "text", colSpan: 2 },
    { name: "supportEmail", label: "Support Email", type: "email" },
    { name: "supportPhone", label: "Support Phone", type: "tel" },
  ],
  Operations: [
    { name: "defaultCity", label: "Default City", type: "select", options: cityOptions },
    { name: "maxRadius", label: "Max Delivery Radius (km)", type: "number" },
    { name: "driverCommission", label: "Driver Commission (%)", type: "number" },
    { name: "platformFee", label: "Platform Fee (%)", type: "number" },
    { name: "autoAssign", label: "Auto-assign drivers", type: "switch" },
    { name: "scheduledOrders", label: "Allow scheduled orders", type: "switch" },
  ],
  Legal: [
    { name: "termsUrl", label: "Terms of Service URL", type: "text", colSpan: 2 },
    { name: "privacyUrl", label: "Privacy Policy URL", type: "text", colSpan: 2 },
    { name: "gst", label: "GST Number", type: "text" },
    { name: "cin", label: "CIN", type: "text" },
  ],
  Pricing: [
    { name: "minOrder", label: "Minimum Order Value (₹)", type: "number" },
    { name: "cancelFee", label: "Cancellation Fee (₹)", type: "number" },
    { name: "surgeCap", label: "Surge Multiplier Cap", type: "number" },
    { name: "freeCancelWindow", label: "Free Cancellation Window (min)", type: "number" },
  ],
};

export const companyTabDefaults: Record<string, FormValues> = {
  Branding: { companyName: "GATI Logistics Pvt Ltd", tagline: "Delivering India, One Trip at a Time", supportEmail: "support@gati.com", supportPhone: "+91 1800-123-4567" },
  Operations: { defaultCity: "Mumbai", maxRadius: "50", driverCommission: "15", platformFee: "5", autoAssign: true, scheduledOrders: true },
  Legal: { termsUrl: "https://gati.com/terms", privacyUrl: "https://gati.com/privacy", gst: "27AABCG1234A1Z5", cin: "U63030MH2020PTC123456" },
  Pricing: { minOrder: "99", cancelFee: "50", surgeCap: "2.5", freeCancelWindow: "5" },
};

export const chatTicketForm: EntityFormConfig<ChatTicket> = {
  entityName: "Support Ticket",
  fields: [
    { name: "user", label: "Customer Name", type: "text", required: true },
    { name: "subject", label: "Subject", type: "text", required: true, colSpan: 2 },
    { name: "priority", label: "Priority", type: "select", options: [
      { label: "Low", value: "Low" }, { label: "Medium", value: "Medium" }, { label: "High", value: "High" },
    ]},
    { name: "agent", label: "Assign Agent", type: "text", placeholder: "Optional" },
    { name: "status", label: "Status", type: "select", options: [
      { label: "Open", value: "Open" }, { label: "Waiting", value: "Waiting" }, { label: "Resolved", value: "Resolved" },
    ]},
  ],
  fromRow: (t) => ({ user: t.user, subject: t.subject, priority: t.priority, agent: t.agent ?? "", status: t.status }),
  toRow: (v, existing, all = []) => ({
    id: existing?.id ?? nextNumId("TKT", all),
    user: str(v, "user"),
    subject: str(v, "subject"),
    priority: str(v, "priority", "Medium") as ChatTicket["priority"],
    agent: str(v, "agent") || null,
    messages: existing?.messages ?? 0,
    updated: "12 Jun 2026",
    status: str(v, "status", "Open") as ChatTicket["status"],
  }),
};
