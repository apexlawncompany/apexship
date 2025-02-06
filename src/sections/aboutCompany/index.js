import styles from "../aboutCompany/aboutCompany.module.css";
import Image from "next/image";

export default function AboutCompany() {
  return (
    <div className={`${styles.aboutCompany}`}>
      {/* First Section */}
      <div className={`margin-right ${styles.section1}`}>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/home/our_company.jpg"
            alt="Our Company"
            width={700}
            height={350}
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h3 className={`heading-font ${styles.subtitle}`}>
            INDUSTRY ON DEMAND
          </h3>
          <br />
          <h2 className={`heading-font ${styles.title}`}>OUR COMPANY</h2>
          <br />
          <p className={styles.description}>
            Managing a company is challenging, whether you are a CEO of a public
            company, or just starting out in your garage. We specialize in
            offering solutions to reduce operational burden.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className={`margin-left ${styles.section2}`}>
        <div className={styles.textContainer}>
          <h3 className={`heading-font ${styles.subtitle}`}>SOURCED LOCALLY</h3>
          <br />
          <h2 className={`heading-font ${styles.title}`}>PRODUCTS</h2>
          <br />
          <p className={styles.description}>
            We offer print, signage, and shipping materials. Our products are
            majority-sourced in the USA. We are constantly searching for
            American vendors to keep the lights on for our local jobs,
            businesses, and families. Each of our product pages has details on
            the quality and source of materials used, ensuring a quality finish
            and lasting impression.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/home/source_locally.jpg"
            alt="Products"
            width={650}
            height={325}
            className={styles.image}
          />
        </div>
      </div>

      {/* Third Section */}
      <div className={`margin-right ${styles.section3} ${styles.reverse}`}>
        <div className={styles.textContainer}>
          <h3 className={`heading-font ${styles.subtitle}`}>
            CATERED TO YOUR BUSINESS
          </h3>
          <br />
          <h2 className={`heading-font ${styles.title}`}>SHIPPING & COURIER</h2>
          <br />
          <p className={styles.description}>
            We've partnered with FedEx® to provided industry leading package
            handling and shipping. We offer courier same-day delivery in certain
            areas. Our team will pickup packages from your location on-demand or
            on a schedule. Our storefront is open 8am-7pm Mon-Sat to pickup and
            receive deliveries and offer virtual addresses.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/home/shipping.webp"
            alt="Shipping & Courier"
            width={615}
            height={325}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
