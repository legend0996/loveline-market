import { useEffect, useState } from "react";
import { Heart, Share2, Image } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import API from "../../services/api";
import type { Poster } from "../../types";

const ActivePosterPage = () => {
  const [poster, setPoster] = useState<Poster | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/poster/active")
      .then(({ data }) => setPoster(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Active Poster</h1>
        <p className="text-sm text-gray-500 mt-1">
          This is the current active poster. Share it to earn view rewards.
        </p>
      </div>

      {!poster ? (
        <EmptyState
          icon={<Image className="w-8 h-8" />}
          title="No active poster"
          description="The admin hasn't activated a poster yet. Check back soon!"
        />
      ) : (
        <div className="max-w-sm mx-auto">
          {/* Social post-style card */}
          <Card noPadding className="overflow-hidden">
            {/* Post header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">LovelineMarket</p>
                <p className="text-xs text-gray-400">Official</p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src={`${API_BASE}/${poster.imageUrl}`}
                alt="Active poster"
                className="w-full object-contain max-h-72 bg-gray-50"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Poster";
                }}
              />
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-800 leading-relaxed">
                {poster.caption}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-500 transition-colors"
                    onClick={() => toast.success("Liked!")}
                    aria-label="Like post"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Like</span>
                  </button>
                </div>
                <button
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-500 transition-colors"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.origin);
                    toast.success("Link copied!");
                  }}
                  aria-label="Share post"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </Card>

          <p className="text-center text-xs text-gray-400 mt-4">
            After promoting this poster, submit your views in the{" "}
            <span className="text-rose-500 font-medium">Views</span> section.
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivePosterPage;
