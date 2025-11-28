import AdminSidebar from "@/src/components/AdminSidebar";
import "../globals.css";
import styles from "./adminLayout.module.css";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
