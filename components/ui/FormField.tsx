import React from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  optional,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-sm font-600 text-neutral-text"
      >
        {label}
        {optional && (
          <span className="text-xs font-400 text-neutral-muted bg-neutral-highlight px-1.5 py-0.5 rounded">
            Optional
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-neutral-muted">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 font-500">{error}</p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm text-neutral-text
        bg-white placeholder:text-neutral-muted
        focus:outline-none focus:ring-2 focus:ring-gaia-quaternary focus:border-gaia-primary
        transition-colors
        ${error ? "border-red-400" : "border-neutral-deep hover:border-gaia-tertiary"}
        ${className}`}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm text-neutral-text
        bg-white placeholder:text-neutral-muted resize-none
        focus:outline-none focus:ring-2 focus:ring-gaia-quaternary focus:border-gaia-primary
        transition-colors
        ${error ? "border-red-400" : "border-neutral-deep hover:border-gaia-tertiary"}
        ${className}`}
    />
  );
}
