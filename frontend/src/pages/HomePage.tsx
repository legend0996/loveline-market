import { Link } from "react-router-dom";
import {
  Heart,
  Phone,
  Eye,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DataOffersSection from "../components/shared/data-offers/DataOffersSection";

const features = [
  {
    icon: Phone,
    title: "Refer & Earn",
    description: "Submit phone referrals and earn points for every approved referral.",
    color: "bg-rose-50 text-rose-500",
  },
  {
    icon: Eye,
    title: "View Content",
    description: "Watch and engage with content, upload proof, and get rewarded.",
    color: "bg-purple-50 text-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Track Earnings",
    description: "Monitor your points and earnings in real-time on your dashboard.",
    color: "bg-green-50 text-green-500",
  },
  {
    icon: Shield,
    title: "Verified & Safe",
    description: "Admin-verified system ensures fair payouts and platform integrity.",
    color: "bg-blue-50 text-blue-500",
  },
];

const steps = [
  { step: "01", title: "Register", desc: "Create your free account in 30 seconds." },
  { step: "02", title: "Engage", desc: "Submit referrals or view content proofs." },
  { step: "03", title: "Get Approved", desc: "Admin reviews and approves your submissions." },
  { step: "04", title: "Earn Money", desc: "Withdraw your earnings to M-Pesa or mobile money." },
];

const HomePage = () => {
  const { token } = useAuth();

  return (
    <div className="overflow-x-hidden">
      <DataOffersSection />

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center px-4 pt-12 pb-20 scroll-mt-24">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-xs font-semibold text-rose-600">Earn money by engaging — it's real!</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Turn your{" "}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              network
            </span>{" "}
            into{" "}
            <span className="bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent">
              income
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Loveline Market rewards you for referring friends and engaging with content.
            Join thousands earning from their smartphones every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {token ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Go to Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/profile/register"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Earning Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/profile/login"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold text-base hover:border-rose-300 hover:bg-rose-50 transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            {["Free to join", "Instant registration", "Real earnings", "Trusted payouts"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-4 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Everything you need to earn
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A transparent, reward-based platform built for real earnings.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-rose-200 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-rose-50/30 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-500">Four simple steps to start earning today</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-extrabold text-rose-100 leading-none select-none">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-2xl">
            <Heart className="w-10 h-10 mx-auto mb-4 fill-white/30 text-white" />
            <h2 className="text-3xl font-bold mb-3">Ready to start earning?</h2>
            <p className="text-rose-100 mb-8 text-sm">
              Join Loveline Market today. It's completely free and takes less than a minute.
            </p>
            <Link
              to={token ? "/dashboard" : "/profile/register"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-rose-600 font-semibold hover:bg-rose-50 transition-colors shadow"
            >
              {token ? "My Dashboard" : "Create Free Account"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
