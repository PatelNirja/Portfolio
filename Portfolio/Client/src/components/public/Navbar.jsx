import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ profile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const name = profile?.name || "Nirja Patel";

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
          ? "bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-lg"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark with Person's Actual Name */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-border)]/40 text-[var(--accent)] transition-transform group-hover:scale-105">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
            {name}
          </span>
        </a>

        {/* Desktop Links with Underline Draw-In from Left */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-sans font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Admin Portal Button in JetBrains Mono */}
          <Link to="/admin/login">
            <motion.span
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="hidden sm:inline-flex px-4 py-2 font-mono text-xs font-semibold text-[var(--accent)] bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] rounded-xl transition-all shadow-sm"
            >
              Admin Portal
            </motion.span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] border border-[var(--border)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--border)] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-sans font-semibold text-[var(--text)] hover:text-[var(--accent)] py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-[var(--border)]">
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full py-2.5 font-mono text-xs font-semibold text-[var(--accent)] bg-[var(--accent-bg)] border border-[var(--accent-border)]/50 rounded-xl"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
