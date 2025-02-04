import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "../Sidebar/sidebar.module.css";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <h3>Category</h3>

      {/* "All items" as a button */}
      <Link href="/">
        <button className={styles.allItemsButton}>All items</button>
      </Link>

      {/* Services as transparent buttons */}
      <div className={styles.serviceList}>
        {AVAIL_SERVICES.map((service) => (
          <Link key={service.path} href={service.path} className={styles.serviceButton}>
            {service.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
