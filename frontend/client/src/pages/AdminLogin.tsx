import { useState } from "react";
import API from "../services/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/api/admin/login", {
        email,
        password,
      });

      alert(res.data.message);

      // move to OTP page
      window.location.href = `/admin-verify?email=${email}`;
    } catch (err: unknown) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;