import AppLayout from "../components/AppLayout";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

function EmployeeDashboard() {
  const weeklyData = [
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 7 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 6 },
    { day: "Fri", hours: 7 },
  ];

  return (
    <AppLayout title="Employee Dashboard" role="Employee">
      {/* Top Actions */}
      <div style={styles.topActions}>
        <Link to="/submit-report" style={styles.primaryBtn}>
          Submit Today's Report
        </Link>

        <Link to="/my-reports" style={styles.secondaryBtn}>
          View My Reports
        </Link>
      </div>

      {/* KPI Cards */}
      <div style={styles.grid}>
        <Card title="Today's Status" value="Pending" />
        <Card title="Reports This Week" value="4" />
        <Card title="Hours Logged" value="32h" />
      </div>

      {/* Weekly Activity */}
      <div style={styles.panel}>
        <h3 style={styles.heading}>Weekly Activity</h3>
        <p style={styles.sub}>Your working hours this week</p>

        <div style={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={weeklyData}>
              <XAxis
                dataKey="day"
                tick={{ fill: "#8f8a80", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={styles.tooltip}
                labelStyle={styles.tooltipLabel}
              />

              <Bar
                dataKey="hours"
                fill="#e7dcc7"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.panel}>
        <h3 style={styles.heading}>Recent Activity</h3>

        <div style={styles.row}>
          <strong>Yesterday Report Submitted</strong>
          <p style={styles.rowText}>Logged successfully.</p>
        </div>

        <div style={styles.row}>
          <strong>7.5 Hours Worked</strong>
          <p style={styles.rowText}>Good productivity day.</p>
        </div>

        <div style={styles.row}>
          <strong>5 Day Streak</strong>
          <p style={styles.rowText}>Consistent submissions.</p>
        </div>
      </div>
    </AppLayout>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{title}</p>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

const styles = {
  topActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 14,
    marginBottom: 26,
    flexWrap: "wrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 22,
    marginBottom: 28,
  },

  card: {
    padding: 28,
    borderRadius: 24,
    background: "#121212",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.28)",
  },

  label: {
    color: "#8f8a80",
    fontSize: 13,
    margin: 0,
  },

  value: {
    margin: "14px 0 0",
    fontSize: 46,
    lineHeight: 1,
    fontWeight: 800,
    color: "#f5f5f5",
  },

  panel: {
    padding: 30,
    borderRadius: 28,
    background: "#121212",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 14px 32px rgba(0,0,0,0.28)",
    marginBottom: 28,
  },

  heading: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    color: "#ffffff",
  },

  sub: {
    margin: "8px 0 0",
    color: "#8f8a80",
    fontSize: 13,
  },

  chartWrap: {
    marginTop: 22,
  },

  tooltip: {
    background: "#1b1b1b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "13px",
  },

  tooltipLabel: {
    color: "#8f8a80",
  },

  primaryBtn: {
    textDecoration: "none",
    padding: "14px 20px",
    borderRadius: 14,
    background: "#e7dcc7",
    color: "#111",
    fontWeight: 700,
    fontSize: 14,
  },

  secondaryBtn: {
    textDecoration: "none",
    padding: "14px 20px",
    borderRadius: 14,
    background: "#181818",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#f5f5f5",
    fontWeight: 600,
    fontSize: 14,
  },

  row: {
    padding: 18,
    borderRadius: 18,
    background: "#191919",
    marginTop: 14,
    border: "1px solid rgba(255,255,255,0.05)",
  },

  rowText: {
    margin: "7px 0 0",
    color: "#8f8a80",
    fontSize: 13,
  },
};

export default EmployeeDashboard;