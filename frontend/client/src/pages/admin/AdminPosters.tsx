import { useEffect, useState, useRef } from "react";
import { Upload, Trash2, Star, Edit3, ImageIcon, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import API from "../../services/api";
import type { Poster } from "../../types";

const AdminPosters = () => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [caption, setCaption] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [acting, setActing] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchPosters = () => {
    setLoading(true);
    API.get("/api/poster/all")
      .then(({ data }) => setPosters(data))
      .catch(() => toast.error("Failed to load posters."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPosters(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.error("Select an image first"); return; }
    if (!caption.trim()) { toast.error("Caption is required"); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("caption", caption);
      await API.post("/api/poster", fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Poster uploaded!");
      setUploadOpen(false);
      setFile(null);
      setPreview(null);
      setCaption("");
      fetchPosters();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleActivate = async (id: string) => {
    setActing(id + "activate");
    try {
      await API.post(`/api/poster/activate/${id}`);
      toast.success("Poster activated!");
      fetchPosters();
    } catch { toast.error("Failed to activate."); }
    finally { setActing(null); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this poster?")) return;
    setActing(id + "delete");
    try {
      await API.delete(`/api/poster/${id}`);
      toast.success("Poster deleted.");
      fetchPosters();
    } catch { toast.error("Failed to delete."); }
    finally { setActing(null); }
  };

  const openEdit = (poster: Poster) => {
    setSelectedPoster(poster);
    setNewCaption(poster.caption);
    setEditOpen(true);
  };

  const handleEditCaption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoster || !newCaption.trim()) return;
    setSubmitting(true);
    try {
      await API.put(`/api/poster/caption/${selectedPoster.id}`, { caption: newCaption });
      toast.success("Caption updated!");
      setEditOpen(false);
      fetchPosters();
    } catch { toast.error("Failed to update caption."); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Poster Management</h1>
          <p className="text-sm text-gray-500 mt-1">Upload and manage promotional posters.</p>
        </div>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setUploadOpen(true)}
        >
          Upload Poster
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : posters.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="w-8 h-8" />}
          title="No posters yet"
          description="Upload your first poster to get started."
          action={
            <Button onClick={() => setUploadOpen(true)} size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Upload Poster
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posters.map((p) => (
            <Card key={p.id} noPadding className="overflow-hidden">
              <div className="relative">
                {(p.isActive || p.active) && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="APPROVED">Active</Badge>
                  </div>
                )}
                <img
                  src={`${API_BASE}/${p.imageUrl}`}
                  alt="Poster"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Poster";
                  }}
                />
              </div>
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-700 line-clamp-2">{p.caption}</p>
                <div className="flex flex-wrap gap-2">
                  {!(p.isActive || p.active) && (
                    <Button
                      size="sm"
                      variant="secondary"
                      loading={acting === p.id + "activate"}
                      leftIcon={<Star className="w-3.5 h-3.5" />}
                      onClick={() => handleActivate(p.id)}
                    >
                      Activate
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                    onClick={() => openEdit(p)}
                    className="border border-gray-200"
                  >
                    Edit Caption
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    loading={acting === p.id + "delete"}
                    leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Upload modal */}
      <Modal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload New Poster">
        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <div
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-rose-300 hover:bg-rose-50/30 transition-all"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload className="w-8 h-8" />
                  <p className="text-sm"><span className="text-rose-500 font-semibold">Click to upload</span> image</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
          </div>
          <Input
            label="Caption"
            placeholder="Add a caption for this poster..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Button type="submit" fullWidth loading={submitting} leftIcon={<Upload className="w-4 h-4" />}>
            Upload Poster
          </Button>
        </form>
      </Modal>

      {/* Edit caption modal */}
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Caption">
        <form onSubmit={handleEditCaption} className="space-y-4">
          <Input
            label="New Caption"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            leftIcon={<Edit3 className="w-4 h-4" />}
          />
          <Button type="submit" fullWidth loading={submitting}>
            Update Caption
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPosters;
