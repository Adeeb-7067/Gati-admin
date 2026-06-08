/** Mock data for admin list pages */

export type EntityStatus = "Active" | "Inactive" | "Pending" | "Suspended" | "Verified";

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  orders: number;
  joined: string;
  status: EntityStatus;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  city: string;
  vehicle: string;
  rating: number;
  trips: number;
  kyc: "Verified" | "Pending" | "Rejected";
  status: EntityStatus;
}

export interface FleetOwner {
  id: string;
  name: string;
  company: string;
  phone: string;
  drivers: number;
  vehicles: number;
  city: string;
  status: EntityStatus;
}

export interface Vehicle {
  id: string;
  number: string;
  type: string;
  category: string;
  driver: string;
  city: string;
  capacity: string;
  status: EntityStatus;
}

export interface VehicleCategory {
  id: string;
  name: string;
  subCategory: string;
  baseFare: number;
  perKm: number;
  vehicles: number;
  status: EntityStatus;
}

export interface GoodsType {
  id: string;
  name: string;
  category: string;
  maxWeight: string;
  fragile: boolean;
  orders: number;
  status: EntityStatus;
}

export interface PricingPackage {
  id: string;
  name: string;
  city: string;
  category: string;
  price: number;
  duration: string;
  subscribers: number;
  status: EntityStatus;
}

export interface Coupon {
  id: string;
  code: string;
  discount: string;
  type: "Flat" | "Percent";
  minOrder: number;
  uses: number;
  maxUses: number;
  expires: string;
  status: EntityStatus;
}

export interface Transaction {
  id: string;
  user: string;
  type: "Credit" | "Debit" | "Withdrawal";
  amount: number;
  method: string;
  ref: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface Review {
  id: string;
  from: string;
  to: string;
  role: "User" | "Driver";
  rating: number;
  comment: string;
  orderId: string;
  date: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  drivers: number;
  orders: number;
  zones: number;
  status: EntityStatus;
}

export interface SubAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: number;
  lastLogin: string;
  status: EntityStatus;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  views: number;
  updated: string;
  status: EntityStatus;
}

export interface HomeBanner {
  id: string;
  title: string;
  placement: string;
  city: string;
  clicks: number;
  starts: string;
  ends: string;
  status: EntityStatus;
}

export interface HomeSection {
  id: string;
  title: string;
  type: string;
  order: number;
  items: number;
  updated: string;
  status: EntityStatus;
}

export interface NotificationRecord {
  id: string;
  title: string;
  audience: string;
  sent: number;
  opened: number;
  channel: "Push" | "SMS" | "Email";
  date: string;
  status: "Sent" | "Scheduled" | "Draft";
}

export interface ChatTicket {
  id: string;
  user: string;
  subject: string;
  priority: "Low" | "Medium" | "High";
  agent: string | null;
  messages: number;
  updated: string;
  status: "Open" | "Resolved" | "Waiting";
}

export const users: User[] = [
  { id: "USR-1001", name: "Aarav Mehta", phone: "+91 98765 43210", email: "aarav@email.com", city: "Mumbai", orders: 48, joined: "Jan 2025", status: "Active" },
  { id: "USR-1002", name: "Priya Nair", phone: "+91 97654 32109", email: "priya@email.com", city: "Bengaluru", orders: 32, joined: "Mar 2025", status: "Active" },
  { id: "USR-1003", name: "Rohan Kapoor", phone: "+91 98123 45678", email: "rohan@email.com", city: "Delhi NCR", orders: 21, joined: "Apr 2025", status: "Active" },
  { id: "USR-1004", name: "Sneha Iyer", phone: "+91 99887 76655", email: "sneha@email.com", city: "Pune", orders: 15, joined: "May 2025", status: "Inactive" },
  { id: "USR-1005", name: "Vikram Singh", phone: "+91 90909 80808", email: "vikram@email.com", city: "Hyderabad", orders: 9, joined: "Jun 2025", status: "Suspended" },
  { id: "USR-1006", name: "Ananya Das", phone: "+91 98765 12345", email: "ananya@email.com", city: "Chennai", orders: 56, joined: "Feb 2025", status: "Active" },
];

