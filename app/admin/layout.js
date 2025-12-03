"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/src/components/AdminSidebar";
import "../globals.css";
import styles from "./adminLayout.module.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Routes that should NOT display sidebar
  const noSidebarRoutes = ["/admin/login", "/admin/register", "/admin/verify"];

  const hideSidebar = noSidebarRoutes.includes(pathname);

  return (
    <div className={styles.layout}>
      {!hideSidebar && <AdminSidebar />}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
