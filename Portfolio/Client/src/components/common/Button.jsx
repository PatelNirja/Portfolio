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
    "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm";

  const variants = {
    primary:
      "bg-sky-600 hover:bg-sky-500 text-white focus:ring-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400",
    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200",
    outline:
      "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-sky-500",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500",
    ghost:
      "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading ? (
        <Spinner size="sm" color="current" />
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </motion.button>
  );
}
