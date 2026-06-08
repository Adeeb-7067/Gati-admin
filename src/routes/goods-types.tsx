import { createFileRoute } from "@tanstack/react-router";
import { GoodsTypesPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/goods-types")({
  head: () => ({
    meta: [
      { title: "Goods Types · GATI Admin" },
      { name: "description", content: "Categories of goods that can be delivered." },
    ],
  }),
  component: GoodsTypesPage,
});
