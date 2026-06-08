export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

export const formatINRShort = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

export const kpis = [
  { label: "Today's Deliveries", value: 2458, delta: 12.4, up: true, icon: "package", tint: "primary" },
  { label: "Active Drivers", value: 1284, delta: 8.7, up: true, icon: "users", tint: "teal" },
  { label: "Today's Revenue", value: 678540, delta: 18.7, up: true, icon: "rupee", tint: "success", isCurrency: true },
  { label: "Total Orders", value: 3285, delta: 4.2, up: true, icon: "receipt", tint: "warning" },
  { label: "Platform Commission", value: 123450, delta: 3.1, up: false, icon: "trending", tint: "info", isCurrency: true },
] as const;

export const todaySummary = [
  { icon: "car", label: "Online Drivers", value: "1,284" },
  { icon: "bike", label: "On-Trip Drivers", value: "847" },
  { icon: "userPlus", label: "New User Signups", value: "312" },
  { icon: "package", label: "Pending Orders", value: "94" },
  { icon: "clock", label: "Pending Withdrawals", value: "18" },
  { icon: "mapPin", label: "Cities Active", value: "12" },
  { icon: "star", label: "Avg Driver Rating", value: "4.6" },
];

export const systemHealth = [
  { name: "API Server", status: "Operational", uptime: "100%" },
  { name: "Payment Gateway", status: "Operational", uptime: "99.98%" },
  { name: "Socket Server", status: "Operational", uptime: "99.92%" },
  { name: "Notification Service", status: "Operational", uptime: "99.85%" },
  { name: "Export Service", status: "Operational", uptime: "99.71%" },
];

export const deliveryTrend = [
  { date: "06 Jun", value: 1820 },
  { date: "07 Jun", value: 2080 },
  { date: "08 Jun", value: 1960 },
  { date: "09 Jun", value: 2240 },
  { date: "10 Jun", value: 2120 },
  { date: "11 Jun", value: 2380 },
  { date: "12 Jun", value: 2458 },
];

export const revenueByCategory = [
  { name: "Orders", value: 3245600, color: "var(--color-primary)" },
  { name: "Commission", value: 1245300, color: "var(--color-teal)" },
  { name: "Subscription", value: 678200, color: "var(--color-warning)" },
  { name: "Other", value: 320150, color: "var(--color-info)" },
];

export const growthData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  users: 1200 + i * 380 + Math.round(Math.random() * 200),
  drivers: 600 + i * 180 + Math.round(Math.random() * 100),
}));

export const topCities = [
  { rank: 1, name: "Mumbai", count: 1245, color: "var(--color-primary)" },
  { rank: 2, name: "Bengaluru", count: 1023, color: "var(--color-info)" },
  { rank: 3, name: "Delhi NCR", count: 876, color: "var(--color-teal)" },
  { rank: 4, name: "Hyderabad", count: 654, color: "var(--color-warning)" },
  { rank: 5, name: "Pune", count: 532, color: "var(--color-success)" },
  { rank: 6, name: "Chennai", count: 432, color: "var(--color-destructive)" },
];

export type OrderStatus = "In Progress" | "Pending" | "Completed" | "Cancelled" | "Picked Up";
export type OrderType = "Express" | "Standard" | "Scheduled";

export interface Order {
  id: string;
  type: OrderType;
  user: string;
  driver: string | null;
  city: string;
  amount: number;
  status: OrderStatus;
  date: string;
  time: string;
  goods: { name: string; weight: string; price: number }[];
  pickup: string;
  drop: string;
  phone: string;
}

