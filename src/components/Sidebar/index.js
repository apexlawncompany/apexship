import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "../Sidebar/sidebar.module.css";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <h3>Browse by category</h3>
      <p>All items</p>
      {AVAIL_SERVICES.map((service) => (
        <div key={service.path}>
          <Link href={service.path}>{service.text}</Link>
          <br />
        </div>
      ))}
    </div>
  );
}
