import { createFileRoute } from "@tanstack/react-router";
import { FleetOwnersPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/fleet-owners")({
  head: () => ({
    meta: [
      { title: "Fleet Owners · GATI Admin" },
      { name: "description", content: "Fleet owners managing multi-driver operations." },
    ],
  }),
  component: FleetOwnersPage,
});
