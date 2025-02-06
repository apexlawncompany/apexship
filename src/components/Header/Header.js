"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Actions from "./Actions";
import MiniHeader from "./MiniHeader";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchToggle = (active) => {
    setIsSearchActive(active);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`page-margin ${styles.header} ${
          isScrolled || isSearchActive ? styles.hidden : ""
        }`}
      >
        <div className={`margin-top ${styles.container}`}>
          <Logo onClick={() => router.push("/")} />
          <Actions onSearchToggle={handleSearchToggle} />
        </div>
        {!isSearchActive && <Navigation pathname={pathname} />}
      </header>
      <MiniHeader isScrolled={isScrolled} pathname={pathname} />
    </>
  );
}
