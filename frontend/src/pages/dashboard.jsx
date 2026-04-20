import { useEffect, useState } from "react";
import { getDashboardData } from "../services/analyticsService";
import AppLayout from "../components/AppLayout";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboardData();
      setData(res);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <AppLayout title="Manager Dashboard" role="Manager">
        <div style={styles.loading}>Loading dashboard...</div>
      </AppLayout>
    );
  }

  const pieData = [
    { name: "Submitted", value: data.submitted_today },
    { name: "Missing", value: data.missing_reports },
  ];

  const weeklyData = [
    { day: "Mon", reports: 8 },
    { day: "Tue", reports: 7 },
    { day: "Wed", reports: 9 },
    { day: "Thu", reports: 6 },
    { day: "Fri", reports: 8 },
  ];

  return (
    <AppLayout title="Manager Dashboard" role="Manager">
      {/* KPI */}
      <div style={styles.grid}>
        <Card title="Team Size" value={data.team_size} />
        <Card title="Submitted Today" value={data.submitted_today} />
        <Card title="Missing Reports" value={data.missing_reports} />
      </div>

      {/* Charts */}
      <div style={styles.chartGrid}>
        {/* PIE */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Submission Status</h3>
          <p style={styles.panelSub}>Today's completion overview</p>

          <div style={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  <Cell fill="#22d3ee" />
                  <Cell fill="#f87171" />
                </Pie>

                <Tooltip
                  contentStyle={styles.tooltip}
                  labelStyle={styles.tooltipLabel}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Weekly Reports</h3>
          <p style={styles.panelSub}>Team submissions trend</p>

          <div style={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyData}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                {/* 🔥 FIXED TOOLTIP ONLY */}
                <Tooltip
                  cursor={{ fill: "transparent" }}   // ❌ removes grey hover box
                  contentStyle={styles.tooltip}
                  labelStyle={styles.tooltipLabel}
                />

                {/* ✅ KEEP BROAD BARS */}
                <Bar
                  dataKey="reports"
                  fill="#22d3ee"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={styles.panel}>
    <div style={styles.panelHeader}>
      <div>
        <h3 style={styles.panelTitle}>Submitted Today</h3>
        <p style={styles.panelSub}>
          Employees who submitted reports
        </p>
      </div>

      <span style={styles.count}>
        {data.submitted_employees.length}
      </span>
    </div>

    {data.submitted_employees.length === 0 ? (
      <div style={styles.success}>
        No reports submitted yet.
      </div>
    ) : (
      <div style={styles.list}>
        {data.submitted_employees.map((name) => (
          <div key={name} style={styles.row}>
            <div>
              <p style={styles.name}>{name}</p>
              <p style={styles.sub}>Report received</p>
            </div>

            <span
              style={{
                ...styles.tag,
                color: "#22d3ee",
                background: "rgba(34,211,238,0.08)",
              }}
            >
              Submitted
            </span>
          </div>
        ))}
      </div>
    )}
  </div>

        {/* Pending */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <h3 style={styles.panelTitle}>Pending Submissions</h3>
              <p style={styles.panelSub}>
                Employees who haven’t submitted today
              </p>
            </div>

            <span style={styles.count}>
              {data.missing_employees.length}
            </span>
          </div>

          {data.missing_employees.length === 0 ? (
            <div style={styles.success}>
              All reports submitted for today.
            </div>
          ) : (
            <div style={styles.list}>
              {data.missing_employees.map((name) => (
                <div key={name} style={styles.row}>
                  <div>
                    <p style={styles.name}>{name}</p>
                    <p style={styles.sub}>Awaiting submission</p>
                  </div>

                  <span style={styles.tag}>Pending</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </AppLayout>
    );
  }

  function Card({ title, value }) {
    return (
      <div style={styles.card}>
        <p style={styles.cardTitle}>{title}</p>
        <h2 style={styles.cardValue}>{value}</h2>
      </div>
    );
  }

const styles = {
  loading: {
    padding: "40px",
    color: "#94a3b8",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px",
    marginBottom: "24px",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
    gap: "20px",
    marginBottom: "24px",
  },

  card: {
    padding: "22px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  cardTitle: {
    margin: 0,
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "10px",
  },

  cardValue: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "600",
  },

  panel: {
    padding: "24px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    marginBottom: "24px",
  },

  chartWrap: {
    marginTop: "12px",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  panelTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },

  panelSub: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#94a3b8",
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

  count: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#22d3ee",
  },

  success: {
    padding: "14px",
    borderRadius: "10px",
    background: "rgba(34,211,238,0.08)",
    color: "#22d3ee",
    fontSize: "14px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  row: {
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.04)",
  },

  name: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "500",
  },

  sub: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    color: "#94a3b8",
  },

  tag: {
    fontSize: "12px",
    color: "#f87171",
    background: "rgba(248,113,113,0.08)",
    padding: "6px 10px",
    borderRadius: "999px",
    fontWeight: "500",
  },
};

export default Dashboard;