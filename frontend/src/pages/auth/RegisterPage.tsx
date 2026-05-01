import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Heart, User, Phone, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone) e.phone = "Phone is required";
    else if (!/^\+?[\d\s-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email, phone: form.phone, password: form.password };
      const { data } = await API.post("/api/user/register", payload);
      if (data.token && data.user) {
        loginUser(data.token, data.user);
        toast.success("Account created! Welcome to Loveline Market 🎉");
        navigate("/dashboard");
      } else {
        toast.success("Account created successfully. Please sign in.");
        navigate("/profile/login");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-400 shadow-lg mb-4">
            <Heart className="w-7 h-7 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="text-sm text-gray-500 mt-1">Start earning with Loveline Market today</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Full name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              error={errors.name}
              leftIcon={<User className="w-4 h-4" />}
              autoComplete="name"
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
              autoComplete="email"
            />
            <Input
              label="Phone number"
              type="tel"
              placeholder="+254 700 000 000"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              error={errors.phone}
              leftIcon={<Phone className="w-4 h-4" />}
              autoComplete="tel"
            />
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              error={errors.password}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              autoComplete="new-password"
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              leftIcon={<Lock className="w-4 h-4" />}
              autoComplete="new-password"
            />

            <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">
              Create account
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/profile/login"
                className="font-semibold text-rose-500 hover:text-rose-600 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
