import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/common/SEO";
import { Ghost, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found (404)" />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#0b0f19] text-center">
        <div className="max-w-md space-y-6">
          <div className="inline-flex p-4 rounded-3xl bg-sky-500/10 text-sky-500 border border-sky-500/20 shadow-2xl">
            <Ghost className="w-16 h-16 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">404</h1>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Page Not Found</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The page you are looking for doesn't exist or has been moved to another location.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </>
  );
}
