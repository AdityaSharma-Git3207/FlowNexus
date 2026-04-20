import { useState } from "react";
import { submitReport } from "../services/reportService";
import AppLayout from "../components/AppLayout";

function SubmitReport() {
  const [report_date, setDate] = useState("");
  const [tasks_done, setTasks] = useState("");
  const [hours_worked, setHours] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitReport({
        report_date,
        tasks_done,
        hours_worked,
      });

      alert("Report submitted successfully!");

      setDate("");
      setTasks("");
      setHours("");
    } catch {
      alert("Submission failed");
    }
  };

  return (
    <AppLayout title="Submit Report" role="Employee">
      <div style={styles.grid}>
        {/* Main Form */}
        <div style={styles.panel}>
          <p style={styles.tag}>Employee Workspace</p>
          <h1 style={styles.title}>Daily Report</h1>
          <p style={styles.sub}>
            Submit your completed work for today.
          </p>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Report Date</label>
            <input
              type="date"
              style={styles.input}
              value={report_date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label style={styles.label}>Tasks Completed</label>
            <textarea
              placeholder="Describe completed tasks, progress, blockers..."
              style={styles.textarea}
              value={tasks_done}
              onChange={(e) => setTasks(e.target.value)}
              required
            />

            <label style={styles.label}>Hours Worked</label>
            <input
              type="number"
              placeholder="e.g. 8"
              style={styles.input}
              value={hours_worked}
              onChange={(e) => setHours(e.target.value)}
              required
            />

            <button type="submit" style={styles.button}>
              Submit Report
            </button>
          </form>
        </div>

        {/* Side Info */}
        <div style={styles.sideWrap}>
          <div style={styles.sideCard}>
            <p style={styles.sideLabel}>Today's Focus</p>
            <h3 style={styles.sideTitle}>Consistent Reporting</h3>
            <p style={styles.sideText}>
              Daily updates help managers track progress,
              blockers, and delivery timelines.
            </p>
          </div>

          <div style={styles.sideCard}>
            <p style={styles.sideLabel}>Best Practice</p>
            <p style={styles.sideText}>
              Keep reports concise and outcome-based.
              Mention key tasks completed and any blockers.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
    alignItems: "start",
  },

  panel: {
    padding: "28px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
  },

  tag: {
    margin: 0,
    color: "#22d3ee",
    fontSize: "13px",
    fontWeight: "600",
  },

  title: {
    margin: "10px 0 8px 0",
    fontSize: "34px",
    fontWeight: "700",
  },

  sub: {
    margin: "0 0 24px 0",
    color: "#94a3b8",
    fontSize: "14px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "14px",
    fontSize: "14px",
    color: "#cbd5e1",
    fontWeight: "500",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    height: "160px",
    padding: "14px",
    resize: "vertical",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    marginTop: "22px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#22d3ee",
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },

  sideWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  sideCard: {
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  sideLabel: {
    margin: 0,
    color: "#22d3ee",
    fontSize: "13px",
    fontWeight: "600",
  },

  sideTitle: {
    margin: "10px 0",
    fontSize: "22px",
  },

  sideText: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "14px",
    lineHeight: "1.6",
  },
};

export default SubmitReport;