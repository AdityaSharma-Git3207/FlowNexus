import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import logo from "../assets/favicon.png"; // 👈 your logo file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      if (username === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch {
      alert("Invalid credentials");
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
        
        {/* 🔥 BRAND ROW */}
        <div style={styles.brandRow}>
          <img src={logo} alt="logo" style={styles.logo} />

          <div>
            <p style={styles.tag}>Internal Ops Platform</p>
            <h1 style={styles.title}>FlowNexus</h1>
          </div>
        </div>

        <p style={styles.sub}>
          Smart employee reporting & team intelligence
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

          <button style={styles.button}>
            Access Workspace
          </button>
        </form>

        {/* Demo Access */}
        <div style={styles.demoBox}>
          <p style={styles.demoTitle}>Demo Access</p>

          <div style={styles.demoRow}>
            <div>
              <p style={styles.role}>Manager</p>
              <p style={styles.cred}>admin / adminlogin</p>
            </div>

            <button style={styles.demoBtn} onClick={fillManager} type="button">
              Use
            </button>
          </div>

          <div style={styles.demoRow}>
            <div>
              <p style={styles.role}>Employee</p>
              <p style={styles.cred}>employee1 / employee123</p>
            </div>

            <button style={styles.demoBtn} onClick={fillEmployee} type="button">
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
    background:
      "radial-gradient(circle at top right, #1e3a8a, #020617 55%)",
    fontFamily: "Inter, sans-serif",
    color: "white",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "440px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "32px",
    backdropFilter: "blur(16px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },

  /* 🔥 NEW */
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "10px",
  },

  logo: {
    width: "48px",
    height: "48px",
    objectFit: "contain",
  },

  tag: {
    color: "#22d3ee",
    fontSize: "14px",
    margin: 0,
  },

  title: {
    fontSize: "36px",
    fontWeight: "700",
    margin: "2px 0 0 0",
  },

  sub: {
    color: "#94a3b8",
    marginBottom: "28px",
    lineHeight: "1.5",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    outline: "none",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#22d3ee",
    color: "#0f172a",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "6px",
    fontSize: "15px",
  },

  demoBox: {
    marginTop: "22px",
    padding: "18px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  demoTitle: {
    margin: "0 0 14px 0",
    fontSize: "14px",
    color: "#22d3ee",
    fontWeight: "600",
  },

  demoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },

  role: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
  },

  cred: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#94a3b8",
  },

  demoBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(34,211,238,0.12)",
    color: "#22d3ee",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Login;