import styles from "../contactHours/contactHours.module.css";

export default function ContactHours() {
  return (
    <div className={styles.contactSection}>
      <div className={`page-margin ${styles.contactContainer}`}>
        <div className={styles.mapContainer}>
          {/* Updated Google Map Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3251.280489889688!2d-79.12336402556207!3d35.42308114411404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89aca763c01e563f%3A0x1cf38db74fef51a8!2sApex%20Lawn%20Company%20LLC!5e0!3m2!1sen!2sus!4v1742566001783!5m2!1sen!2sus"
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
          <p>Apex Ship Headquarters</p>
          <p>4534 NC 87 S</p>
          <p>Sanford, NC 27332</p>
          <p>
            <a href="tel:+15555555555">(919) 939-4665</a>
          </p>
          <p>
            <a href="mailto:hi@mystore.com">Client@apexship.net</a>
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

        {/* <div className={styles.hours}>
          <p>Monday 09:00 am - 05:00 pm</p>
          <p>Tuesday 09:00 am - 05:00 pm</p>
          <p>Wednesday 09:00 am - 05:00 pm</p>
          <p>Thursday 09:00 am - 05:00 pm</p>
          <p>Friday 09:00 am - 05:00 pm</p>
          <p>Saturday 09:00 am - 05:00 pm</p>
          <p>Sunday Closed</p>
        </div> */}
      </div>
    </div>
  );
}
