import { createFileRoute } from "@tanstack/react-router";
import { HomeSectionsPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/home-sections")({
  head: () => ({
    meta: [
      { title: "Home Sections · GATI Admin" },
      { name: "description", content: "Modular home page sections." },
    ],
  }),
  component: HomeSectionsPage,
});
