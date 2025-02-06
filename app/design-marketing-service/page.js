import SideBar from "@/src/components/Sidebar";
import styles from "../design-marketing-service/design&marketing.module.css";
import Image from "next/image";

export default function DesignAndMarketing() {
  return (
    <div className={`${styles.header}`}>
      <div className={`page-margin margin-top margin-bottom ${styles.content}`}>
        {/* AdvertiseSection */}
        <div className={styles.productSection}>
          <div className={styles.imageContainer}>
            <Image
              src="/assets/design/advertise.jpg"
              alt="Advertises"
              width={550}
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={`heading-font ${styles.title}`}>ADVERTISING</h2>
            <br />
            <p className={styles.description}>
              We offer top-quality advertising materials, including banners,
              flyers, business cards, and signage. Our print solutions ensure
              high-resolution designs that make your brand stand out.
            </p>
          </div>
        </div>

        {/* Graphic Design Section */}
        <div className={styles.productSection}>
          <div className={styles.textContainer}>
            <h2 className={`heading-font ${styles.title}`}>GRAPHIC DESIGN</h2>
            <br />
            <p className={styles.description}>
              Our team creates stunning visuals tailored to your brand. From
              logos to marketing materials, we deliver designs that enhance your
              business identity.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/assets/design/graphic_design.jpg"
              alt="Graphic design"
              width={600}
              height={300}
              className={styles.image}
            />
          </div>
        </div>


        <div className={styles.productSection}>
          <div className={styles.imageContainer}>
            <Image
              src="/assets/design/Web-App-Development.jpg"
              alt="Development"
              width={550}
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={`heading-font ${styles.title}`}>
              WEB & APP DEVELOPMENT
            </h2>
            <br />
            <p className={styles.description}>
              We build high-performing websites and applications that drive user
              engagement and business growth. Our development services cover
              everything from design to deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
