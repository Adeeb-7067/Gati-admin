import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · GATI Admin" },
      { name: "description", content: "Send push notifications and view history." },
    ],
  }),
  component: NotificationsPage,
});
