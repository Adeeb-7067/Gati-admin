import { createFileRoute } from "@tanstack/react-router";
import { CitiesPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/cities")({
  head: () => ({
    meta: [
      { title: "Cities · GATI Admin" },
      { name: "description", content: "Operational cities with polygon boundaries." },
    ],
  }),
  component: CitiesPage,
});
