import { useEffect, useState, useRef } from "react";
import { Upload, Eye, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import API from "../../services/api";
import type { ViewSubmission } from "../../types";

const ViewsPage = () => {
  const [views, setViews] = useState("");
  const [viewsError, setViewsError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState<ViewSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchHistory = () => {
    API.get("/api/view/my")
      .then(({ data }) => setHistory(data))
      .catch(() => toast.error("Failed to load view submissions."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setFileError("Only image files are allowed");
      return;
    }
    setFileError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!file) { setFileError("Screenshot is required"); valid = false; }
    if (!views || isNaN(+views) || +views < 1) {
      setViewsError("Enter a valid number of views");
      valid = false;
    }
    if (!valid) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("screenshot", file!);
      fd.append("views", views);
      await API.post("/api/view/submit", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("View submission sent for review!");
      setFile(null);
      setPreview(null);
      setViews("");
      if (fileRef.current) fileRef.current.value = "";
      fetchHistory();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">View Submissions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload a screenshot as proof of engagement to earn rewards.
        </p>
      </div>

      {/* Submit form */}
      <Card>
        <h2 className="font-semibold text-gray-800 mb-5">Submit View Proof</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* File upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Screenshot
            </label>
            <div
              className={[
                "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer",
                "hover:border-rose-300 hover:bg-rose-50/50 transition-all duration-200",
                fileError ? "border-red-400" : "border-gray-200",
              ].join(" ")}
              onClick={() => fileRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
              aria-label="Upload screenshot"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-40 mx-auto rounded-lg object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <ImageIcon className="w-10 h-10" />
                  <p className="text-sm">
                    <span className="text-rose-500 font-semibold">Click to upload</span>{" "}
                    or drag & drop
                  </p>
                  <p className="text-xs">PNG, JPG up to 5MB</p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
                aria-hidden="true"
              />
            </div>
            {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
          </div>

          <Input
            label="Number of Views"
            type="number"
            placeholder="e.g. 500"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            error={viewsError}
            leftIcon={<Eye className="w-4 h-4" />}
            min="1"
          />

          <Button type="submit" loading={submitting} leftIcon={<Upload className="w-4 h-4" />}>
            Submit for Review
          </Button>
        </form>
      </Card>

      {/* History */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">
          Submission History{" "}
          <span className="text-gray-400 font-normal text-sm">({history.length})</span>
        </h2>
        <Card noPadding>
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : history.length === 0 ? (
            <EmptyState
              icon={<Eye className="w-8 h-8" />}
              title="No submissions yet"
              description="Upload your first view screenshot above."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Screenshot
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Views
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {history.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <img
                          src={`${API_BASE}/${v.screenshotUrl || v.screenshot || ""}`}
                          alt="Proof"
                          className="h-10 w-14 object-cover rounded-lg border border-gray-100"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {v.views?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={v.status}>{v.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {fmt(v.createdAt || v.created_at || new Date().toISOString())}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ViewsPage;
