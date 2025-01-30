import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={`heading-font ${styles.logo}`}>APEX SHIP LLC</h2>

          <nav className={styles.navLinks}>
            <a href="/print-shipping-products">Print & Products</a>
            <a href="/print-shipping-products">Shipping & Courier</a>
            <a href="/print-shipping-products">Design & Marketing</a>
            <a href="/print-shipping-products">Signage & Mounting</a>
          </nav>
        </div>

        {/* Horizontal line stays full width */}
        <hr className={styles.divider} />

        <div className={styles.newsletter}>
          <h3>Stay in the Loop</h3>
          <div className={styles.emailForm}>
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
        
        {/* Copyright aligned to the right */}
        <p className={styles.copyright}>© 2025</p>
      </div>
    </div>
  );
}
