import Link from "next/link";
import styles from "./web.module.css";
import Image from "next/image";

export default function WebApp() {
  return (
    <div className={`${styles.parentBlock}`}>
      <div>
        <h1 style={{ textAlign: "center", padding: "10px 0" }}>Partners</h1>
      </div>
      <div className={`${styles.content}`}>
        <div className={`margin-right ${styles.productSection}`}>
          <div className={styles.imageContainer}>
            <Image
              src="/assets/partners/apex-lawn.jpg"
              alt="Apex Lawn care"
              width={630}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={`heading-font ${styles.title}`}>
              Apex Lawn Company
            </h2>
            <br />
            <p className={styles.description}>
              Apex Lawn Company is a modern, responsive website crafted to
              showcase professional lawn care and landscaping services. Designed
              with a clean interface and smooth navigation, it highlights
              service offerings, client testimonials, and easy online
              appointment booking. Built with performance and clarity in mind,
              the site reflects Apex's commitment to quality, reliability, and
              the art of outdoor beauty.
            </p>
            <Link
              href="https://apexlawncompany.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Visit Website ↗
            </Link>
          </div>
        </div>

        <div className={`margin-left reverse ${styles.productSection}`}>
          <div className={styles.imageContainer}>
            <Image
              src="/assets/partners/prana-logo.png"
              alt="Prana Health Care"
              width={634}
              height={300}
              className={styles.image2}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={`heading-font ${styles.title}`}>
              Prana Health Care
            </h2>
            <br />
            <p className={styles.description}>
              Prana Health Care is a serene, user-focused website designed to
              reflect trust, wellness, and compassionate care. With a calming
              design and clear structure, it presents medical services, expert
              profiles, and patient resources seamlessly. Optimized for both
              performance and accessibility, the site helps visitors easily
              connect with healthcare professionals and book appointments online
              - embodying Prana's spirit of holistic healing and digital care.
            </p>
            <Link
              href="https://prana.healthcare/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Visit Website ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
