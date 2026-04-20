import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/favicon.png";

function AppLayout({ title, children, role }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();

  const [glow, setGlow] = useState({
    top: 0.03,
    right: 0.03,
    bottom: 0.03,
    left: 0.03,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const user = {
    name: localStorage.getItem("username") || "User",
    role: role,
  };

  const isEmployeeSubPage =
    role === "Employee" &&
    (location.pathname === "/submit-report" ||
      location.pathname === "/my-reports");

  const goBack = () => {
    navigate("/employee-dashboard");
  };

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      setGlow({
        top: 0.02 + (1 - y) * 0.1,
        bottom: 0.02 + y * 0.1,
        left: 0.02 + (1 - x) * 0.1,
        right: 0.02 + x * 0.1,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navItems =
    role === "Manager"
      ? [{ label: "Dashboard", path: "/dashboard" }]
      : [
          { label: "Dashboard", path: "/employee-dashboard" },
          { label: "Submit Report", path: "/submit-report" },
          { label: "My Reports", path: "/my-reports" },
        ];

  return (
    <div
      style={{
        ...styles.page,
        background: `
          radial-gradient(140% 46% at 50% 0%, rgba(34,211,238,${
            glow.top * 0.6
          }), transparent 62%),
          radial-gradient(140% 46% at 50% 100%, rgba(34,211,238,${
            glow.bottom * 0.6
          }), transparent 62%),
          radial-gradient(46% 140% at 0% 50%, rgba(34,211,238,${
            glow.left * 0.6
          }), transparent 62%),
          radial-gradient(46% 140% at 100% 50%, rgba(34,211,238,${
            glow.right * 0.6
          }), transparent 62%),
          #020617
        `,
      }}
    >
      {open && <div style={styles.overlay} onClick={() => setOpen(false)} />}

      <aside
        style={{
          ...styles.sidebar,
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div style={styles.brandWrap}>
          <img src={logo} alt="FlowNexus" style={styles.sidebarLogo} />

          <div>
            <h2 style={styles.logo}>FlowNexus</h2>
            <p style={styles.roleText}>{role}</p>
          </div>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={styles.link}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.leftGroup}>
            <button
              style={styles.menuBtn}
              onClick={() => setOpen((p) => !p)}
            >
              ☰
            </button>

            <div>
              <h1 style={styles.title}>{title}</h1>
              <p style={styles.sub}>
                Smart workforce reporting system
              </p>
            </div>
          </div>

          <div style={styles.profileWrap} ref={profileRef}>
            <div
              style={styles.avatar}
              onClick={() => setProfileOpen((p) => !p)}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            {profileOpen && (
              <div style={styles.profileCard}>
                <p style={styles.profileName}>{user.name}</p>
                <p style={styles.profileRole}>{user.role}</p>

                <div style={styles.divider}></div>

                <button
                  onClick={logout}
                  style={styles.profileLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {isEmployeeSubPage && (
          <button style={styles.backBelow} onClick={goBack}>
            ← Back
          </button>
        )}

        {children}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 900,
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "250px",
    height: "100%",
    padding: "28px",
    background: "rgba(15,23,42,0.95)",
    backdropFilter: "blur(14px)",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    transition: "transform 0.35s ease",
    zIndex: 1000,
  },

  logo: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "6px",
  },

  roleText: {
    color: "#22d3ee",
    fontSize: "14px",
    marginBottom: "28px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
  },

  logout: {
    marginTop: "40px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#22d3ee",
    color: "#0f172a",
    fontWeight: "700",
    cursor: "pointer",
  },

  main: {
    padding: "30px",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "10px",
  },

  leftGroup: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  menuBtn: {
    fontSize: "24px",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
  },

  title: {
    margin: 0,
    fontSize: "32px",
  },

  sub: {
    color: "#94a3b8",
    marginTop: "4px",
    fontSize: "14px",
  },

  backBelow: {
    marginTop: "8px",
    marginBottom: "18px",
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    fontSize: "14px",
    cursor: "pointer",
    padding: 0,
  },

  profileWrap: {
    position: "relative",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "rgba(34,211,238,0.12)",
    color: "#22d3ee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    cursor: "pointer",
  },

  profileCard: {
    position: "absolute",
    top: "50px",
    right: 0,
    width: "180px",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(15,23,42,0.95)",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    zIndex: 1000,
  },

  profileName: {
    margin: 0,
    fontWeight: "600",
  },

  profileRole: {
    margin: "4px 0 8px 0",
    fontSize: "13px",
    color: "#94a3b8",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.06)",
    margin: "8px 0",
  },

  profileLogout: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    cursor: "pointer",
  },

  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px",
  },

  sidebarLogo: {
    width: "42px",
    height: "42px",
    objectFit: "contain",
    marginBottom: "30px",
  },
};


export default AppLayout;