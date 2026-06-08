import { createFileRoute } from "@tanstack/react-router";
import { DriversPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Drivers · GATI Admin" },
      { name: "description", content: "Driver onboarding, KYC and verification." },
    ],
  }),
  component: DriversPage,
});
