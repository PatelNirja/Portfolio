import React from "react";
import { FaGithub as Github, FaLinkedin as Linkedin, FaTwitter as Twitter } from "react-icons/fa";

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-surface)]/80 border-t border-[var(--color-surface-border)] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left info */}
        <div className="text-center md:text-left space-y-1">
          <h3 className="font-display font-bold text-lg text-[var(--color-text-main)]">{profile?.name || "Nirja Patel"}</h3>
          <p className="text-xs font-sans text-[var(--color-text-muted)]">
            © {currentYear} All rights reserved. Crafted with React, Tailwind & Node.js
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {profile?.socialLinks?.github && (
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass border border-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 hover:scale-110 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {profile?.socialLinks?.linkedin && (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass border border-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 hover:scale-110 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {profile?.socialLinks?.twitter && (
            <a
              href={profile.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass border border-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 hover:scale-110 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
