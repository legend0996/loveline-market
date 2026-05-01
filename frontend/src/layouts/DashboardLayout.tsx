import { Outlet } from "react-router-dom";
import { UserSidebar } from "../components/layout/UserSidebar";

const DashboardLayout = () => (
  <div className="flex h-screen overflow-hidden bg-gray-50">
    <UserSidebar />
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </div>
    </div>
  </div>
);

export default DashboardLayout;
