import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export default function Button({ children, variant = "primary", isLoading, className = "", ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 disabled:opacity-50";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-slate-700 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} disabled={isLoading} {...props}>
      {isLoading ? "Processing..." : children}
    </button>
  );
}