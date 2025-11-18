import styles from "./footer.module.css";
import ContactHours from "../../sections/contactHours";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={`page-margin margin-bottom margin-top ${styles.footer}`}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          {/* Left Section: Existing Content */}
          <div className={styles.stayInLoopSection}>
            <div className={styles.content}>
              <h2 className={`heading-font ${styles.logo}`}>APEX SHIP LLC</h2>

              <nav className={styles.navLinks}>
                <a href="/print-shipping-products">Print & Products</a>
                <a href="/shipping-courier-service">Shipping & Courier</a>
                <a href="/design-marketing-service">Design & Marketing</a>
                <a href="/signage-mounting">Signage & Mounting</a>
              </nav>
            </div>

            <hr className={styles.divider} />

            <div className={styles.partnersDiv}>
              <h2 className={`heading-font ${styles.logo}`}><Link href="/partners">Partners</Link></h2>
            </div>

            <hr className={styles.divider} />

            <div className={`margin-bottom ${styles.newsletter}`}>
              <h3 className={`margin-bottom`}>Stay in the Loop</h3>

              <div className={`margin-bottom ${styles.emailForm}`}>
                <input type="email" placeholder="Email" />
                <button>Sign Up</button>
              </div>
              <p>
                This form is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a>{" "}
                apply.
              </p>
            </div>
          </div>

          {/* Right Section: Contact Hours */}
          <div className={styles.contactHoursSection}>
            <ContactHours />
          </div>
        </div>
        <div className={styles.copyright}>
          <Link href="/policy">Policy</Link>
          <p>© 2025</p>
        </div>
      </div>
    </div>
  );
}
