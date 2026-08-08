import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon, Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ profile }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
          : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-md group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-slate-100">
            {profile?.name || "Portfolio"}
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Admin Login Link */}
          <Link
            to="/admin/login"
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/60 rounded-xl transition-all border border-sky-200 dark:border-sky-800/60"
          >
            Admin Portal
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 py-1.5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/admin/login"
              className="block text-center w-full py-2.5 text-xs font-bold text-white bg-sky-600 rounded-xl"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
