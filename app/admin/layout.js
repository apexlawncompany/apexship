"use client";

import "../globals.css";
import styles from "./adminLayout.module.css";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/src/components/AdminSidebar";
import { AuthProvider } from "@/src/utils/AdminAuthContext";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/admin/login", "/admin/register", "/admin/verify"];

  const hideSidebar = noSidebarRoutes.includes(pathname);

  return (
    <AuthProvider>
      <div className={styles.layout}>
        {!hideSidebar && <AdminSidebar />}
        <main className={styles.main}>{children}</main>
      </div>
    </AuthProvider>
  );
}
