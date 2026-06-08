import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/admin/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GATI Admin · Dashboard" },
      { name: "description", content: "Operations dashboard for the GATI logistics platform." },
    ],
  }),
  component: Dashboard,
});
