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
      <div style={styles.panel}>
        <h2 style={styles.title}>Submitted Reports</h2>

        <p style={styles.sub}>
          Review all your submitted daily reports.
        </p>

        {loading ? (
          <p style={styles.message}>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p style={styles.message}>
            No reports submitted yet.
          </p>
        ) : (
          <div style={styles.list}>
            {reports.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.top}>
                  <span>{item.report_date}</span>
                  <span>{item.hours_worked} hrs</span>
                </div>

                <p style={styles.task}>
                  {item.tasks_done}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

const styles = {
  panel: {
    padding: "24px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  title: {
    margin: 0,
    fontSize: "28px",
  },

  sub: {
    marginTop: "6px",
    color: "#94a3b8",
    fontSize: "14px",
    marginBottom: "22px",
  },

  message: {
    color: "#94a3b8",
    fontSize: "15px",
    marginTop: "14px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  card: {
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    color: "#22d3ee",
    fontSize: "14px",
    marginBottom: "10px",
    gap: "12px",
    flexWrap: "wrap",
  },

  task: {
    margin: 0,
    color: "white",
    lineHeight: "1.5",
  },
};

export default MyReports;