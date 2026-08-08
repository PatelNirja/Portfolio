import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileDown, Sparkles, MapPin } from "lucide-react";
import { DEFAULT_AVATAR } from "../../utils/constants";

export default function Hero({ profile }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/20 dark:bg-sky-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-500/20 dark:bg-indigo-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Availability Badge */}
        {profile?.isAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Available for New Opportunities</span>
          </motion.div>
        )}

        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative inline-block"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-sky-500 to-indigo-500 shadow-2xl mx-auto">
            <img
              src={profile?.profileImage || DEFAULT_AVATAR}
              alt={profile?.name || "Profile"}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
        </motion.div>

        {/* Name & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Hi, I'm <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">{profile?.name || "Full Stack Developer"}</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 leading-snug">
            {profile?.tagline || "Building Scalable, Modern Web Applications"}
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {profile?.bio || "Experienced MERN stack engineer dedicated to creating high-performance web systems."}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center gap-2 transition-all hover:scale-105"
            >
              <FileDown className="w-4 h-4 text-sky-500" />
              <span>Download Resume</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
