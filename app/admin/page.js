'use client';

import styles from './dashboard.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin Panel</h2>
        <nav className={styles.nav}>
          <a href="/admin">Dashboard</a>
          <a href="/admin/forms/new">Create Form</a>
          <a href="/admin/submissions">Submissions</a>
        </nav>
      </aside>
      <main className={styles.main}>
        <h1 className={styles.heading}>Dashboard</h1>
        <div className={styles.cardGrid}>
          <div className={styles.card}>+ Create New Form</div>
          <div className={styles.card}>Peak Bagels Survey</div>
          <div className={styles.card}>Neighborhood Vendors Form</div>
        </div>
      </main>
    </div>
  );
}