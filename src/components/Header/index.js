"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "../Header/header.module.css";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setSearchResults([]);
      return;
    }

    const results = [];

    AVAIL_SERVICES.forEach((service) => {
      if (service.text.toLowerCase().includes(term)) {
        results.push(service);
      }
      service.subcategories?.forEach((sub) => {
        if (sub.text.toLowerCase().includes(term)) {
          results.push(sub);
        }
      });
    });

    setSearchResults(results);
  };

  const handleResultClick = (path) => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchActive(false);
    router.push(path);
  };

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
          {searchActive ? (
            <div
              className={styles.searchBarWrapper}
              style={{ height: "156px" }}
            >
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              <button
                onClick={() => {
                  setSearchActive(false);
                  setSearchTerm("");
                  setSearchResults([]);
                }}
                className={styles.searchClose}
              >
                <X size={24} />
              </button>
              {searchTerm && (
                <div className={styles.searchResults}>
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <div
                        key={item.path}
                        className={styles.searchResult}
                        onClick={() => handleResultClick(item.path)}
                      >
                        {item.text}
                      </div>
                    ))
                  ) : (
                    <div className={styles.noResults}>No results found</div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
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
                <span
                  className={styles.searchIcon}
                  onClick={() => setSearchActive(true)}
                >
                  <Image
                    src="/search.png"
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        {!searchActive && (
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
        )}
      </header>

      {/* Mini Header */}
      <div
        className={`${styles.miniHeader} ${isScrolled ? styles.visible : ""}`}
      >
        {/* {searchActive ? (
          <div className={styles.searchBarWrapper} style={{ height: "36px" }}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
            <button
              onClick={() => setSearchActive(false)}
              className={styles.searchClose}
            >
              <X size={24} />
            </button>
          </div>
        ) : ( */}
        <>
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
            <span
              className={styles.searchIcon}
              onClick={() => setSearchActive(true)}
            >
              <Image src="/search.png" alt="Search" width={20} height={20} />
            </span>
          </div>
        </>
        {/* )} */}
      </div>

      {/* Mobile Header */}
      <header className={styles.mobileHeader}>
        <div className={` ${styles.mobileContentHeader}`}>
          {searchActive ? (
            <div
              className={styles.searchBarMobileWrapper}
              style={{ height: "55px" }}
            >
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              <button
                onClick={() => {
                  setSearchActive(false);
                  setSearchTerm("");
                  setSearchResults([]);
                }}
                className={styles.searchClose}
              >
                <X size={24} />
              </button>
              {searchTerm && (
                <div className={styles.mobileSearchResults}>
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <div
                        key={item.path}
                        className={styles.searchResult}
                        onClick={() => handleResultClick(item.path)}
                      >
                        {item.text}
                      </div>
                    ))
                  ) : (
                    <div className={styles.noResults}>No results found</div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <div
                className={`${styles.hamburger} ${
                  menuOpen ? styles.active : ""
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div
                className={styles.logoContainer}
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src="/Apex Ship Logo2.png"
                  alt="ApexShip Logo"
                  width={50}
                  height={55}
                  className={styles.logo}
                />
              </div>

              <span
                className={styles.searchIcon}
                onClick={() => setSearchActive(true)}
              >
                <Image src="/search.png" alt="Search" width={18} height={18} />
              </span>
            </>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
        <div className={styles.closeButton} onClick={() => setMenuOpen(false)}>
          ✕
        </div>

        <nav className={styles.mobileNav}>
          {AVAIL_SERVICES.map((service) => {
            const isActive = selectedService?.path === service.path;

            return (
              <div key={service.path} className={styles.mainService}>
                {/* Main Service */}
                <Link href={service.path} onClick={() => setMenuOpen(false)}>
                  <div className={styles.mainServiceLink}>
                    {service.text}
                    {service.subcategories &&
                      (isActive ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </Link>

                {/* Show Sub-services only if this is the active main service */}
                {isActive && service.subcategories && (
                  <div className={styles.subMenu}>
                    {service.subcategories.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
