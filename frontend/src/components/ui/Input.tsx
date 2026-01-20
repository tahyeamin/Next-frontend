import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${className}`}
        {...props}
      />
    </div>
  );
}