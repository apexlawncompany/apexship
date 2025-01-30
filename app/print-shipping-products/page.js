import styles from "../print-shipping-products/print&products.module.css";

export default function PrintAndProducts() {
  return (
    <div className={`page-content ${styles.header}`}>
      <div className={styles.links}>
        <p>Browse by category</p>
        <p>All items</p>
        <a href="/print-shipping-products">Print & Shipping products</a><br/>
        <a href="/print-shipping-products">Shipping & Courier Service</a><br/>
        <a href="/print-shipping-products">Design & Marketing Service</a><br/>
        <a href="/print-shipping-products">Signage & Mounting</a><br/>
      </div>
      <div className={styles.content}>
        <h2 className={`heading-font`}>Print & Shipping products</h2>
        <br/>
        <p>Items aren't available for sale yet on this page. Come back later to purchase!</p>
      </div>
    </div>
  );
}
