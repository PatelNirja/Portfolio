import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, helperText, type = "text", className = "", isTextArea = false, rows = 4, ...props }, ref) => {
    const inputStyles = `w-full px-5 py-3.5 rounded-xl border bg-[var(--color-surface)]/50 text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all ${
      error
        ? "border-rose-500 focus:ring-rose-500 focus:border-rose-500"
        : "border-[var(--color-surface-border)] hover:border-[var(--color-text-muted)]"
    } ${className}`;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-xs font-sans font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
            {label}
          </label>
        )}
        {isTextArea ? (
          <textarea ref={ref} rows={rows} className={inputStyles} {...props} />
        ) : (
          <input ref={ref} type={type} className={inputStyles} {...props} />
        )}
        {error ? (
          <p className="text-xs text-rose-500 font-bold">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[var(--color-text-muted)]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
