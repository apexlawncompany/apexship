"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "../Header/header.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // State to toggle search
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions
  const searchInputRef = useRef(null); // Focus Cursor in search input
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredServices = AVAIL_SERVICES.filter((service) =>
        service.text.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(
        filteredServices.length > 0 ? filteredServices : ["No results found"]
      );
    }
  };

  const handleSearchIconClick = () => {
    setSearchOpen((prev) => !prev);
    setSearchQuery(""); // Clear search query when toggling
    setSuggestions([]); // Clear suggestions
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus(); // Focus the input field when search is open
    }
  }, [searchOpen]);

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

  const typingAnimation = (text) => {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05, // Delay between each letter
        },
      },
    };
  };

  const letterAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

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
            <span className={styles.searchIcon} onClick={handleSearchIconClick}>
              <motion.div
                animate={{
                  x: searchOpen ? 0 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/search_24.png"
                  alt="Search"
                  width={24}
                  height={24}
                />
              </motion.div>
            </span>
            {searchOpen && (
              <motion.div
                className={styles.searchField}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "120px", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className={styles.searchInput}
                  ref={searchInputRef} // Attach the ref to the input field
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.ul
                      className={styles.suggestions}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className={styles.suggestionItem}
                          onClick={() => {
                            if (typeof suggestion !== "string") {
                              router.push(suggestion.path);
                            }
                            setSearchQuery("");
                            setSearchOpen(false); // Close the search field
                          }}
                        >
                          {typeof suggestion === "string" ? (
                            suggestion
                          ) : (
                            <span>{suggestion.text}</span>
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`margin-top margin-bottom ${styles.nav}`}>
          {selectedService ? (
            <>
              {/* Active Service Title with Smooth Movement */}
              <motion.span
                className={styles.activeService}
                variants={typingAnimation(selectedService.text)}
                initial="hidden"
                animate="visible"
              >
                {selectedService.text.split("").map((char, index) => (
                  <motion.span key={index} variants={letterAnimation}>
                    {char}
                  </motion.span>
                ))}
              </motion.span>

              {selectedService.subcategories?.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  className={styles.subNavItem}
                  variants={typingAnimation(sub.text)}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href={sub.path}>
                    {sub.text.split("").map((char, charIndex) => (
                      <motion.span key={charIndex} variants={letterAnimation}>
                        {char}
                      </motion.span>
                    ))}
                  </Link>
                </motion.div>
              ))}
            </>
          ) : (
            AVAIL_SERVICES.map((service) => (
              <motion.div
                key={service.path}
                initial="hidden"
                animate="visible"
                variants={typingAnimation(service.text)}
                // transition={{ duration: 0.5 }}
              >
                <Link href={service.path}>
                  {service.text.split("").map((char, index) => (
                    <motion.span key={index} variants={letterAnimation}>
                      {char}
                    </motion.span>
                  ))}
                </Link>
              </motion.div>
            ))
          )}
        </nav>
      </header>

      {/* Mini Header */}
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
                  <Link href={sub.path}>
                    {sub?.text === "Custom Packaging & Branding"
                      ? "Packaging & Branding"
                      : sub.text}
                  </Link>
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
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: searchOpen ? 0 : 1 }} // Fade out when search is open
            transition={{ duration: 0.3 }}
          >
            <Link href="/book-consult">
              <button className={styles.button}>Book Consult</button>
            </Link>
          </motion.div>
          <span className={styles.searchIcon} onClick={handleSearchIconClick}>
            <motion.div
              animate={{
                x: searchOpen ? 0 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Image src="/search_24.png" alt="Search" width={20} height={20} />
            </motion.div>
          </span>
          {searchOpen &&
            isScrolled && ( // Only show suggestions when mini header is visible
              <motion.div
                className={styles.searchField}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "120px", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className={styles.searchInput}
                  ref={searchInputRef} // Focus cursor bliking
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.ul
                      className={styles.suggestions}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className={styles.suggestionItem}
                          onClick={() => {
                            if (typeof suggestion !== "string") {
                              router.push(suggestion.path);
                            }
                            setSearchQuery("");
                            setSearchOpen(false); // Close the search field
                          }}
                        >
                          {typeof suggestion === "string" ? (
                            suggestion
                          ) : (
                            <span>{suggestion.text}</span>
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
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
            className={styles.mobilelogoContainer}
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
          <div className={styles.mobileActions}>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: searchOpen ? 0 : 1 }} // Fade out when search is open
            transition={{ duration: 0.3 }}
          >
            <Link href="/book-consult">
              <button className={styles.mobileButton}>Book Consult</button>
            </Link>
          </motion.div>
            <span className={styles.searchIcon} onClick={handleSearchIconClick}>
              <motion.div
                animate={{
                  x: searchOpen ? -90 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/search_24.png"
                  alt="Search"
                  width={20}
                  height={20}
                />
              </motion.div>
            </span>
            {searchOpen && (
              <motion.div
                className={styles.mobileSearchField}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "90px", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className={styles.mobileSearchInput}
                  ref={searchInputRef} // Attach the ref to the input field
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.ul
                      className={styles.suggestions}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className={styles.mobileSuggestionItem}
                          onClick={() => {
                            if (typeof suggestion !== "string") {
                              router.push(suggestion.path);
                            }
                            setSearchQuery("");
                            setSearchOpen(false); // Close the search field
                          }}
                        >
                          {typeof suggestion === "string" ? (
                            suggestion
                          ) : (
                            <span>{suggestion.text}</span>
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
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
            const [expandedServices, setExpandedServices] = useState({});

            const toggleService = (path) => {
              setExpandedServices((prev) => ({
                ...prev,
                [path]: !prev[path],
              }));
            };
            return (
              <div key={service.path} className={styles.mainService}>
                {/* Main Service */}
                <div className={styles.mainServiceLink}>
                  <div className={styles.serviceText}>
                    <Link
                      href={service.path}
                      onClick={() => setMenuOpen(false)}
                    >
                      {service.text}
                    </Link>
                  </div>
                  {service.subcategories && (
                    <span
                      className={styles.chevronIcon}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the Link's onClick from firing
                        toggleService(service.path);
                      }}
                    >
                      {expandedServices[service.path] ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  )}
                </div>

                {/* Show Sub-services only if this is expanded */}
                {expandedServices[service.path] && service.subcategories && (
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
