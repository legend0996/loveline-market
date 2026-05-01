import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, Menu, X, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { user, token, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/profile/login");
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path.startsWith("/#")) {
      e.preventDefault();
      const id = path.slice(2);
      const scrollToEl = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(scrollToEl, 100);
      } else {
        scrollToEl();
      }
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Data Offers", path: "/#data-offers" },
    { label: "Earn", path: "/#hero" },
    { label: "How It Works", path: "/#how-it-works" },
    { label: "Contact", path: "/#contact" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-400 flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Loveline
              <span className="text-rose-500">Market</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={(e) => handleNavClick(e, l.path)}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === l.path
                    ? "text-rose-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {token && user ? (
              <>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors relative">
                  <Bell className="w-5 h-5" />
                </button>
                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {dropOpen && (
                    <div
                      className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fade-in"
                      onMouseLeave={() => setDropOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/profile/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/profile/register"
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2 animate-slide-up">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={(e) => handleNavClick(e, l.path)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {token ? (
            <button
              onClick={handleLogout}
              className="block py-2 text-sm font-medium text-red-500 w-full text-left"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link to="/profile/login" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-700">
                Sign in
              </Link>
              <Link
                to="/profile/register"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-rose-600"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
