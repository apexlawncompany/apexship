"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "../Header/header.module.css";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Function to determine the previous level path
  const getPreviousPath = () => {
    if (pathname === "/") return "/";

    for (let service of AVAIL_SERVICES) {
      if (service.path === pathname) {
        return "/"; // If in a main service, go home
      }
      if (service.subcategories) {
        for (let sub of service.subcategories) {
          if (sub.path === pathname) {
            console.log("Sub Path:", sub.path);
            return service.path; // If in a subcategory, go to the main service
          }
        }
      }
    }
    return "/"; // Default to home if no match is found
  };

  const handleLogoClick = () => {
    router.push(getPreviousPath());
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine selected service for sub-navigation
  let selectedService = AVAIL_SERVICES.find(
    (service) => service.path === pathname
  );

  if (!selectedService) {
    selectedService = AVAIL_SERVICES.find((service) =>
      service.subcategories?.some((sub) => sub.path === pathname)
    );
  }

  return (
    <>
      {/* Full Header */}
      <header
        className={`page-margin ${styles.header} ${
          isScrolled ? styles.hidden : ""
        }`}
      >
        <div className={`margin-top ${styles.container}`}>
          <div
            className={styles.logoContainer}
            onClick={handleLogoClick}
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
        <nav className={`margin-top margin-bottom ${styles.nav}`}>
          {selectedService ? (
            <>
              {/* Active Service Title with Smooth Movement */}
              <motion.span
                className={styles.activeService}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {selectedService.text}
              </motion.span>

              {selectedService.subcategories?.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  className={styles.subNavItem}
                  initial={{ opacity: 0, width: "auto" }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                >
                  <Link href={sub.path}>{sub.text}</Link>
                </motion.div>
              ))}
            </>
          ) : (
            AVAIL_SERVICES.map((service) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={service.path}>{service.text}</Link>
              </motion.div>
            ))
          )}
        </nav>
      </header>

      <div
        className={`${styles.miniHeader} ${isScrolled ? styles.visible : ""}`}
      >
        <div
          className={styles.minilogo}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <Image
            src="/Apex Ship Logo2.png"
            alt="ApexShip Logo"
            width={40}
            height={40}
            className={styles.logo}
          />
        </div>
        <nav className={styles.nav}>
          {selectedService ? (
            <>
              {/* Active Service Title with Smooth Movement */}
              <motion.span
                className={styles.activeService}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {selectedService.text}
              </motion.span>
              {selectedService.subcategories?.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  className={styles.subNavItem}
                  initial={{ opacity: 0, width: "auto" }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                >
                  <Link href={sub.path}>{sub.text}</Link>
                </motion.div>
              ))}
            </>
          ) : (
            AVAIL_SERVICES.map((service) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={service.path}>{service.text}</Link>
              </motion.div>
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

      {/* Mobile Header */}
      <header className={styles.mobileHeader}>
        <div className={` ${styles.mobileContentHeader}`}>
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div
            className={styles.logoContainer}
            onClick={() => router.push("/")}
          >
            <Image
              src="/Apex Ship Logo2.png"
              alt="ApexShip Logo"
              width={50}
              height={55}
              className={styles.logo}
            />
          </div>

          <span className={styles.searchIcon}>
            <Image src="/search.png" alt="Search" width={18} height={18} />
          </span>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
        <div className={styles.closeButton} onClick={() => setMenuOpen(false)}>
          ✕
        </div>

        <nav className={styles.mobileNav}>
          {AVAIL_SERVICES.map((service) => (
            <Link
              key={service.path}
              href={service.path}
              onClick={() => setMenuOpen(false)}
            >
              {service.text}
            </Link>
          ))}
        </nav>

        <Link href="/book-consult">
          <button
            className={styles.bookConsult}
            onClick={() => setMenuOpen(false)}
          >
            Book Consult
          </button>
        </Link>
      </div>
    </>
  );
}
