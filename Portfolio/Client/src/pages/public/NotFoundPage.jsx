import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/common/SEO";
import { Ghost, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found (404)" />
      <div className="bg-noise"></div>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-background)] text-center relative z-10">
        <div className="max-w-md space-y-6 glass-card p-10 rounded-3xl">
          <div className="inline-flex p-4 rounded-3xl bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent)]/30 shadow-[0_0_20px_var(--color-accent-muted)]">
            <Ghost className="w-16 h-16 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-display font-bold tracking-tight text-[var(--color-accent)] text-glow">404</h1>
            <h2 className="text-2xl font-display font-bold text-[var(--color-text-main)]">Page Not Found</h2>
            <p className="text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">
              The page you are looking for doesn't exist or has been moved to another location.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-background)] font-sans font-bold text-xs shadow-[0_0_15px_var(--color-accent-muted)] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </>
  );
}
