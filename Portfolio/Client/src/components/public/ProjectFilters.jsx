import React from "react";
import { Search, X } from "lucide-react";
import { PROJECT_CATEGORIES } from "../../utils/constants";

export default function ProjectFilters({ activeCategory, onSelectCategory, searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
              activeCategory === cat.value
                ? "bg-[var(--color-accent)] text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-muted)]"
                : "glass border border-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs font-sans bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
