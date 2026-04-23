import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import logo from "../assets/favicon.png";

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
      <div style={styles.mesh}></div>
      <div style={styles.glowLeft}></div>
      <div style={styles.glowRight}></div>
      <div style={styles.glowTop}></div>
      <div style={styles.glowBottom}></div>
      <div style={styles.centerAura}></div>

      <div style={styles.card}>
        <div style={styles.brandRow}>
          <img src={logo} alt="logo" style={styles.logo} />

          <div>
            <p style={styles.tag}>Internal Ops Platform</p>
            <h1 style={styles.title}>FlowNexus</h1>
          </div>
        </div>

        <p style={styles.sub}>
          Premium workforce reporting platform for teams, managers and
          execution visibility.
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

          <button style={styles.button}>Access Workspace</button>
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
    padding: "24px",
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden",
    background: `
      radial-gradient(circle at center, rgba(255,255,255,0.02), transparent 34%),
      linear-gradient(135deg, #020202 0%, #050505 45%, #020202 100%)
    `,
  },

  mesh: {
    position: "absolute",
    inset: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(59,130,246,0.05), transparent 22%),
      radial-gradient(circle at 80% 20%, rgba(214,203,181,0.05), transparent 22%),
      radial-gradient(circle at 20% 80%, rgba(214,203,181,0.04), transparent 22%),
      radial-gradient(circle at 80% 80%, rgba(59,130,246,0.04), transparent 22%),
      radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02), transparent 30%)
    `,
  },

  glowLeft: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.05)",
    filter: "blur(180px)",
    left: "-140px",
    top: "50%",
    transform: "translateY(-50%)",
  },

  glowRight: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "rgba(214,203,181,0.05)",
    filter: "blur(180px)",
    right: "-140px",
    top: "50%",
    transform: "translateY(-50%)",
  },

  glowTop: {
    position: "absolute",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(214,203,181,0.035)",
    filter: "blur(160px)",
    top: "-180px",
    left: "50%",
    transform: "translateX(-50%)",
  },

  glowBottom: {
    position: "absolute",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.035)",
    filter: "blur(160px)",
    bottom: "-180px",
    left: "50%",
    transform: "translateX(-50%)",
  },

  centerAura: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "rgba(214,203,181,0.03)",
    filter: "blur(170px)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  card: {
    width: "100%",
    maxWidth: "470px",
    padding: "36px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.65)",
    backdropFilter: "blur(18px)",
    color: "white",
    position: "relative",
    zIndex: 2,
  },

  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "14px",
  },

  logo: {
    width: "54px",
    height: "54px",
    objectFit: "contain",
  },

  tag: {
    margin: 0,
    fontSize: "13px",
    letterSpacing: "0.6px",
    color: "#d6cbb5",
    fontWeight: "700",
  },

  title: {
    margin: "4px 0 0",
    fontSize: "44px",
    lineHeight: "1",
    fontWeight: "800",
    color: "#ffffff",
  },

  sub: {
    margin: "10px 0 28px",
    color: "#94a3b8",
    lineHeight: "1.7",
    fontSize: "15px",
  },

  input: {
    width: "100%",
    padding: "15px 16px",
    marginBottom: "14px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    outline: "none",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    marginTop: "4px",
    padding: "15px",
    borderRadius: "14px",
    border: "none",
    background: "#d6cbb5",
    color: "#050505",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 16px 40px rgba(214,203,181,0.18)",
  },

  demoBox: {
    marginTop: "24px",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  demoTitle: {
    margin: "0 0 14px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#d6cbb5",
    letterSpacing: "0.6px",
  },

  demoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "14px",
    marginBottom: "14px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },

  demoRowLast: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  role: {
    margin: 0,
    fontWeight: "700",
    fontSize: "15px",
    color: "#ffffff",
  },

  cred: {
    margin: "5px 0 0",
    fontSize: "13px",
    color: "#94a3b8",
  },

  demoBtn: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.03)",
    color: "#d6cbb5",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Login;