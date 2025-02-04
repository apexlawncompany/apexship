import SideBar from "@/src/components/Sidebar";
import styles from "../print&products.module.css";

export default function CustomPacking() {
  return (
    <div className={`${styles.header}`} style={{ padding: "10px 0px" }}>
      <div className={styles.links}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <h2 className={`heading-font`}>Custom Packing</h2>
        <br />
        <p>
          Items aren't available for sale yet on this page. Come back later to
          purchase!
        </p>
      </div>
    </div>
  );
}
