import React from "react";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There are no records to display at this time.",
  actionLabel,
  onAction,
  icon: Icon = FolderOpen,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center glass border border-dashed border-[var(--color-surface-border)] rounded-3xl my-6">
      <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-[var(--color-text-muted)]">
        <Icon className="w-8 h-8 text-[var(--color-accent)]" />
      </div>
      <h4 className="text-lg font-display font-bold text-[var(--color-text-main)]">{title}</h4>
      <p className="text-sm font-sans text-[var(--color-text-muted)] max-w-sm mt-1 mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 text-xs font-sans font-bold text-[var(--color-background)] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-xl transition-all shadow-[0_0_15px_var(--color-accent-muted)] cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
