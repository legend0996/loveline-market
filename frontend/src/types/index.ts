// ─── Auth ────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
export interface DashboardSummary {
  totalPoints: number;
  approvedReferrals: number;
  pendingReferrals: number;
  totalEarnings?: number;
  totalViewEarnings?: number;
  pendingViews: number;
}

// ─── Referral ────────────────────────────────────────────────────────────────
export type Status = "PENDING" | "APPROVED" | "REJECTED";

export interface Referral {
  id: string;
  phone: string;
  status: Status;
  createdAt?: string;
  created_at?: string;
  userId?: string;
  user_id?: string;
  user?: { name: string; email: string };
}

// ─── View Submission ─────────────────────────────────────────────────────────
export interface ViewSubmission {
  id: string;
  screenshotUrl?: string;
  screenshot?: string;
  views: number;
  status: Status;
  earnings?: number;
  createdAt?: string;
  created_at?: string;
  userId?: string;
  user_id?: string;
  user?: { name: string; email: string };
}

// ─── Poster ──────────────────────────────────────────────────────────────────
export interface Poster {
  id: string;
  imageUrl: string;
  caption: string;
  isActive?: boolean;
  active?: boolean;
  createdAt?: string;
}

// ─── Admin Stats ─────────────────────────────────────────────────────────────
export interface AdminStats {
  totalUsers: number;
  totalReferrals: number;
  pendingReferrals: number;
  totalViews: number;
  pendingViews: number;
  totalEarnings: number;
}
