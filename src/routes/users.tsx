import { createFileRoute } from "@tanstack/react-router";
import { UsersPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/users")({
  head: () => ({
    meta: [
      { title: "Users · GATI Admin" },
      { name: "description", content: "All users on the GATI platform." },
    ],
  }),
  component: UsersPage,
});
