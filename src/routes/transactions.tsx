import { createFileRoute } from "@tanstack/react-router";
import { TransactionsPage } from "@/components/admin/pages/ListPages";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions · GATI Admin" },
      { name: "description", content: "Wallet transactions and withdrawal approvals." },
    ],
  }),
  component: TransactionsPage,
});
