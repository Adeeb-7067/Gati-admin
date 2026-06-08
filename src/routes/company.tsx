import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/admin/pages/CustomPages";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company Settings · GATI Admin" },
      { name: "description", content: "Branding, operations, legal, pricing settings." },
    ],
  }),
  component: CompanyPage,
});
