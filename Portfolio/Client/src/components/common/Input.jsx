import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, helperText, type = "text", className = "", isTextArea = false, rows = 4, ...props }, ref) => {
    const inputStyles = `w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all ${
      error
        ? "border-rose-500 dark:border-rose-500 focus:ring-rose-500"
        : "border-slate-300 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600"
    } ${className}`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {label}
          </label>
        )}
        {isTextArea ? (
          <textarea ref={ref} rows={rows} className={inputStyles} {...props} />
        ) : (
          <input ref={ref} type={type} className={inputStyles} {...props} />
        )}
        {error ? (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
