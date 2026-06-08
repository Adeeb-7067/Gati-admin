import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AdminShellProvider } from "@/contexts/admin-shell-context";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface Props {
  title: string;
  module?: string;
  breadcrumbs?: string[];
  children: ReactNode;
}

export function AdminLayout({ title, module, breadcrumbs, children }: Props) {
  return (
    <AdminShellProvider>
      <div className="admin-canvas min-h-svh">
        <Sidebar />
        <div className="flex min-h-svh min-w-0 flex-col transition-[padding-left] duration-300 ease-out lg:pl-[var(--sidebar-width)]">
          <Topbar title={title} module={module} breadcrumbs={breadcrumbs} />
          <motion.main
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 flex-1 overflow-x-hidden px-[var(--admin-px,1.25rem)] py-[var(--admin-py,1.25rem)] sm:px-[var(--admin-px,1.75rem)] sm:py-[var(--admin-py,1.5rem)]"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </AdminShellProvider>
  );
}

export { SIDEBAR_WIDTH, SIDEBAR_WIDTH_COMPACT, SIDEBAR_WIDTH_EXPANDED } from "@/lib/admin-layout";
