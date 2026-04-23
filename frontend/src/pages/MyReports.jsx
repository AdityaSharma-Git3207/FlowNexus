import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { getMyReports } from "../services/reportService";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getMyReports();
        setReports([...data].reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <AppLayout title="My Reports" role="Employee">
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.hero}>
          <p style={styles.eyebrow}>EMPLOYEE HISTORY</p>
          <h2 style={styles.title}>Submitted Reports</h2>
          <p style={styles.sub}>
            Review all your completed daily submissions, hours logged and work
            summaries.
          </p>
        </div>

        {/* Body */}
        <div style={styles.panel}>
          {loading ? (
            <p style={styles.message}>Loading reports...</p>
          ) : reports.length === 0 ? (
            <p style={styles.message}>No reports submitted yet.</p>
          ) : (
            <div style={styles.list}>
              {reports.map((item, index) => (
                <div key={index} style={styles.card}>
                  <div style={styles.topRow}>
                    <span style={styles.date}>{item.report_date}</span>

                    <span style={styles.badge}>
                      {item.hours_worked} hrs
                    </span>
                  </div>

                  <p style={styles.task}>{item.tasks_done}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  hero: {
    padding: "10px 4px",
  },

  eyebrow: {
    margin: 0,
    fontSize: "12px",
    letterSpacing: "1px",
    fontWeight: "700",
    color: "#d6cbb5",
  },

  title: {
    margin: "8px 0 6px",
    fontSize: "42px",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: "1.1",
  },

  sub: {
    margin: 0,
    fontSize: "15px",
    color: "#94a3b8",
    maxWidth: "700px",
    lineHeight: "1.7",
  },

  panel: {
    padding: "28px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
  },

  message: {
    color: "#94a3b8",
    fontSize: "15px",
    margin: 0,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  card: {
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)",
    transition: "0.25s ease",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },

  date: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "15px",
  },

  badge: {
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#d6cbb5",
    color: "#000000",
    fontWeight: "700",
    fontSize: "13px",
  },

  task: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "15px",
  },
};

export default MyReports;