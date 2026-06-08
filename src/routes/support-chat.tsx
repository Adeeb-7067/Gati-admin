import { createFileRoute } from "@tanstack/react-router";
import { SupportChatPage } from "@/components/admin/pages/CustomPages";

export const Route = createFileRoute("/support-chat")({
  head: () => ({
    meta: [
      { title: "Support Chat · GATI Admin" },
      { name: "description", content: "Real-time support tickets and chat." },
    ],
  }),
  component: SupportChatPage,
});
