import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white shadow-sm hover:shadow-md",
  secondary:
    "bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white shadow-sm hover:shadow-md",
  danger:
    "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-sm",
  ghost:
    "bg-transparent hover:bg-gray-100 text-gray-700",
  outline:
    "border border-rose-300 text-rose-600 hover:bg-rose-50 active:bg-rose-100",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  className = "",
  disabled,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
        "transition-all duration-200 focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-rose-400 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : leftIcon ? (
        <span className="w-4 h-4 flex items-center">{leftIcon}</span>
      ) : null}
      {children}
    </button>
  );
};
