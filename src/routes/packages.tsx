import { createFileRoute } from "@tanstack/react-router";
import { PackagesPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages · GATI Admin" },
      { name: "description", content: "Pricing packages by city and category." },
    ],
  }),
  component: PackagesPage,
});
