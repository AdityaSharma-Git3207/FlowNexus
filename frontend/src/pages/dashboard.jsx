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
      <div style={styles.page}>
        <div style={styles.grid}>
          <Card title="Team Size" value={data.team_size} />
          <Card title="Submitted Today" value={data.submitted_today} />
          <Card title="Missing Reports" value={data.missing_reports} />
        </div>

        <div style={styles.chartGrid}>
          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>Submission Status</h3>
            <p style={styles.panelSub}>Today's completion overview</p>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={82}
                  outerRadius={112}
                  paddingAngle={3}
                  dataKey="value"
                >
                  <Cell fill="#e7dcc7" />
                  <Cell fill="#2b2b2b" />
                </Pie>
                <Tooltip contentStyle={styles.tooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>Weekly Reports</h3>
            <p style={styles.panelSub}>Team submissions trend</p>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyData}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b8b8b", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={styles.tooltip}
                />
                <Bar
                  dataKey="reports"
                  fill="#e7dcc7"
                  radius={[12, 12, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Section
          title="Submitted Today"
          sub="Employees who submitted reports"
          count={data.submitted_employees.length}
          empty="No reports submitted yet."
          items={data.submitted_employees}
          tag="Submitted"
        />

        <Section
          title="Pending Submissions"
          sub="Employees who haven’t submitted today"
          count={data.missing_employees.length}
          empty="All reports submitted for today."
          items={data.missing_employees}
          tag="Pending"
          muted
        />
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

function Section({ title, sub, count, empty, items, tag, muted }) {
  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.panelTitle}>{title}</h3>
          <p style={styles.panelSub}>{sub}</p>
        </div>

        <span style={styles.count}>{count}</span>
      </div>

      {items.length === 0 ? (
        <div style={styles.empty}>{empty}</div>
      ) : (
        <div style={styles.list}>
          {items.map((name) => (
            <div key={name} style={styles.row}>
              <div>
                <p style={styles.name}>{name}</p>
                <p style={styles.small}>
                  {muted ? "Awaiting submission" : "Report received"}
                </p>
              </div>

              <span style={muted ? styles.tagMuted : styles.tag}>
                {tag}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    paddingBottom: "50px",
  },

  loading: {
    padding: "40px",
    color: "#8b8b8b",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "24px",
    marginBottom: "28px",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(430px,1fr))",
    gap: "24px",
    marginBottom: "28px",
  },

  card: {
    background: "#171717",
    border: "1px solid #262626",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.24)",
  },

  cardTitle: {
    margin: 0,
    fontSize: "13px",
    color: "#8d8d8d",
    marginBottom: "14px",
    letterSpacing: "0.3px",
  },

  cardValue: {
    margin: 0,
    fontSize: "54px",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: 1,
  },

  panel: {
    background: "#171717",
    border: "1px solid #262626",
    borderRadius: "24px",
    padding: "30px",
    marginBottom: "24px",
    boxShadow: "0 14px 34px rgba(0,0,0,0.22)",
  },

  panelTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.3px",
  },

  panelSub: {
    margin: "8px 0 20px",
    fontSize: "13px",
    color: "#8d8d8d",
  },

  tooltip: {
    background: "#111111",
    border: "1px solid #2a2a2a",
    borderRadius: "14px",
    color: "#ffffff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  count: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#e7dcc7",
  },

  empty: {
    padding: "18px",
    background: "#1e1e1e",
    borderRadius: "16px",
    fontSize: "14px",
    color: "#a1a1a1",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  row: {
    padding: "18px",
    border: "1px solid #262626",
    borderRadius: "18px",
    background: "#1d1d1d",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700",
    color: "#ffffff",
  },

  small: {
    margin: "5px 0 0",
    fontSize: "12px",
    color: "#8d8d8d",
  },

  tag: {
    background: "#e7dcc7",
    color: "#111111",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },

  tagMuted: {
    background: "#2a2a2a",
    color: "#f5f5f5",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },
};

export default Dashboard;