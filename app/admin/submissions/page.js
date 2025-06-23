'use client';

import { useEffect, useState } from 'react';
import styles from './submissions.module.css';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetch('/api/submissions/list')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSubmissions(data.submissions);
        }
      });
  }, []);

  const updateStatus = async (index, newStatus) => {
    const file = submissions[index].file;
    const res = await fetch(`/api/submissions/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      setSubmissions(prev => {
        const updated = [...prev];
        updated[index].status = newStatus;
        return updated;
      });
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchForm = sub.formName.toLowerCase().includes(filterText.toLowerCase());
    const matchStatus = filterStatus ? sub.status === filterStatus : true;
    return matchForm && matchStatus;
  });

  const counts = submissions.reduce(
    (acc, sub) => {
      acc[sub.status] = (acc[sub.status] || 0) + 1;
      return acc;
    },
    { New: 0, Reviewed: 0, Completed: 0 }
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Submissions</h1>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by form name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className={styles.input}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.statusSelect}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className={styles.stats}>
        <span>New: {counts.New}</span>
        <span>Reviewed: {counts.Reviewed}</span>
        <span>Completed: {counts.Completed}</span>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Form</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((sub, idx) => (
            <tr key={idx}>
              <td>{sub.formName}</td>
              <td>{new Date(sub.timestamp).toLocaleString()}</td>
              <td>{sub.status}</td>
              <td>
                <button className={styles.viewBtn} onClick={() => setSelected(sub)}>View</button>
                <select
                  value={sub.status}
                  onChange={(e) => updateStatus(submissions.indexOf(sub), e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="New">New</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selected.formName}</h2>
            <pre>{JSON.stringify(selected.data, null, 2)}</pre>
            <button className={styles.closeBtn} onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
