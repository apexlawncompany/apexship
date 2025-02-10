import styles from "../marketingCycle/marketingCycle.module.css";
import Image from "next/image";

export default function MarketingCycle() {
  return (
    <div className={`${styles.marketing}`}>
      <div className={`page-margin ${styles.content}`}>
        <h2 className={`heading-font margin-bottom`}>THE MARKETING CYCLE</h2>

        <div className={`margin-bottom ${styles.sectionContainer}`}>
          {/* DESIGN Section */}
          <div className={styles.section}>
            <div className={`margin-bottom ${styles.imageContainer}`}>
              <Image
                src="/assets/home/mc_design.jpg"
                alt="Design"
                width={340}
                height={340}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h3 className={`heading-font ${styles.title}`}>DESIGN</h3>
              <p className={styles.description}>
                Design is the first step in any product cycle. A robust design
                instills confidence and product longevity. We create "design
                elements" which can be reused across multiple fomats including:
                business cards, brochures, and digital space. A design element
                can be as simple as a logo; however, elements can also be
                certain lines, shapes, and patterns that can be adjusted and
                scaled across multiple product lines.
              </p>
            </div>
          </div>

          {/* EXPORT Section */}
          <div className={styles.section}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/home/mc_export.jpg"
                alt="Export"
                width={340}
                height={340}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h3 className={`heading-font ${styles.title}`}>EXPORT</h3>
              <p className={styles.description}>
                Using the right material is just as important as the design.
                There is no use in a great design without an equally great
                product. Our marketing materials are made and printed in the
                USA. We also offer digital exports of vector elements for you
                and your team.
              </p>
            </div>
          </div>

          {/* DEPLOY Section */}
          <div className={styles.section}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/home/mc_deploy.jpg"
                alt="Deploy"
                width={340}
                height={340}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h3 className={`heading-font ${styles.title}`}>DEPLOY</h3>
              <p className={styles.description}>
                A marketing expert can help your business top the algorithms. We
                offer digital and print advertising; including Google Ads,
                Targeted Flyers, and Scented Mail for executive clientele. We
                offer solutions based specifically on your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
