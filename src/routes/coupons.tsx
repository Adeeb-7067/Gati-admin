import { createFileRoute } from "@tanstack/react-router";
import { CouponsPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/coupons")({
  head: () => ({
    meta: [
      { title: "Coupons · GATI Admin" },
      { name: "description", content: "Active promotional coupon codes." },
    ],
  }),
  component: CouponsPage,
});
