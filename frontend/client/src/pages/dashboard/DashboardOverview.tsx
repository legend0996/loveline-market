import { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  Clock,
  Eye,
  DollarSign,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import { StatCard } from "../../components/ui/StatCard";
import { Spinner } from "../../components/ui/Spinner";
import API from "../../services/api";
import type { DashboardSummary } from "../../types";
import { useAuth } from "../../context/AuthContext";

const DashboardOverview = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/dashboard/summary")
      .then(({ data }) => setSummary(data))
      .catch(() => toast.error("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Points",
      value: summary?.totalPoints ?? 0,
      icon: <Star className="w-5 h-5" />,
      color: "bg-amber-50 text-amber-500",
    },
    {
      label: "Total Earnings",
      value: `KES ${((summary?.totalEarnings ?? summary?.totalViewEarnings) ?? 0).toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-green-50 text-green-500",
    },
    {
      label: "Approved Referrals",
      value: summary?.approvedReferrals ?? 0,
      icon: <Users className="w-5 h-5" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending Referrals",
      value: summary?.pendingReferrals ?? 0,
      icon: <Clock className="w-5 h-5" />,
      color: "bg-rose-50 text-rose-500",
    },
    {
      label: "Pending Views",
      value: summary?.pendingViews ?? 0,
      icon: <Eye className="w-5 h-5" />,
      color: "bg-purple-50 text-purple-500",
    },
    {
      label: "Earnings Trend",
      value: "+12%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-teal-50 text-teal-500",
      trend: "+12%",
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Good day, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here's a summary of your account activity.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            icon={s.icon}
            colorClass={s.color}
            trend={s.trend}
            trendUp={s.trendUp}
          />
        ))}
      </div>

      {/* Quick tips */}
      <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold text-lg mb-2">💡 Quick Tips</h3>
        <ul className="space-y-1.5 text-sm text-rose-100">
          <li>• Submit referral phone numbers to earn points per approval</li>
          <li>• Upload view screenshots with the view count for bonus earnings</li>
          <li>• Check the active poster section to know what content to promote</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
