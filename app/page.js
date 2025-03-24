import styles from "./page.module.css";
import AboutCompany from "@/src/sections/aboutCompany";
import ContactHours from "@/src/sections/contactHours";
import MarketingCycle from "@/src/sections/marketingCycle";

export default function Home() {
  return (
    <main className={styles.main}>
      <AboutCompany />
      <MarketingCycle />
      <div className={styles.contactHoursSection}>
        <ContactHours />
      </div>
    </main>
  );
}
