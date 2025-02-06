import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

export default function Actions() {
  return (
    <div className={styles.actions}>
      <Link href="/book-consult">
        <button className={styles.button}>Book Consult</button>
      </Link>
      <span className={styles.searchIcon}>
        <Image src="/search.png" alt="Search" width={20} height={20} />
      </span>
    </div>
  );
}
