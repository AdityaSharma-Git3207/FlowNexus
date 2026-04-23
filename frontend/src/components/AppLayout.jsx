import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/favicon.png";

function AppLayout({ title, children, role }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const user = {
    name: localStorage.getItem("username") || "User",
    role,
  };

  const isEmployeeSubPage =
    role === "Employee" &&
    (location.pathname === "/submit-report" ||
      location.pathname === "/my-reports");

  const goBack = () => navigate("/employee-dashboard");

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
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
    <div style={styles.page}>
      {open && <div style={styles.overlay} onClick={() => setOpen(false)} />}

      <aside
        style={{
          ...styles.sidebar,
          transform: open
            ? "translateX(0)"
            : "translateX(-100%)",
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
                Smart workforce reporting platform
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
                  style={styles.profileLogout}
                  onClick={logout}
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
    background:
      "radial-gradient(circle at top right, rgba(231,220,199,0.03), transparent 30%), #090909",
    color: "#ffffff",
    fontFamily: "Inter, sans-serif",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 900,
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "290px",
    height: "100%",
    padding: "30px",
    background: "#111111",
    borderRight: "1px solid #232323",
    transition: "transform 0.28s ease",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
  },

  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "40px",
  },

  sidebarLogo: {
    width: "42px",
    height: "42px",
  },

  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "800",
  },

  roleText: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#8d8d8d",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  link: {
    textDecoration: "none",
    color: "#f5f5f5",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "#171717",
    border: "1px solid #262626",
    fontWeight: "600",
  },

  logout: {
    marginTop: "auto",
    padding: "14px",
    borderRadius: "14px",
    background: "#e7dcc7",
    color: "#111",
    fontWeight: "700",
    cursor: "pointer",
  },

  main: {
    padding: "34px 42px",
    maxWidth: "1500px",
    margin: "0 auto",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "26px",
    gap: "20px",
  },

  leftGroup: {
    display: "flex",
    alignItems: "flex-start",
    gap: "18px",
  },

  menuBtn: {
    fontSize: "24px",
    background: "#141414",
    color: "#e7dcc7",
    border: "1px solid #272727",
    borderRadius: "18px",
    padding: "12px 16px",
    cursor: "pointer",
  },

  title: {
    margin: 0,
    fontSize: "52px",
    fontWeight: "900",
    lineHeight: 1.05,
    letterSpacing: "-1px",
  },

  sub: {
    margin: "10px 0 0 2px",
    fontSize: "15px",
    color: "#9f9f9f",
  },

  profileWrap: {
    position: "relative",
  },

  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#e7dcc7",
    color: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 0 28px rgba(231,220,199,0.18)",
  },

  profileCard: {
    position: "absolute",
    top: "66px",
    right: 0,
    width: "220px",
    padding: "16px",
    borderRadius: "18px",
    background: "#161616",
    border: "1px solid #2a2a2a",
    zIndex: 1000,
  },

  profileName: {
    margin: 0,
    fontWeight: "700",
  },

  profileRole: {
    margin: "6px 0 12px",
    fontSize: "13px",
    color: "#8f8f8f",
  },

  divider: {
    height: "1px",
    background: "#262626",
    marginBottom: "12px",
  },

  profileLogout: {
    width: "100%",
    padding: "12px",
    borderRadius: "14px",
    background: "#e7dcc7",
    color: "#111",
    fontWeight: "700",
    cursor: "pointer",
  },

  backBelow: {
    marginBottom: "20px",
    background: "transparent",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    padding: 0,
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default AppLayout;