export const orders: Order[] = [
  { id: "GATI-2026-156", type: "Express", user: "Aarav Mehta", driver: "Rohit Sharma", city: "Mumbai", amount: 1250, status: "In Progress", date: "12 Jun 2026", time: "11:30 AM", phone: "+91 98765 43210", pickup: "Andheri West", drop: "Bandra East", goods: [{ name: "Documents Bundle", weight: "2 kg", price: 320 },{ name: "Electronics Box", weight: "8 kg", price: 580 },{ name: "Fragile Glass Items", weight: "5 kg", price: 250 },{ name: "Packaging Material", weight: "3 kg", price: 100 }] },
  { id: "GATI-2026-155", type: "Standard", user: "Priya Nair", driver: "Sandeep Kumar", city: "Bengaluru", amount: 680, status: "Picked Up", date: "12 Jun 2026", time: "11:25 AM", phone: "+91 97654 32109", pickup: "Indiranagar", drop: "Koramangala", goods: [{ name: "Furniture Box", weight: "25 kg", price: 680 }] },
  { id: "GATI-2026-154", type: "Express", user: "Rohan Kapoor", driver: "Arjun Singh", city: "Delhi NCR", amount: 1890, status: "In Progress", date: "12 Jun 2026", time: "11:20 AM", phone: "+91 98123 45678", pickup: "Connaught Place", drop: "Gurgaon Sec 29", goods: [{ name: "Office Equipment", weight: "40 kg", price: 1890 }] },
  { id: "GATI-2026-153", type: "Scheduled", user: "Sneha Iyer", driver: "Manoj Patel", city: "Pune", amount: 2450, status: "In Progress", date: "12 Jun 2026", time: "11:15 AM", phone: "+91 99887 76655", pickup: "Hinjewadi", drop: "Viman Nagar", goods: [{ name: "Heavy Cargo", weight: "120 kg", price: 2450 }] },
  { id: "GATI-2026-152", type: "Standard", user: "Vikram Singh", driver: "Kunal Verma", city: "Hyderabad", amount: 1750, status: "Pending", date: "12 Jun 2026", time: "11:10 AM", phone: "+91 90909 80808", pickup: "Hitech City", drop: "Banjara Hills", goods: [{ name: "Mixed Goods", weight: "55 kg", price: 1750 }] },
  { id: "GATI-2026-151", type: "Express", user: "Ananya Das", driver: "Vishal Jain", city: "Mumbai", amount: 1030, status: "Completed", date: "12 Jun 2026", time: "11:05 AM", phone: "+91 98765 12345", pickup: "Powai", drop: "Vikhroli", goods: [{ name: "Documents", weight: "1 kg", price: 1030 }] },
  { id: "GATI-2026-150", type: "Standard", user: "Arjun Verma", driver: "Rakesh Yadav", city: "Chennai", amount: 540, status: "Completed", date: "12 Jun 2026", time: "10:58 AM", phone: "+91 97000 11122", pickup: "T Nagar", drop: "Anna Nagar", goods: [{ name: "Small Parcel", weight: "5 kg", price: 540 }] },
  { id: "GATI-2026-149", type: "Express", user: "Neha Joshi", driver: null, city: "Bengaluru", amount: 2150, status: "Cancelled", date: "12 Jun 2026", time: "10:45 AM", phone: "+91 91234 56789", pickup: "Whitefield", drop: "MG Road", goods: [{ name: "Returned Order", weight: "0 kg", price: 0 }] },
  { id: "GATI-2026-148", type: "Standard", user: "Karan Patel", driver: "Sumit Rao", city: "Pune", amount: 1480, status: "In Progress", date: "12 Jun 2026", time: "10:40 AM", phone: "+91 90123 45678", pickup: "Kothrud", drop: "Shivajinagar", goods: [{ name: "Retail Stock", weight: "70 kg", price: 1480 }] },
  { id: "GATI-2026-147", type: "Scheduled", user: "Saurabh Roy", driver: "Imran Shaikh", city: "Mumbai", amount: 950, status: "Pending", date: "12 Jun 2026", time: "10:35 AM", phone: "+91 99887 12345", pickup: "Dadar", drop: "Lower Parel", goods: [{ name: "Documents Pouch", weight: "1 kg", price: 950 }] },
];

export const orderStats = [
  { key: "all", label: "All Orders", value: 156, icon: "package", tint: "primary" },
  { key: "pending", label: "Pending", value: 22, icon: "clock", tint: "warning" },
  { key: "progress", label: "In Progress", value: 68, icon: "truck", tint: "info" },
  { key: "completed", label: "Completed", value: 54, icon: "check", tint: "success" },
  { key: "cancelled", label: "Cancelled", value: 12, icon: "close", tint: "destructive" },
  { key: "revenue", label: "Revenue (₹)", value: 245680, icon: "rupee", tint: "teal", isCurrency: true },
];

export const recentBookings = orders.slice(0, 5).map((o) => ({
  id: o.id,
  user: o.user,
  date: o.date,
  driver: o.driver ?? "—",
  amount: o.amount,
  status: o.status,
}));