export const drivers: Driver[] = [
  { id: "DRV-501", name: "Rohit Sharma", phone: "+91 91234 56789", city: "Mumbai", vehicle: "Tata Ace", rating: 4.8, trips: 1240, kyc: "Verified", status: "Active" },
  { id: "DRV-502", name: "Sandeep Kumar", phone: "+91 92345 67890", city: "Bengaluru", vehicle: "Piaggio Ape", rating: 4.6, trips: 890, kyc: "Verified", status: "Active" },
  { id: "DRV-503", name: "Arjun Singh", phone: "+91 93456 78901", city: "Delhi NCR", vehicle: "Mahindra Bolero", rating: 4.9, trips: 2100, kyc: "Verified", status: "Active" },
  { id: "DRV-504", name: "Manoj Patel", phone: "+91 94567 89012", city: "Pune", vehicle: "Eicher Pro", rating: 4.3, trips: 456, kyc: "Pending", status: "Pending" },
  { id: "DRV-505", name: "Kunal Verma", phone: "+91 95678 90123", city: "Hyderabad", vehicle: "Tata 407", rating: 4.7, trips: 678, kyc: "Verified", status: "Active" },
  { id: "DRV-506", name: "Imran Shaikh", phone: "+91 96789 01234", city: "Mumbai", vehicle: "Ashok Leyland", rating: 3.9, trips: 120, kyc: "Rejected", status: "Suspended" },
];

export const fleetOwners: FleetOwner[] = [
  { id: "FLT-01", name: "Rajesh Transport", company: "Rajesh Logistics Pvt Ltd", phone: "+91 98111 22222", drivers: 42, vehicles: 38, city: "Mumbai", status: "Active" },
  { id: "FLT-02", name: "South Fleet Co.", company: "South Fleet Services", phone: "+91 98222 33333", drivers: 28, vehicles: 25, city: "Bengaluru", status: "Active" },
  { id: "FLT-03", name: "NCR Carriers", company: "NCR Express Fleet", phone: "+91 98333 44444", drivers: 15, vehicles: 12, city: "Delhi NCR", status: "Active" },
  { id: "FLT-04", name: "Pune Movers", company: "Pune City Fleet", phone: "+91 98444 55555", drivers: 8, vehicles: 8, city: "Pune", status: "Pending" },
];

export const vehicles: Vehicle[] = [
  { id: "VEH-801", number: "MH-01-AB-1234", type: "Mini Truck", category: "Light Commercial", driver: "Rohit Sharma", city: "Mumbai", capacity: "750 kg", status: "Active" },
  { id: "VEH-802", number: "KA-03-CD-5678", type: "Pickup", category: "Light Commercial", driver: "Sandeep Kumar", city: "Bengaluru", capacity: "500 kg", status: "Active" },
  { id: "VEH-803", number: "DL-01-EF-9012", type: "Truck", category: "Heavy Commercial", driver: "Arjun Singh", city: "Delhi NCR", capacity: "3 Ton", status: "Active" },
  { id: "VEH-804", number: "MH-12-GH-3456", type: "Tempo", category: "Light Commercial", driver: "Manoj Patel", city: "Pune", capacity: "1 Ton", status: "Inactive" },
  { id: "VEH-805", number: "TS-09-IJ-7890", type: "Mini Truck", category: "Light Commercial", driver: "Kunal Verma", city: "Hyderabad", capacity: "750 kg", status: "Active" },
];

export const vehicleCategories: VehicleCategory[] = [
  { id: "VC-1", name: "Mini Truck", subCategory: "Light Commercial", baseFare: 150, perKm: 12, vehicles: 842, status: "Active" },
  { id: "VC-2", name: "Pickup", subCategory: "Light Commercial", baseFare: 120, perKm: 10, vehicles: 624, status: "Active" },
  { id: "VC-3", name: "Tempo", subCategory: "Medium Commercial", baseFare: 200, perKm: 15, vehicles: 412, status: "Active" },
  { id: "VC-4", name: "Truck", subCategory: "Heavy Commercial", baseFare: 350, perKm: 22, vehicles: 186, status: "Active" },
  { id: "VC-5", name: "Two Wheeler", subCategory: "Express", baseFare: 40, perKm: 6, vehicles: 1438, status: "Active" },
];

export const goodsTypes: GoodsType[] = [
  { id: "GT-1", name: "Documents", category: "General", maxWeight: "5 kg", fragile: false, orders: 8420, status: "Active" },
  { id: "GT-2", name: "Electronics", category: "Fragile", maxWeight: "25 kg", fragile: true, orders: 3210, status: "Active" },
  { id: "GT-3", name: "Furniture", category: "Bulky", maxWeight: "500 kg", fragile: false, orders: 1890, status: "Active" },
  { id: "GT-4", name: "Perishables", category: "Food", maxWeight: "50 kg", fragile: true, orders: 2456, status: "Active" },
  { id: "GT-5", name: "Industrial Parts", category: "Heavy", maxWeight: "2 Ton", fragile: false, orders: 980, status: "Inactive" },
];

export const pricingPackages: PricingPackage[] = [
  { id: "PKG-1", name: "Express Mumbai", city: "Mumbai", category: "Mini Truck", price: 4999, duration: "Monthly", subscribers: 124, status: "Active" },
  { id: "PKG-2", name: "Business Bengaluru", city: "Bengaluru", category: "Pickup", price: 3499, duration: "Monthly", subscribers: 89, status: "Active" },
  { id: "PKG-3", name: "Fleet Delhi NCR", city: "Delhi NCR", category: "Truck", price: 12999, duration: "Monthly", subscribers: 34, status: "Active" },
  { id: "PKG-4", name: "Starter Pune", city: "Pune", category: "Two Wheeler", price: 999, duration: "Monthly", subscribers: 210, status: "Active" },
];

