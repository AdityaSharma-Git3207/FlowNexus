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
        hours_worked: Number(hours_worked),
      });

      alert("Report submitted successfully!");

      setDate("");
      setTasks("");
      setHours("");
    } catch (error) {
      console.log(error.response?.data || error);
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
            Submit completed work, blockers and progress for today.
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

        {/* Side Cards */}
        <div style={styles.sideWrap}>
          <div style={styles.sideCard}>
            <p style={styles.sideLabel}>Today's Focus</p>
            <h3 style={styles.sideTitle}>Consistent Reporting</h3>
            <p style={styles.sideText}>
              Daily updates help managers track execution,
              blockers, and delivery timelines.
            </p>
          </div>

          <div style={styles.sideCard}>
            <p style={styles.sideLabel}>Best Practice</p>
            <p style={styles.sideText}>
              Keep reports concise and outcome-driven.
              Mention key wins and blockers clearly.
            </p>
          </div>

          <div style={styles.sideCard}>
            <p style={styles.sideLabel}>Reminder</p>
            <p style={styles.sideText}>
              Strong reporting builds trust, visibility,
              and ownership across teams.
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
    gap: "26px",
    alignItems: "start",
  },

  panel: {
    padding: "34px",
    borderRadius: "28px",
    background: "#121212",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
  },

  tag: {
    margin: 0,
    color: "#e7dcc7",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },

  title: {
    margin: "12px 0 10px",
    fontSize: "42px",
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: 1,
  },

  sub: {
    margin: "0 0 26px",
    color: "#9ca3af",
    fontSize: "14px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "18px",
    fontSize: "14px",
    color: "#d4d4d4",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "16px",
    border: "1px solid #2a2a2a",
    background: "#181818",
    color: "white",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "190px",
    padding: "16px",
    resize: "vertical",
    borderRadius: "16px",
    border: "1px solid #2a2a2a",
    background: "#181818",
    color: "white",
    fontSize: "14px",
    outline: "none",
    lineHeight: "1.6",
  },

  button: {
    width: "100%",
    marginTop: "26px",
    padding: "16px",
    borderRadius: "18px",
    border: "none",
    background: "#e7dcc7",
    color: "#111111",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(231,220,199,0.12)",
  },

  sideWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  sideCard: {
    padding: "24px",
    borderRadius: "24px",
    background: "#121212",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 14px 32px rgba(0,0,0,0.24)",
  },

  sideLabel: {
    margin: 0,
    color: "#e7dcc7",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },

  sideTitle: {
    margin: "12px 0 10px",
    fontSize: "26px",
    fontWeight: "800",
    color: "#ffffff",
  },

  sideText: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "14px",
    lineHeight: "1.7",
  },
};

export default SubmitReport;