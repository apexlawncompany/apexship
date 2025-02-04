"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "../Header/header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
      <header className={`${styles.header} ${isScrolled ? styles.hidden : ""}`}>
        <div className={styles.container}>
          <div
            className={styles.logoContainer}
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            <Image
              src="/Apex Ship Logo.webp"
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
        <nav className={styles.nav}>
          {selectedService ? (
            <>
              <span className={styles.activeService}>
                {selectedService.text}
              </span>

              {selectedService.subcategories?.map((sub) => (
                <Link
                  key={sub.id}
                  href={sub.path}
                  className={styles.subNavItem}
                >
                  {sub.text}
                </Link>
              ))}
            </>
          ) : (
            AVAIL_SERVICES.map((service) => (
              <Link key={service.path} href={service.path}>
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
        <div
          className={styles.minilogo}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <Image
            src="/Apex Ship Logo.webp"
            alt="ApexShip Logo"
            width={40}
            height={40}
            className={styles.logo}
          />
        </div>
        <nav className={styles.nav}>
          {selectedService ? (
            <>
              <span className={styles.activeService}>
                {selectedService.text}
              </span>
              {selectedService.subcategories?.map((sub) => (
                <Link
                  key={sub.id}
                  href={sub.path}
                  className={styles.subNavItem}
                >
                  {sub.text}
                </Link>
              ))}
            </>
          ) : (
            AVAIL_SERVICES.map((service) => (
              <Link key={service.path} href={service.path}>
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
