import Link from "next/link";
import { motion } from "framer-motion";
import AVAIL_SERVICES from "@/src/data/availableServices";
import styles from "./header.module.css";

export default function Navigation({ pathname }) {
  let selectedService =
    AVAIL_SERVICES.find((service) => service.path === pathname) ||
    AVAIL_SERVICES.find((service) =>
      service.subcategories?.some((sub) => sub.path === pathname)
    );

  return (
    <nav className={`margin-top margin-bottom ${styles.nav}`}>
      {selectedService ? (
        <>
          <motion.span
            className={styles.activeService}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedService.text}
          </motion.span>
          {selectedService.subcategories?.map((sub, index) => (
            <motion.div
              key={sub.id}
              className={styles.subNavItem}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
            >
              <Link href={sub.path}>{sub.text}</Link>
            </motion.div>
          ))}
        </>
      ) : (
        AVAIL_SERVICES.map((service) => (
          <motion.div
            key={service.path}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={service.path}>{service.text}</Link>
          </motion.div>
        ))
      )}
    </nav>
  );
}
