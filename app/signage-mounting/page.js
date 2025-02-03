import styles from "../signage-mounting/signage&mounting.module.css";

export default function SignageAndMounting() {
  return (
    <div className={`page-content ${styles.header}`}>
      <div className={styles.links}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <h2 className={`heading-font`}>Signage & Mounting</h2>
        <br />
        <p>
          Items aren't available for sale yet on this page. Come back later to
          purchase!
        </p>
      </div>
    </div>
  );
}
