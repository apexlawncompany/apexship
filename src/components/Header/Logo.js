import Image from "next/image";
import styles from "./header.module.css";

export default function Logo({ onClick }) {
  return (
    <div
      className={styles.logoContainer}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Image
        src="/Apex Ship Logo2.png"
        alt="ApexShip Logo"
        width={85}
        height={98}
        className={styles.logo}
      />
    </div>
  );
}
