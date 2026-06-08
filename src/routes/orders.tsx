import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/components/admin/OrdersPage";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Orders · GATI Admin" },
      { name: "description", content: "Manage all GATI delivery orders." },
    ],
  }),
  component: OrdersPage,
});
