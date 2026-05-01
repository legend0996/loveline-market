import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export const Card = ({
  children,
  noPadding = false,
  className = "",
  ...rest
}: CardProps) => {
  return (
    <div
      className={[
        "bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]",
        "border border-gray-100",
        noPadding ? "" : "p-6",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};
