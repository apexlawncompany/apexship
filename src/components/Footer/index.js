import styles from "./footer.module.css";
import ContactHours from "../../sections/contactHours";

export default function Footer() {
  return (
    <div className={`page-margin margin-bottom margin-top ${styles.footer}`}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          {/* Left Section: Existing Content */}
          <div className={styles.leftSection}>
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

            <div className={`margin-bottom ${styles.newsletter}`}>
              <h3 className={`margin-bottom`}>Stay in the Loop</h3>

              <div className={`margin-bottom ${styles.emailForm}`}>
                <input type="email" placeholder="Email" />
                <button>Sign Up</button>
              </div>
              <p>
                This form is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
                <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
                apply.
              </p>
            </div>
          </div>

          {/* Right Section: Contact Hours */}
          <div className={styles.rightSection}>
            <ContactHours />
          </div>
        </div>

        <p className={styles.copyright}>© 2025</p>
      </div>
    </div>
  );
}