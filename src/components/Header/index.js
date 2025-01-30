import styles from "../Header/header.module.css";
import Link from "next/link";
import Image from "next/image";
import AVAIL_SERVICES from "@/src/data/availableServices";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Centered */}
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src="/Apex Ship Logo.webp"
              alt="ApexShip Logo"
              width={85}
              height={98}
              className={styles.logo}
            />
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className={styles.actions}>
          <button className={styles.button}>Book Consult</button>
          <span className={styles.searchIcon}>
            <Image src="/search.png" alt="Search" width={20} height={20} />
          </span>
        </div>
      </div>

      {/* Navigation Bar Below Logo */}
      <nav className={styles.nav}>
        {AVAIL_SERVICES.map((service, idx) => (
          <Link  key={idx} href={service.path}>
            {service.text}
          </Link>
        ))}
      </nav>
    </header>
  );
}
