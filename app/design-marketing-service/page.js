import SideBar from "@/src/components/Sidebar";
import styles from "../design-marketing-service/design&marketing.module.css";

export default function DesignAndMarketing() {
  return (
    <div className={`page-content ${styles.header}`}>
      <div className={styles.links}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <h2 className={`heading-font`}>Design & Marketing Service</h2>
        <br />
        <p>
          Items aren't available for sale yet on this page. Come back later to
          purchase!
        </p>
      </div>
    </div>
  );
}
