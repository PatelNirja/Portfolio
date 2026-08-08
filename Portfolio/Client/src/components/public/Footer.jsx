import React from "react";
import { Mail, Heart } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin, FaTwitter as Twitter } from "react-icons/fa";

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left info */}
        <div className="text-center md:text-left space-y-1">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{profile?.name || "Portfolio Owner"}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {currentYear} All rights reserved. Powered by MERN Stack & Cloudinary.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {profile?.socialLinks?.github && (
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:scale-110 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {profile?.socialLinks?.linkedin && (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:scale-110 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {profile?.socialLinks?.twitter && (
            <a
              href={profile.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:scale-110 transition-all"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
