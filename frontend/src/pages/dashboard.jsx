import { useEffect, useState } from "react";
import { getDashboardData } from "../services/analyticsService";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h1>FlowNexus Dashboard</h1>

      <h3>Dashboard Data:</h3>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;