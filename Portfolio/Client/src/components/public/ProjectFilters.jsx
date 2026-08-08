import React from "react";
import { Search, X } from "lucide-react";
import { PROJECT_CATEGORIES } from "../../utils/constants";

export default function ProjectFilters({ activeCategory, onSelectCategory, searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat.value
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-9 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
