import { createFileRoute } from "@tanstack/react-router";
import { VehicleCategoriesPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/vehicle-categories")({
  head: () => ({
    meta: [
      { title: "Vehicle Categories · GATI Admin" },
      { name: "description", content: "Categories and sub-categories of vehicles." },
    ],
  }),
  component: VehicleCategoriesPage,
});
