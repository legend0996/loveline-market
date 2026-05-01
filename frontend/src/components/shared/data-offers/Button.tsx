import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  target?: "_blank" | "_self";
  rel?: string;
  onClick?: () => void;
  className?: string;
};

const baseClass =
  "inline-flex w-full min-h-[44px] items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400";

const Button = ({ children, href, target, rel, onClick, className = "" }: ButtonProps) => {
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`${baseClass} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
