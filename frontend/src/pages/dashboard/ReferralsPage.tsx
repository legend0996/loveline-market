import { useEffect, useState } from "react";
import { Phone, Send } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { Table } from "../../components/ui/Table";
import API from "../../services/api";
import type { Referral } from "../../types";

const ReferralsPage = () => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReferrals = () => {
    API.get("/api/referral/my")
      .then(({ data }) => setReferrals(data))
      .catch(() => toast.error("Failed to load referrals."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\+?[\d\s-]{7,15}$/.test(phone)) {
      setPhoneError("Enter a valid phone number");
      return;
    }
    setPhoneError("");
    setSubmitting(true);
    try {
      await API.post("/api/referral/submit", { phone });
      toast.success("Referral submitted! Awaiting admin approval.");
      setPhone("");
      fetchReferrals();
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

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
        <p className="text-sm text-gray-500 mt-1">
          Submit a phone number to earn points per approved referral.
        </p>
      </div>

      {/* Submit form */}
      <Card>
        <h2 className="font-semibold text-gray-800 mb-4">Submit a Referral</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="tel"
              placeholder="+254 700 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={phoneError}
              leftIcon={<Phone className="w-4 h-4" />}
              aria-label="Referral phone number"
            />
          </div>
          <Button
            type="submit"
            loading={submitting}
            leftIcon={<Send className="w-4 h-4" />}
            className="h-fit self-start sm:self-end"
          >
            Submit
          </Button>
        </form>
      </Card>

      {/* History */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-4">
          Your Referrals{" "}
          <span className="text-gray-400 font-normal text-sm">({referrals.length})</span>
        </h2>
        <Card noPadding>
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : referrals.length === 0 ? (
            <EmptyState
              icon={<Phone className="w-8 h-8" />}
              title="No referrals yet"
              description="Submit a phone number above to get started."
            />
          ) : (
            <Table
              data={referrals}
              rowKey={(row) => row.id}
              columns={[
                {
                  key: "phone",
                  header: "Phone",
                  render: (row) => (
                    <span className="text-sm font-medium text-gray-800">{row.phone}</span>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  render: (row) => <Badge variant={row.status}>{row.status}</Badge>,
                },
                {
                  key: "date",
                  header: "Date",
                  render: (row) => (
                    <span className="text-sm text-gray-500">
                      {fmt(row.createdAt || row.created_at || new Date().toISOString())}
                    </span>
                  ),
                },
              ]}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default ReferralsPage;
