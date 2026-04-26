import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

type Referral = {
  id: string;
  phone: string;
  userId: string;
  status: string;
};

type ViewSubmission = {
  id: string;
  views: number;
  earnings: number;
  userId: string;
  status: string;
};

type Poster = {
  id: string;
  caption: string;
  image_url: string; // match backend
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [views, setViews] = useState<ViewSubmission[]>([]);
  const [posters, setPosters] = useState<Poster[]>([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin-login");
  }, [navigate]);

  // ================= FETCH =================
  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);

      const [refRes, viewRes, posterRes] = await Promise.all([
        API.get("/api/admin/referral/pending"),
        API.get("/api/admin/views"),
        API.get("/api/poster/all"),
      ]);

      setReferrals(refRes.data);
      setViews(viewRes.data);
      setPosters(posterRes.data);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ================= STATS =================
  const totalReferrals = referrals.length;
  const totalViews = views.length;
  const totalEarnings = views.reduce((sum, v) => sum + v.earnings, 0);

  // ================= SEARCH =================
  const filteredReferrals = referrals.filter(r =>
    r.phone.includes(search)
  );

  const filteredViews = views.filter(v =>
    v.views.toString().includes(search)
  );

  // ================= ACTIONS =================
  const approveReferral = async (id: string) => {
    await API.post(`/api/admin/referral/approve/${id}`);
    fetchAll();
  };

  const rejectReferral = async (id: string) => {
    await API.post(`/api/admin/referral/reject/${id}`);
    fetchAll();
  };

  const approveView = async (id: string) => {
    await API.post(`/api/admin/views/approve/${id}`);
    fetchAll();
  };

  const rejectView = async (id: string) => {
    await API.post(`/api/admin/views/reject/${id}`);
    fetchAll();
  };

  // ================= POSTER =================
  const uploadPoster = async () => {
    if (!file || !caption) {
      alert("Add caption & image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", file);

      await API.post("/api/poster", formData); // ✅ FIXED

      setCaption("");
      setFile(null);
      fetchAll();
    } catch (err) {
      alert("Upload failed");
    }
  };

  const deletePoster = async (id: string) => {
    try {
      await API.delete(`/api/poster/${id}`); // ✅ FIXED
      fetchAll();
    } catch {
      alert("Delete failed");
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Admin Dashboard</h1>

      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>

      {/* ================= STATS ================= */}
      <div style={{ marginBottom: 20 }}>
        <h2>📊 Stats</h2>
        <p>Total Referrals: {totalReferrals}</p>
        <p>Total Views: {totalViews}</p>
        <p>Total Earnings: KES {totalEarnings}</p>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, width: "100%" }}
      />

      {/* ================= REFERRALS ================= */}
      <h2>Pending Referrals</h2>
      {filteredReferrals.length === 0 && <p>No referrals</p>}

      {filteredReferrals.map((r) => (
        <div key={r.id}>
          {r.phone}
          <button onClick={() => approveReferral(r.id)}>Approve</button>
          <button onClick={() => rejectReferral(r.id)}>Reject</button>
        </div>
      ))}

      {/* ================= VIEWS ================= */}
      <h2 style={{ marginTop: 30 }}>View Submissions</h2>
      {filteredViews.length === 0 && <p>No views</p>}

      {filteredViews.map((v) => (
        <div key={v.id}>
          {v.views} — {v.earnings} KES
          <button onClick={() => approveView(v.id)}>Approve</button>
          <button onClick={() => rejectView(v.id)}>Reject</button>
        </div>
      ))}

      {/* ================= POSTERS ================= */}
      <h2 style={{ marginTop: 30 }}>Manage Posters</h2>

      <input
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) setFile(e.target.files[0]);
        }}
      />

      <button onClick={uploadPoster}>Upload Poster</button>

      <div style={{ marginTop: 20 }}>
        {posters.map((p) => (
          <div key={p.id} style={{ marginBottom: 15 }}>
            <img src={p.image_url} width={120} />
            <p>{p.caption}</p>

            <button onClick={() => deletePoster(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;