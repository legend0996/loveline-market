import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Phone, Search } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import API from "../../services/api";
import type { Referral } from "../../types";

const AdminReferrals = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [filtered, setFiltered] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [acting, setActing] = useState<string | null>(null);

  const fetch = () => {
    setLoading(true);
    API.get("/api/admin/referral/pending")
      .then(({ data }) => {
        setReferrals(data);
        setFiltered(data);
      })
      .catch(() => toast.error("Failed to load referrals."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      referrals.filter(
        (r) =>
          r.phone.includes(q) ||
          (r.user?.name || "").toLowerCase().includes(q) ||
          (r.user?.email || "").toLowerCase().includes(q)
      )
    );
  }, [search, referrals]);

  const act = async (id: string, action: "approve" | "reject") => {
    setActing(id + action);
    try {
      await API.post(`/api/admin/referral/${action}/${id}`);
      toast.success(`Referral ${action}d!`);
      fetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Action failed.");
    } finally {
      setActing(null);
    }
  };

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and action pending referral submissions.
          </p>
        </div>
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search phone or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <Card noPadding>
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Phone className="w-8 h-8" />}
            title="No pending referrals"
            description={search ? "No results match your search." : "All referrals have been reviewed."}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["User", "Phone", "Date", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {r.user?.name || "—"}
                        </p>
                        <p className="text-xs text-gray-400">{r.user?.email || "—"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {r.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {fmt(r.createdAt || r.created_at || new Date().toISOString())}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={r.status}>{r.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          loading={acting === r.id + "approve"}
                          disabled={!!acting}
                          leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          onClick={() => act(r.id, "approve")}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          loading={acting === r.id + "reject"}
                          disabled={!!acting}
                          leftIcon={<XCircle className="w-3.5 h-3.5" />}
                          onClick={() => act(r.id, "reject")}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminReferrals;
