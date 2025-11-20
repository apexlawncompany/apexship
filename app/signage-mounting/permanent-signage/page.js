import styles from "../signage&mounting.module.css";

export default function PermanentSignage() {
  return (
    <div className={`${styles.header}`} style={{ padding: "10px 0px" }}>
      <div className={styles.content}>
        <h2 className={`heading-font`}>Permanent Signage</h2>
        <br />
        <p>
          Items aren't available for sale yet on this page. Come back later to
          purchase!
        </p>
      </div>
    </div>
  );
}
