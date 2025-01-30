import styles from "../contactHours/contactHours.module.css";

export default function ContactHours() {
  return (
    <>
      {/* Contact & Hours Section */}

      <div className={styles.contactContainer}>
        <div className={styles.mapContainer}>
          {/* Updated Google Map Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0835840654416!2d-122.41941518468152!3d37.7749297797596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c0f0f6bfb%3A0x2fcd8d6b0c4a9f!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1614809051473!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className={styles.contactInfo}>
          <h2 className={`heading-font ${styles.contactTitle}`}>
            CONTACT & HOURS
          </h2>
          <p>Square Inc</p>
          <p>Market Street</p>
          <p>San Francisco, 94103</p>
          <p>
            <a href="tel:+15555555555">(555) 555-5555</a>
          </p>
          <p>
            <a href="mailto:hi@mystore.com">hi@mystore.com</a>
          </p>
          <br />
          {/* Updated "Get Directions" Link */}
          <p>
            <a
              href="https://maps.app.goo.gl/xipixWHiY6LSJxWZ6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </p>
        </div>

        <div className={styles.hours}>
          <p>Monday 09:00 am - 05:00 pm</p>
          <p>Tuesday 09:00 am - 05:00 pm</p>
          <p>Wednesday 09:00 am - 05:00 pm</p>
          <p>Thursday 09:00 am - 05:00 pm</p>
          <p>Friday 09:00 am - 05:00 pm</p>
          <p>Saturday 09:00 am - 05:00 pm</p>
          <p>Sunday Closed</p>
        </div>
      </div>
    </>
  );
}
