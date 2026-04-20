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

      {/* KPI */}
      <div style={styles.grid}>
        <Card title="Today's Status" value="Pending" />
        <Card title="Reports This Week" value="4" />
        <Card title="Hours Logged" value="32h" />
      </div>

      {/* Chart */}
      <div style={styles.panel}>
        <h3 style={styles.heading}>Weekly Activity</h3>
        <p style={styles.sub}>Your working hours this week</p>

        <div style={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <XAxis
                dataKey="day"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
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
                fill="#22d3ee"
                radius={[6, 6, 0, 0]}
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
    gap: 12,
    marginBottom: 24,
    flexWrap: "wrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 20,
    marginBottom: 24,
  },

  card: {
    padding: 24,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  label: {
    color: "#94a3b8",
    fontSize: 13,
    margin: 0,
  },

  value: {
    margin: "10px 0 0",
    fontSize: 32,
  },

  panel: {
    padding: 24,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    marginBottom: 24,
  },

  heading: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
  },

  sub: {
    margin: "6px 0 0",
    color: "#94a3b8",
    fontSize: 13,
  },

  chartWrap: {
    marginTop: 14,
  },

  tooltip: {
    background: "#0f172a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "white",
    fontSize: "13px",
  },

  tooltipLabel: {
    color: "#94a3b8",
  },

  primaryBtn: {
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: 10,
    background: "#22d3ee",
    color: "#0f172a",
    fontWeight: 600,
  },

  secondaryBtn: {
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "white",
  },

  row: {
    padding: 14,
    borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    marginTop: 12,
  },

  rowText: {
    margin: "6px 0 0",
    color: "#94a3b8",
    fontSize: 13,
  },
};

export default EmployeeDashboard;