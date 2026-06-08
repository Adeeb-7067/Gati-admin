import { createFileRoute } from "@tanstack/react-router";
import { HomeBannersPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/home-banners")({
  head: () => ({
    meta: [
      { title: "Home Banners · GATI Admin" },
      { name: "description", content: "Carousel banners shown on the home screen." },
    ],
  }),
  component: HomeBannersPage,
});
