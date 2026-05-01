type BadgeProps = {
  children: string;
  className?: string;
};

const Badge = ({ children, className = "" }: BadgeProps) => {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold",
        "bg-orange-100 text-orange-600",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
};

export default Badge;
