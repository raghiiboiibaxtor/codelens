// frontend/src/components/ui/Button.jsx
import React from "react";

const variants = {
  primary: "bg-[#85FF58] text-black rounded-none hover:rounded-md",
  ghost:   "bg-[#2B2B2B] text-[#85FF58]/50 border-[#85FF58]/50 ",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading ? "true" : "false"}
      className={[
        "inline-flex items-center justify-center rounded-md transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-black/20",
        "disabled:opacity-50 disabled:cursor-not-allowed select-none",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading && (
        <span
          className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
