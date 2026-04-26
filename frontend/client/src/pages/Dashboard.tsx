import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

type Referral = {
  id: string;
  phone: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

type ViewSubmission = {
  id: string;
  views: number;
  earnings: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

type Summary = {
  totalPoints: number;
  pendingReferrals: number;
  approvedReferrals: number;
  totalViewEarnings: number;
  pendingViews: number;
};

const Dashboard = () => {
  const [phone, setPhone] = useState<string>("");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [views, setViews] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [viewList, setViewList] = useState<ViewSubmission[]>([]);

  const [summary, setSummary] = useState<Summary>({
    totalPoints: 0,
    pendingReferrals: 0,
    approvedReferrals: 0,
    totalViewEarnings: 0,
    pendingViews: 0,
  });

  const fetchReferrals = useCallback(async () => {
    try {
      const res = await API.get("/api/referral/my");
      setReferrals(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchViews = useCallback(async () => {
    try {
      const res = await API.get("/api/view/my");
      setViewList(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await API.get("/api/dashboard/summary");
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchReferrals();
    fetchViews();
    fetchSummary();
  }, [fetchReferrals, fetchViews, fetchSummary]);

  const submitReferral = async () => {
    try {
      await API.post("/api/referral/submit", { phone });
      setPhone("");
      fetchReferrals();
      fetchSummary();
    } catch (err) {
      console.error(err);
    }
  };

  const submitView = async () => {
    if (!file) {
      alert("Upload screenshot first");
      return;
    }

    const formData = new FormData();
    formData.append("views", views);
    formData.append("screenshot", file);

    try {
      const res = await API.post("/api/view/submit", formData);
      alert(res.data.message);

      setViews("");
      setFile(null);

      fetchViews();
      fetchSummary();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      {/* SUMMARY */}
      <div
        style={{
          background: "#111",
          color: "white",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <h2>📊 Summary</h2>
        <p>⭐ Total Points: {summary.totalPoints}</p>
        <p>⏳ Pending Referrals: {summary.pendingReferrals}</p>
        <p>✅ Approved Referrals: {summary.approvedReferrals}</p>

        <hr />

        <p>💰 View Earnings: KES {summary.totalViewEarnings}</p>
        <p>⏳ Pending Views: {summary.pendingViews}</p>
      </div>

      {/* REFERRALS */}
      <h2>Referrals</h2>

      <input
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={submitReferral}>Submit</button>

      {referrals.map((ref) => (
        <div key={ref.id}>
          {ref.phone} —{" "}
          <span
            style={{
              color:
                ref.status === "APPROVED"
                  ? "green"
                  : ref.status === "REJECTED"
                  ? "red"
                  : "orange",
            }}
          >
            {ref.status}
          </span>
        </div>
      ))}

      {/* VIEWS */}
      <h2 style={{ marginTop: 30 }}>View Submission</h2>

      <input
        type="number"
        placeholder="Enter views"
        value={views}
        onChange={(e) => setViews(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button onClick={submitView}>Submit Views</button>

      <h3>Your Submissions</h3>

      {viewList.map((v) => (
        <div key={v.id}>
          {v.views} views — {v.earnings} KES —{" "}
          <span
            style={{
              color:
                v.status === "APPROVED"
                  ? "green"
                  : v.status === "REJECTED"
                  ? "red"
                  : "orange",
            }}
          >
            {v.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;