export const coupons: Coupon[] = [
  { id: "CPN-1", code: "GATI50", discount: "₹50", type: "Flat", minOrder: 200, uses: 842, maxUses: 5000, expires: "30 Jun 2026", status: "Active" },
  { id: "CPN-2", code: "FIRST20", discount: "20%", type: "Percent", minOrder: 100, uses: 1240, maxUses: 10000, expires: "31 Dec 2026", status: "Active" },
  { id: "CPN-3", code: "MUMBAI100", discount: "₹100", type: "Flat", minOrder: 500, uses: 320, maxUses: 1000, expires: "15 Jul 2026", status: "Active" },
  { id: "CPN-4", code: "OLDFLAT30", discount: "₹30", type: "Flat", minOrder: 150, uses: 5000, maxUses: 5000, expires: "01 May 2026", status: "Inactive" },
];

export const transactions: Transaction[] = [
  { id: "TXN-9001", user: "Aarav Mehta", type: "Credit", amount: 1250, method: "UPI", ref: "UPI/123456", date: "12 Jun 2026", status: "Completed" },
  { id: "TXN-9002", user: "Rohit Sharma", type: "Withdrawal", amount: 8500, method: "Bank Transfer", ref: "NEFT/789012", date: "12 Jun 2026", status: "Pending" },
  { id: "TXN-9003", user: "Priya Nair", type: "Debit", amount: 680, method: "Wallet", ref: "WLT/345678", date: "11 Jun 2026", status: "Completed" },
  { id: "TXN-9004", user: "Sandeep Kumar", type: "Withdrawal", amount: 12000, method: "Bank Transfer", ref: "NEFT/901234", date: "11 Jun 2026", status: "Pending" },
  { id: "TXN-9005", user: "Vikram Singh", type: "Credit", amount: 1750, method: "Card", ref: "CARD/567890", date: "10 Jun 2026", status: "Failed" },
];

export const reviews: Review[] = [
  { id: "REV-1", from: "Aarav Mehta", to: "Rohit Sharma", role: "User", rating: 5, comment: "Fast and careful delivery!", orderId: "GATI-2026-151", date: "12 Jun 2026" },
  { id: "REV-2", from: "Priya Nair", to: "Sandeep Kumar", role: "User", rating: 4, comment: "Good service, slight delay.", orderId: "GATI-2026-155", date: "12 Jun 2026" },
  { id: "REV-3", from: "Rohit Sharma", to: "Aarav Mehta", role: "Driver", rating: 5, comment: "Clear pickup instructions.", orderId: "GATI-2026-156", date: "11 Jun 2026" },
  { id: "REV-4", from: "Neha Joshi", to: "Vishal Jain", role: "User", rating: 2, comment: "Driver was late.", orderId: "GATI-2026-149", date: "10 Jun 2026" },
];

export const cities: City[] = [
  { id: "CITY-1", name: "Mumbai", state: "Maharashtra", drivers: 842, orders: 28450, zones: 12, status: "Active" },
  { id: "CITY-2", name: "Bengaluru", state: "Karnataka", drivers: 624, orders: 22100, zones: 10, status: "Active" },
  { id: "CITY-3", name: "Delhi NCR", state: "Delhi", drivers: 512, orders: 19800, zones: 14, status: "Active" },
  { id: "CITY-4", name: "Pune", state: "Maharashtra", drivers: 286, orders: 12400, zones: 8, status: "Active" },
  { id: "CITY-5", name: "Hyderabad", state: "Telangana", drivers: 198, orders: 9800, zones: 6, status: "Active" },
  { id: "CITY-6", name: "Chennai", state: "Tamil Nadu", drivers: 142, orders: 7200, zones: 5, status: "Pending" },
];

export const subAdmins: SubAdmin[] = [
  { id: "ADM-1", name: "Rohit Mehta", email: "rohit@gati.com", role: "Super Admin", permissions: 48, lastLogin: "12 Jun 2026", status: "Active" },
  { id: "ADM-2", name: "Kavita Rao", email: "kavita@gati.com", role: "Operations", permissions: 24, lastLogin: "12 Jun 2026", status: "Active" },
  { id: "ADM-3", name: "Amit Shah", email: "amit@gati.com", role: "Finance", permissions: 12, lastLogin: "11 Jun 2026", status: "Active" },
  { id: "ADM-4", name: "Deepa Nair", email: "deepa@gati.com", role: "Support", permissions: 8, lastLogin: "10 Jun 2026", status: "Inactive" },
];

