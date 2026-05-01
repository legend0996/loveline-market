interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export const Spinner = ({ size = "md", className = "" }: SpinnerProps) => (
  <div
    className={[
      "border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin",
      sizes[size],
      className,
    ].join(" ")}
    role="status"
    aria-label="Loading"
  />
);

export const FullPageSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
    <Spinner size="lg" />
  </div>
);
