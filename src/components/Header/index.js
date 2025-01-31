"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "../Header/header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Adjust scroll trigger as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Full Header (Shown at the top) */}
      <header className={`${styles.header} ${isScrolled ? styles.hidden : ""}`}>
        <div className={styles.container}>
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

          <div className={styles.actions}>
            <Link href="/book-consult">
              <button className={styles.button}>Book Consult</button>
            </Link>
            <span className={styles.searchIcon}>
              <Image src="/search.png" alt="Search" width={20} height={20} />
            </span>
          </div>
        </div>

        <nav className={styles.nav}>
          {AVAIL_SERVICES.map((service, idx) => (
            <Link key={idx} href={service.path}>
              {service.text}
            </Link>
          ))}
        </nav>
      </header>

      {/* Mini Header (Shown on Scroll) */}
      <div
        className={`${styles.miniHeader} ${isScrolled ? styles.visible : ""}`}
      >
        <nav className={styles.nav}>
          {AVAIL_SERVICES.map((service, idx) => (
            <Link key={idx} href={service.path}>
              {service.text}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/book-consult">
            <button className={styles.button}>Book Consult</button>
          </Link>
          <span className={styles.searchIcon}>
            <Image src="/search.png" alt="Search" width={20} height={20} />
          </span>
        </div>
      </div>
    </>
  );
}
