import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-xl py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark with Person's Actual Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-surface-border)] text-[var(--color-accent)] transition-all group-hover:scale-105 group-hover:shadow-[0_0_15px_var(--color-accent-muted)]">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors text-glow">
            {name}
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_8px_var(--color-accent)]" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Admin Portal Button */}
          <Link to="/admin/login">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:inline-flex px-5 py-2 font-sans text-xs font-semibold text-[var(--color-background)] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-xl transition-all shadow-[0_0_15px_var(--color-accent-muted)]"
            >
              Admin Portal
            </motion.span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] bg-[var(--color-surface)] border border-[var(--color-surface-border)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass border-b border-[var(--color-surface-border)] px-4 pt-4 pb-6 space-y-4 shadow-2xl absolute top-full left-0 w-full"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-sans font-semibold text-[var(--color-text-main)] hover:text-[var(--color-accent)] py-2"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[var(--color-surface-border)]">
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 font-sans text-sm font-bold text-[var(--color-background)] bg-[var(--color-accent)] rounded-xl"
              >
                Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
