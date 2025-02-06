import SideBar from "@/src/components/Sidebar";
import styles from "../shipping-courier-service/shipping&courier.module.css";

export default function ShippingAndCourier() {
  return (
    <div className={`${styles.header}`}>
      <div className={`page-margin ${styles.content}`}>
        <h2 className={`heading-font`}>Shipping & Courier Service</h2>
        <br />

        {/* Embedded FedEx Shipping Estimator */}
        <div className={styles.shippingEstimator}>
          <h3>FedEx Shipping Estimator</h3>
          <iframe
            src="https://www.fedex.com/ratefinder/home"
            width="100%"
            height="600px"
            style={{ border: "none" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
