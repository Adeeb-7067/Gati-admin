import { createFileRoute } from "@tanstack/react-router";
import { FaqsPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs · GATI Admin" },
      { name: "description", content: "Categorized frequently asked questions." },
    ],
  }),
  component: FaqsPage,
});
