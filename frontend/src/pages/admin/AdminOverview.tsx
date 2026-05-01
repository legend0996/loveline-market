import { useEffect, useState } from "react";
import {
  Users,
  Eye,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { StatCard } from "../../components/ui/StatCard";
import { Spinner } from "../../components/ui/Spinner";
import API from "../../services/api";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    pendingReferrals: 0,
    totalViews: 0,
    pendingViews: 0,
    totalPosters: 0,
    estimatedEarnings: 0,
    uniqueUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      API.get("/api/admin/referral/pending"),
      API.get("/api/admin/view"),
      API.get("/api/poster/all"),
    ])
      .then(([referralsResult, viewsResult, postersResult]) => {
        const referrals = referralsResult.status === "fulfilled" ? referralsResult.value.data : [];
        const views = viewsResult.status === "fulfilled" ? viewsResult.value.data : [];
        const posters = postersResult.status === "fulfilled" ? postersResult.value.data : [];
        const uniqueUsers = new Set([
          ...referrals.map((item: any) => item.userId || item.user_id).filter(Boolean),
          ...views.map((item: any) => item.userId || item.user_id).filter(Boolean),
        ]).size;

        setStats({
          pendingReferrals: referrals.length,
          totalViews: views.length,
          pendingViews: views.filter((item: any) => item.status === "PENDING").length,
          totalPosters: posters.length,
          estimatedEarnings: views.reduce((sum: number, item: any) => sum + (item.earnings || 0), 0),
          uniqueUsers,
        });
      })
      .catch(() => toast.error("Failed to load admin stats."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  const cards = [
    { label: "Unique Users", value: stats.uniqueUsers, icon: <Users className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
    { label: "Pending Referrals", value: stats.pendingReferrals, icon: <CheckCircle2 className="w-5 h-5" />, color: "bg-green-50 text-green-600" },
    { label: "Queue Alerts", value: stats.pendingReferrals + stats.pendingViews, icon: <Clock className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
    { label: "All View Submissions", value: stats.totalViews, icon: <Eye className="w-5 h-5" />, color: "bg-purple-50 text-purple-600" },
    { label: "Pending Views", value: stats.pendingViews, icon: <XCircle className="w-5 h-5" />, color: "bg-rose-50 text-rose-600" },
    { label: "Estimated Earnings", value: `KES ${stats.estimatedEarnings.toLocaleString()}`, icon: <DollarSign className="w-5 h-5" />, color: "bg-teal-50 text-teal-600" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Platform overview and system stats.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <StatCard
            key={c.label}
            label={c.label}
            value={c.value}
            icon={c.icon}
            colorClass={c.color}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
