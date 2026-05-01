import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const AdminVerifyPage = () => {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputs = useRef<HTMLInputElement[]>([]);

  const email = sessionStorage.getItem("adminEmail") || "";

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Enter the complete 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post("/api/admin/verify-otp", { email, code });
      loginAdmin(data.token);
      sessionStorage.removeItem("adminEmail");
      toast.success("Welcome, Admin! 🛡️");
      navigate("/admin-dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP. Try again.");
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) { toast.error("Session expired. Please log in again."); return; }
    setResending(true);
    try {
      toast("Return to admin login to request a fresh OTP.");
    } catch {
      toast.error("Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 shadow-lg mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit code sent to{" "}
            <span className="font-medium text-gray-700">{email || "your email"}</span>
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { if (el) inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={[
                    "w-12 h-14 text-center text-xl font-bold rounded-xl border",
                    "transition-all duration-200 outline-none",
                    "focus:ring-2 focus:ring-purple-400 focus:border-transparent",
                    digit ? "border-purple-400 bg-purple-50 text-purple-700" : "border-gray-200 bg-white text-gray-800",
                  ].join(" ")}
                  aria-label={`OTP digit ${i + 1}`}
                />
              ))}
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="lg"
              variant="secondary"
            >
              Verify & Access
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-1.5 text-sm text-purple-500 hover:text-purple-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
              Resend OTP
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminVerifyPage;
