import styles from "../custom-packaging-branding/customPackaging.module.css";
import Image from "next/image";

export default function CustomPackagingAndBranding() {
  return (
    <div>
      <div
        className={`${styles.topSection}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), transparent),url('/assets/prints/customPackage/packing1.jpg')`,
        }}
      >
        <div className={`${styles.cutoutSection}`}>
          <div className={`${styles.cutoutContent}`}>
            <h2 className={`heading-font`}>Why Apex is Different</h2>
            <p>
              When we claim a product is{" "}
              <span style={{ color: "red" }}>MADE</span> IN{" "}
              <span style={{ color: "blue" }}>USA</span>, we use locally sourced
              vendors and sustainable products made in America from American
              Materials and by American Workers.
            </p>
            <p>
              Our international and imported products are selected with care and
              held to the highest industry standards for both quality and labor
              practices.
            </p>
            {/* <p>
              Quality and ethical products aren’t a sales pitch, they’re an
              expectation.
            </p> */}
          </div>
        </div>
        <p className={`${styles.headingPara}`}>
          Custom packaging and branding play a significant role in consumer
          decision-making, influencing both perceptions and purchasing behavior.
          Here are several data-driven reasons why these factors are crucial for
          businesses:
        </p>
      </div>
      <div className={`margin-right ${styles.content}`}>
        <div>
          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/custom-boxes.jpg"
                alt="customBoxes"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={`${styles.textContainer}`}>
              <h2 className={`heading-font ${styles.title}`}>
                1. First Impressions Matter
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  <strong>72% of consumers</strong> say that packaging design
                  influences their purchase decision.
                </li>
                <li>
                  <strong>95%</strong> of a consumer’s first impression of a
                  brand is formed by the packaging.
                </li>
                <li>
                  Consumers typically engage with packaging first when assessing
                  a product, so high-quality, custom-designed packaging helps
                  businesses stand out.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/brand-recognition.jpg"
                alt="Brand Recognition"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                2. Brand Recognition
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  Custom packaging creates a unique identity for a brand. 64% of
                  consumers are more likely to purchase a product from a brand
                  they recognize.
                </li>
                <li>
                  57% of consumers are more likely to make repeat purchases from
                  a brand that they feel a connection to, which is often
                  fostered through effective packaging and branding.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/emotionalPackage.jpg"
                alt="Emotinal"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                3. Emotional Connection
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  Consumers are 4.5x more likely to engage with a brand if the
                  product packaging creates a memorable experience.
                </li>
                <li>
                  Packaging that reflects the brand’s personality and values can
                  create an emotional bond with consumers, making them more
                  loyal and likely to recommend the product.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/preactive-value.jpg"
                alt="packages"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                4. Perceived Value
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  67% of consumers say that product packaging impacts the
                  perceived value of the item inside. High-quality or customized
                  packaging often leads to higher perceived value, even if the
                  product itself isn’t premium.
                </li>
                <li>
                  Consumers expect aesthetically pleasing, thoughtful packaging
                  that reflects the quality of the product they’re purchasing.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/tape.jpg"
                alt="eco-friendly"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                5. Sustainability Matters
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  According to Nielsen Data 55% of consumers are willing to pay
                  more for products with sustainable packaging.
                </li>
                <li>
                  Custom packaging that incorporates eco-friendly materials or
                  highlights a brand’s sustainability practices can improve
                  brand perception and appeal to environmentally conscious
                  shoppers.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/shares.jpg"
                alt="Social Media Shares"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                6. Shareability and Social Media
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  In the age of social media, unique packaging encourages
                  customers to share their unboxing experiences. In fact, 40% of
                  consumers would share a brand’s packaging on social media if
                  it’s exceptional or engaging.
                </li>
                <li>
                  Custom packaging often becomes part of a brand’s marketing, as
                  it can be used in user-generated content or influencer
                  partnerships.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/Satisfaction.jpg"
                alt="Customer Satisfaction"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                7. Increased Customer Satisfaction
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  42% of consumers say that the appearance of packaging
                  influences their overall satisfaction with a purchase.
                </li>
                <li>
                  A positive experience with packaging, such as ease of opening,
                  durability, or surprise elements, can significantly enhance
                  customer satisfaction and loyalty.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/markets.jpg"
                alt="Market"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                8. Differentiation in Competitive Markets
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  Custom packaging helps products stand out on crowded shelves
                  or within a saturated online marketplace. This differentiation
                  is key, especially when competing in commodity-driven
                  categories.
                </li>
                <li>
                  As product choices increase, custom packaging can give brands
                  a distinct, memorable edge.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/customPackage/unboxing.jpg"
                alt="Unbox"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                9. Enhancing Customer Experience
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  60% of consumers say that a memorable unboxing experience adds
                  to their satisfaction. (Source: Packlane)
                </li>
                <li>
                  Custom packaging allows brands to craft an experience that
                  matches their core values—whether that’s through luxurious,
                  elegant designs or creative, fun elements.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/prints/custom-package.jpg"
                alt="Flyers"
                width={550}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={`heading-font ${styles.title}`}>
                10. Trust and Transparency
              </h2>
              <br />
              <ul className={styles.description}>
                <li>
                  Consumers are 3.5x more likely to trust a brand that uses
                  transparent packaging (showing the product inside), giving
                  them confidence in the authenticity of the product.
                </li>
                <li>
                  Custom packaging provides an opportunity to convey brand
                  transparency, whether it’s in terms of ingredient sourcing,
                  product origin, or sustainability claims.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.contrastSection}`}>
        <h2>Key Takeaways</h2>
        <p>
          {" "}
          Custom packaging and branding are vital to creating a strong
          connection between the brand and consumer. It helps with recognition,
          differentiation, emotional appeal, and customer satisfaction. In
          competitive markets, packaging becomes not just a vessel but a
          critical touchpoint in fostering loyalty, encouraging repeat
          purchases, and generating valuable word-of-mouth marketing through
          social media. In sum, investing in well-designed, custom packaging
          isn’t just about making a product look good—it’s about creating
          lasting impressions and aligning your brand with your customer’s
          values and expectations.
        </p>
      </div>
    </div>
  );
}
