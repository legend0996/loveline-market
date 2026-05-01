import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Eye, Search, ZoomIn } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import API from "../../services/api";
import type { ViewSubmission } from "../../types";

const AdminViews = () => {
  const [views, setViews] = useState<ViewSubmission[]>([]);
  const [filtered, setFiltered] = useState<ViewSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [acting, setActing] = useState<string | null>(null);
  const [preview, setPreview] = useState<ViewSubmission | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetch = () => {
    setLoading(true);
    API.get("/api/admin/view")
      .then(({ data }) => {
        setViews(data);
        setFiltered(data);
      })
      .catch(() => toast.error("Failed to load views."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      views.filter(
        (v) =>
          (v.user?.name || "").toLowerCase().includes(q) ||
          (v.user?.email || "").toLowerCase().includes(q)
      )
    );
  }, [search, views]);

  const act = async (id: string, action: "approve" | "reject") => {
    setActing(id + action);
    try {
      await API.post(`/api/admin/view/${action}/${id}`);
      toast.success(`View submission ${action}d!`);
      fetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Action failed.");
    } finally {
      setActing(null);
    }
  };

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-KE", {
      day: "2-digit", month: "short", year: "numeric",
    });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">View Submissions</h1>
          <p className="text-sm text-gray-500 mt-1">Review uploaded screenshots and approve.</p>
        </div>
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <Card noPadding>
        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Eye className="w-8 h-8" />}
            title="No view submissions"
            description={search ? "No results for your search." : "No pending view submissions."}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["User", "Screenshot", "Views", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{v.user?.name || "—"}</p>
                        <p className="text-xs text-gray-400">{v.user?.email || "—"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setPreview(v)}
                        className="relative group"
                        aria-label="View screenshot"
                      >
                        <img
                          src={`${API_BASE}/${v.screenshotUrl || v.screenshot || ""}`}
                          alt="Proof"
                          className="h-12 w-16 object-cover rounded-lg border border-gray-100 group-hover:opacity-80 transition-opacity"
                        />
                        <ZoomIn className="absolute inset-0 m-auto w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {v.views?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{fmt(v.createdAt || v.created_at || new Date().toISOString())}</td>
                    <td className="px-6 py-4">
                      <Badge variant={v.status}>{v.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          loading={acting === v.id + "approve"}
                          disabled={!!acting}
                          leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          onClick={() => act(v.id, "approve")}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          loading={acting === v.id + "reject"}
                          disabled={!!acting}
                          leftIcon={<XCircle className="w-3.5 h-3.5" />}
                          onClick={() => act(v.id, "reject")}
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

      {/* Screenshot preview modal */}
      <Modal
        isOpen={!!preview}
        onClose={() => setPreview(null)}
        title="Screenshot Preview"
        size="lg"
      >
        {preview && (
          <div className="space-y-4">
            <img
              src={`${API_BASE}/${preview.screenshotUrl || preview.screenshot || ""}`}
              alt="Full screenshot"
              className="w-full rounded-xl border border-gray-100 object-contain max-h-[60vh]"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="primary"
                loading={acting === preview.id + "approve"}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => { act(preview.id, "approve"); setPreview(null); }}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                loading={acting === preview.id + "reject"}
                leftIcon={<XCircle className="w-4 h-4" />}
                onClick={() => { act(preview.id, "reject"); setPreview(null); }}
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminViews;
