import { createFileRoute } from "@tanstack/react-router";
import { VehiclesPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/vehicles")({
  head: () => ({
    meta: [
      { title: "Vehicles · GATI Admin" },
      { name: "description", content: "Vehicles registered on the platform." },
    ],
  }),
  component: VehiclesPage,
});
