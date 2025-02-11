import styles from "../print-shipping-products/print&products.module.css";
import Image from "next/image";

export default function PrintAndProducts() {
  return (
    <div className={`${styles.parentBlock}`}>
      <div className={`${styles.content}`}>
        {/* Flyers & Brochures Section */}
        <div
          id="flyers-brochures"
          className={`margin-right ${styles.productSection}`}
        >
          <div className={styles.imageContainer}>
            <Image
              src="/assets/prints/brouchers-and-flyer.webp"
              alt="Flyers"
              width={630}
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={`heading-font ${styles.title}`}>
              FLYRES & BROCHURES
            </h2>
            <br />
            <p className={styles.description}>
              Get high-quality flyers and brochures to help spread the word
              about your business. Available in various sizes and finishes, our
              printed materials will ensure your message stands out. Whether
              you're promoting an event, a sale, or your brand, we've got the
              perfect options for you.
            </p>
          </div>
        </div>

        {/* Posters & Vinyl Section */}
        <div
          id="posters-vinyl"
          className={`margin-left reverse ${styles.productSection}`}
        >
          <div className={styles.imageContainer}>
            <Image
              src="/assets/prints/poster.webp"
              alt="posters"
              width={634}
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={`heading-font ${styles.title}`}>POSTERS & VINYL</h2>
            <br />
            <p className={styles.description}>
              Our posters and vinyl banners are perfect for showcasing your
              advertisements or art in a big way! Whether you're looking for a
              custom design or a large format print, we have options for both
              indoor and outdoor use. Durable and vibrant, these prints are
              designed to catch the eye of your audience.
            </p>
          </div>
        </div>

        {/* Custom Packing Section */}
        <div
          id="custom-package"
          className={`margin-right ${styles.productSection}`}
        >
          <div className={styles.imageContainer}>
            <Image
              src="/assets/prints/custom-packaging.jpg"
              alt="Packages"
              width={630}
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={`heading-font ${styles.title}`}>
              CUSTOM PACKAGING & BRANDING
            </h2>
            <br />
            <p className={styles.description}>
              Need personalized packing materials? We offer custom packaging
              solutions to keep your products safe during shipping. From custom
              boxes to branded packing tape, we can design packaging that
              represents your brand and provides extra protection for your
              goods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
