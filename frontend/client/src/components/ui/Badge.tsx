import React from "react";
import type { Status } from "../../types";

type BadgeVariant = Status | "info" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  PENDING:  "bg-amber-50  text-amber-700  border-amber-200",
  APPROVED: "bg-green-50  text-green-700  border-green-200",
  REJECTED: "bg-red-50    text-red-600    border-red-200",
  info:     "bg-blue-50   text-blue-700   border-blue-200",
  default:  "bg-gray-100  text-gray-600   border-gray-200",
};

export const Badge = ({
  variant = "default",
  children,
  className = "",
}: BadgeProps) => {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        "border",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
};
