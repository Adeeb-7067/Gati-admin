import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/admin/pages/CustomPages";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · GATI Admin" },
      { name: "description", content: "Platform-wide configuration." },
    ],
  }),
  component: SettingsPage,
});
