import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

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

      console.log("Login success:", data);

      navigate("/submit-report");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div>
      <h2>FlowNexus Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;