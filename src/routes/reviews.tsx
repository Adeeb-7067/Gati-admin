import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews · GATI Admin" },
      { name: "description", content: "User and driver reviews and ratings." },
    ],
  }),
  component: ReviewsPage,
});
