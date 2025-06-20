'use client';

import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin Panel</h2>
        <nav className={styles.nav}>
          <a href="/admin">Dashboard</a>
          <a href="/admin/forms/formeditor">Create Form</a>
          <a href="/admin/submissions">Submissions</a>
        </nav>
      </aside>
      <main className={styles.main}>
        <h1 className={styles.heading}>Dashboard</h1>
        <div className={styles.cardGrid}>
          <div className={styles.card} onClick={() => router.push('/admin/forms/formeditor')}>
            + Create New Form
          </div>
          <div className={styles.card}>Peak Bagels Survey</div>
          <div className={styles.card}>Neighborhood Vendors Form</div>
        </div>
      </main>
    </div>
  );
}