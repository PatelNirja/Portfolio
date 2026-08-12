import React from "react";
import { motion } from "framer-motion";
import Spinner from "./Spinner";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  icon: Icon,
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm";

  const variants = {
    primary:
      "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#0B0D10] focus:ring-[var(--color-accent)] shadow-[0_0_15px_var(--color-accent-muted)] hover:shadow-[0_0_25px_var(--color-accent-muted)]",
    secondary:
      "bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-main)] border border-[var(--color-surface-border)] focus:ring-[var(--color-surface-border)]",
    outline:
      "border border-[var(--color-surface-border)] text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)] focus:ring-[var(--color-surface-border)]",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500",
    ghost:
      "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-main)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-2 font-sans",
    md: "px-6 py-3 text-sm gap-2.5 font-sans",
    lg: "px-8 py-4 text-base gap-3 font-sans",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading ? (
        <Spinner size="sm" color="current" />
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5 shrink-0" />}
          {children}
        </>
      )}
    </motion.button>
  );
}