export const faqs: Faq[] = [
  { id: "FAQ-1", question: "How do I track my delivery?", answer: "Open the app, go to My Orders, and tap your active booking to see live tracking.", category: "Orders", views: 8420, updated: "01 Jun 2026", status: "Active" },
  { id: "FAQ-2", question: "What payment methods are accepted?", answer: "We accept UPI, cards, wallets, and cash on delivery in supported cities.", category: "Payments", views: 6240, updated: "28 May 2026", status: "Active" },
  { id: "FAQ-3", question: "How to become a GATI driver?", answer: "Download the driver app, complete KYC, and upload your vehicle documents.", category: "Drivers", views: 4120, updated: "15 May 2026", status: "Active" },
  { id: "FAQ-4", question: "Cancellation and refund policy", answer: "Free cancellation within 5 minutes. After that a ₹50 fee may apply.", category: "Orders", views: 3890, updated: "10 May 2026", status: "Active" },
];

export const homeBanners: HomeBanner[] = [
  { id: "BNR-1", title: "Summer Sale — 20% Off", placement: "Hero Carousel", city: "All Cities", clicks: 12400, starts: "01 Jun 2026", ends: "30 Jun 2026", status: "Active" },
  { id: "BNR-2", title: "Mumbai Express Delivery", placement: "Hero Carousel", city: "Mumbai", clicks: 8200, starts: "01 Jun 2026", ends: "31 Jul 2026", status: "Active" },
  { id: "BNR-3", title: "Refer & Earn ₹100", placement: "Mid Banner", city: "All Cities", clicks: 5600, starts: "15 May 2026", ends: "15 Aug 2026", status: "Active" },
  { id: "BNR-4", title: "Fleet Owner Program", placement: "Footer Strip", city: "All Cities", clicks: 2100, starts: "01 Apr 2026", ends: "01 Apr 2026", status: "Inactive" },
];

export const homeSections: HomeSection[] = [
  { id: "SEC-1", title: "Popular Services", type: "Service Grid", order: 1, items: 6, updated: "10 Jun 2026", status: "Active" },
  { id: "SEC-2", title: "Top Cities", type: "City List", order: 2, items: 12, updated: "08 Jun 2026", status: "Active" },
  { id: "SEC-3", title: "Customer Reviews", type: "Review Carousel", order: 3, items: 8, updated: "05 Jun 2026", status: "Active" },
  { id: "SEC-4", title: "Partner Offers", type: "Offer Cards", order: 4, items: 4, updated: "01 Jun 2026", status: "Inactive" },
];

export const notifications: NotificationRecord[] = [
  { id: "NTF-1", title: "Flash Sale — 20% Off Today", audience: "All Users", sent: 48210, opened: 18420, channel: "Push", date: "12 Jun 2026", status: "Sent" },
  { id: "NTF-2", title: "Driver incentive program", audience: "All Drivers", sent: 3842, opened: 2100, channel: "Push", date: "11 Jun 2026", status: "Sent" },
  { id: "NTF-3", title: "Scheduled maintenance notice", audience: "Mumbai Users", sent: 0, opened: 0, channel: "SMS", date: "14 Jun 2026", status: "Scheduled" },
  { id: "NTF-4", title: "New feature: Live tracking", audience: "All Users", sent: 0, opened: 0, channel: "Email", date: "—", status: "Draft" },
];

export const chatTickets: ChatTicket[] = [
  { id: "TKT-101", user: "Aarav Mehta", subject: "Order not updating status", priority: "High", agent: "Deepa Nair", messages: 8, updated: "12 Jun 2026", status: "Open" },
  { id: "TKT-102", user: "Priya Nair", subject: "Refund for cancelled order", priority: "Medium", agent: "Deepa Nair", messages: 5, updated: "12 Jun 2026", status: "Waiting" },
  { id: "TKT-103", user: "Rohan Kapoor", subject: "Driver contact issue", priority: "Low", agent: null, messages: 2, updated: "11 Jun 2026", status: "Open" },
  { id: "TKT-104", user: "Sneha Iyer", subject: "Wallet balance incorrect", priority: "High", agent: "Kavita Rao", messages: 12, updated: "10 Jun 2026", status: "Resolved" },
];

export const chatMessages = [
  { id: 1, from: "user", text: "Hi, my order GATI-2026-156 shows in progress but the driver hasn't moved.", time: "11:42 AM" },
  { id: 2, from: "agent", text: "Hello Aarav! Let me check that for you. One moment please.", time: "11:43 AM" },
  { id: 3, from: "agent", text: "I can see the driver is en route. ETA is about 15 minutes. Is there anything else I can help with?", time: "11:45 AM" },
  { id: 4, from: "user", text: "Thanks! Can you share the driver's contact?", time: "11:46 AM" },
];
