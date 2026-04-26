import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminVerify = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const email = new URLSearchParams(window.location.search).get("email");

  const handleVerify = async () => {
    try {
      const res = await API.post("/api/admin/verify-otp", {
        email,
        code,
      });

      // ✅ save token
      localStorage.setItem("adminToken", res.data.token);

      alert("Login successful");

      // ✅ REACT REDIRECT (NO RELOAD)
      navigate("/admin-dashboard");

    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Enter OTP</h2>

      <input
        placeholder="OTP code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default AdminVerify;