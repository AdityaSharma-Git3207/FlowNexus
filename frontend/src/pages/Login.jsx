import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import logo from "../assets/favicon.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(username.trim(), password);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      if (username.trim().toLowerCase() === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      console.error("SERVER RESPONSE:", error?.response?.data);

      alert(
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fillManager = () => {
    setUsername("admin");
    setPassword("adminlogin");
  };

  const fillEmployee = () => {
    setUsername("employee1");
    setPassword("employee123");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brandRow}>
          <img src={logo} alt="logo" style={styles.logo} />
          <div>
            <p style={styles.tag}>Internal Ops Platform</p>
            <h1 style={styles.title}>FlowNexus</h1>
          </div>
        </div>

        <p style={styles.sub}>
          Premium workforce reporting platform for teams, managers and execution visibility.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing In..." : "Access Workspace"}
          </button>
        </form>

        <div style={styles.demoBox}>
          <p style={styles.demoTitle}>Quick Demo Access</p>

          <div style={styles.demoRow}>
            <div>
              <p style={styles.role}>Manager</p>
              <p style={styles.cred}>admin / adminlogin</p>
            </div>

            <button type="button" style={styles.demoBtn} onClick={fillManager}>
              Use
            </button>
          </div>

          <div style={styles.demoRowLast}>
            <div>
              <p style={styles.role}>Employee</p>
              <p style={styles.cred}>employee1 / employee123</p>
            </div>

            <button type="button" style={styles.demoBtn} onClick={fillEmployee}>
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    background: "#050505",
  },

  card: {
    width: "100%",
    maxWidth: 470,
    padding: 36,
    borderRadius: 28,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    color: "white",
  },

  brandRow: {
    display: "flex",
    gap: 14,
    alignItems: "center",
  },

  logo: {
    width: 54,
    height: 54,
  },

  tag: {
    margin: 0,
    color: "#d6cbb5",
    fontSize: 13,
    fontWeight: 700,
  },

  title: {
    margin: "4px 0 0",
    fontSize: 44,
    fontWeight: 800,
  },

  sub: {
    color: "#94a3b8",
    lineHeight: 1.6,
  },

  input: {
    width: "100%",
    padding: 15,
    marginBottom: 14,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
  },

  button: {
    width: "100%",
    padding: 15,
    borderRadius: 14,
    border: "none",
    background: "#d6cbb5",
    fontWeight: 800,
    cursor: "pointer",
  },

  demoBox: {
    marginTop: 24,
    padding: 18,
    borderRadius: 18,
    background: "rgba(255,255,255,0.025)",
  },

  demoTitle: {
    color: "#d6cbb5",
    fontWeight: 700,
    fontSize: 13,
  },

  demoRow: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 14,
    marginBottom: 14,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },

  demoRowLast: {
    display: "flex",
    justifyContent: "space-between",
  },

  role: {
    margin: 0,
    fontWeight: 700,
  },

  cred: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: 13,
  },

  demoBtn: {
    padding: "10px 16px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    color: "#d6cbb5",
    border: "1px solid rgba(255,255,255,0.06)",
  },
};

export default Login;