import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        padding: "12px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#111",
        color: "#fff",
      }}
    >
      {/* LEFT - BRAND */}
      <h2 style={{ margin: 0 }}>Loveline</h2>

      {/* RIGHT - LINKS */}
      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>

        <Link
          to="/profile/login"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Login
        </Link>

        <Link
          to="/profile/register"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;