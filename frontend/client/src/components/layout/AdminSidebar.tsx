import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  LayoutDashboard,
  Users,
  Eye,
  Image,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard",   path: "/admin-dashboard",           icon: LayoutDashboard },
  { label: "Referrals",   path: "/admin-dashboard/referrals", icon: Users },
  { label: "Views",       path: "/admin-dashboard/views",     icon: Eye },
  { label: "Posters",     path: "/admin-dashboard/posters",   icon: Image },
];

export const AdminSidebar = () => {
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin-login");
  };

  const sidebarContent = (
    <div
      className={`flex flex-col h-full transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100">
        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-400 flex items-center justify-center">
          <Heart className="w-4 h-4 text-white fill-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-gray-900 text-sm leading-tight">
            Admin Panel
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/admin-dashboard"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-rose-50 text-rose-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block relative">
        <aside className="flex flex-col bg-white border-r border-gray-100 h-screen sticky top-0 shadow-sm">
          {sidebarContent}
        </aside>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-500 hover:text-gray-700 hover:shadow-md transition-all"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`w-3 h-3 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-2xl bg-rose-500 text-white shadow-lg flex items-center justify-center"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 z-50 bg-white w-56 shadow-2xl flex flex-col animate-slide-up">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
};
