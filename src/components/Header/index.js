"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "../Header/header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const selectedService = AVAIL_SERVICES.find(
    (service) => service.path === pathname
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Full Header */}
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

        {/* Navigation */}
        <nav className={styles.nav}>
          {selectedService ? (
            <>
              {/* Highlighted Main Service */}
              <span className={styles.activeService}>
                {selectedService.text}
              </span>

              {/* Display Subcategories */}
              {selectedService.subcategories?.map((sub, idx) => (
                <Link key={idx} href={sub.path} className={styles.subNavItem}>
                  {sub.text}
                </Link>
              ))}
            </>
          ) : (
            /* Show Main Services Only if No Service is Selected */
            AVAIL_SERVICES.map((service, idx) => (
              <Link key={idx} href={service.path}>
                {service.text}
              </Link>
            ))
          )}
        </nav>
      </header>

      {/* Mini Header (Shown on Scroll) */}
      <div
        className={`${styles.miniHeader} ${isScrolled ? styles.visible : ""}`}
      >
        <nav className={styles.nav}>
          {selectedService ? (
            <>
              <span className={styles.activeService}>
                {selectedService.text}
              </span>
              {selectedService.subcategories?.map((sub, idx) => (
                <Link key={idx} href={sub.path} className={styles.subNavItem}>
                  {sub.text}
                </Link>
              ))}
            </>
          ) : (
            AVAIL_SERVICES.map((service, idx) => (
              <Link key={idx} href={service.path}>
                {service.text}
              </Link>
            ))
          )}
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
