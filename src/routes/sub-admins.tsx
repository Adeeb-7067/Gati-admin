import { createFileRoute } from "@tanstack/react-router";
import { SubAdminsPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/sub-admins")({
  head: () => ({
    meta: [
      { title: "Sub-Admins · GATI Admin" },
      { name: "description", content: "Administrators with granular permissions." },
    ],
  }),
  component: SubAdminsPage,
});
