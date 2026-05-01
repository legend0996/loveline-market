import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-rose-500 to-pink-400 flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="font-semibold text-sm">
            Loveline<span className="text-rose-500">Market</span>
          </span>
        </div>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} LovelineMarket. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs text-gray-500">
          <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
          <Link to="/profile/login" className="hover:text-rose-500 transition-colors">Login</Link>
          <Link to="/profile/register" className="hover:text-rose-500 transition-colors">Register</Link>
        </div>
      </div>
    </div>
  </footer>
);
