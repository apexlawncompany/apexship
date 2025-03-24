import styles from "./policy.module.css";

export default function Policy() {
  return (
    <div className={`${styles.policyPage}`}>
      <div className={`page-margin`}>
        <h1 className={styles.policy}>Company Policy -- In Plain English</h1>
        <br/>
        <h2 className={`heading-font ${styles.title}`}>
          Information We Collect
        </h2>
        <br/>
        <div className={`${styles.mainText}`}>
          <p>
            Information you give us, such as your phone number
            <br /> Google Analytics. Their policy can be found at :
            <a
              href="https://policies.google.com/privacy?hl=en-US"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              https://policies.google.com/privacy?hl=en-US
            </a>
          </p>
          <br />
          <p>That's it!</p>
        </div>

        <div style={{ height: 20 }}></div>
        <div className={styles["license-row"]}>
          <div className={`heading-font ${styles.heading}`}>Insurance & Licenses</div>
          <hr className={styles.separator} />

          <div className={styles.text}>
            <p>
              Request a Certificate of General Liability Insurance (contact:{" "}
              <a href="mailto:client@apexlawncompany.com">
                client@apexlawncompany.com
              </a>
              )
            </p>
            <p>
              NCDA&CS (contact:{" "}
              <a href="mailto:client@apexlawncompany.com">
                client@apexlawncompany.com
              </a>
              )
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
