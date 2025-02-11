import SideBar from "@/src/components/Sidebar";
import styles from "../signage&mounting.module.css";

export default function TemporarySignage() {
  return (
    <div className={`${styles.header}`} style={{ padding: "10px 0px" }}>
      <div className={styles.content}>
        <h2 className={`heading-font`}>Temporary Signage</h2>
        <br />
        <p>
          Items aren't available for sale yet on this page. Come back later to
          purchase!
        </p>
      </div>
    </div>
  );
}
