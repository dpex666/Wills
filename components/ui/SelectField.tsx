import React from "react";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function SelectField({ error, className = "", children, ...props }: SelectFieldProps) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm text-neutral-text
        bg-white appearance-none
        focus:outline-none focus:ring-2 focus:ring-gaia-quaternary focus:border-gaia-primary
        transition-colors cursor-pointer
        ${error ? "border-red-400" : "border-neutral-deep hover:border-gaia-tertiary"}
        ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23807388' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
      }}
    >
      {children}
    </select>
  );
}
