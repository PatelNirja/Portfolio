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
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 my-4">
      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800/80 mb-3 text-slate-400">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
