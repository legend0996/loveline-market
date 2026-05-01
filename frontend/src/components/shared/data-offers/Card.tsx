import type { ReactNode } from "react";

type CardProps = {
  title: string;
  icon?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

const Card = ({ title, icon, children, action, className = "" }: CardProps) => {
  return (
    <article
      className={[
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-md h-full",
        "flex flex-col justify-between",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className,
      ].join(" ")}
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {icon ? `${icon} ` : ""}
          {title}
        </h3>
        <div className="space-y-2">{children}</div>
      </div>
      {action ? <div className="mt-5">{action}</div> : null}
    </article>
  );
};

export default Card;
