import React from "react";

export default function StatsCard({ title, value, icon: Icon, color = "sky" }) {
  const colorMap = {
    sky: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{value}</p>
      </div>
      {Icon && (
        <div className={`p-3.5 rounded-2xl border ${colorMap[color] || colorMap.sky}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
