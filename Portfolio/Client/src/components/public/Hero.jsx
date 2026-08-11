import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileDown, Sparkles } from "lucide-react";
import NodeGraph from "./NodeGraph";
import { DEFAULT_AVATAR } from "../../utils/constants";

export default function Hero({ profile }) {
  const name = profile?.name || "Nirja Patel";
  const tagline = profile?.tagline || "Architecting Distributed Systems & Multi-Agent AI Applications";
  const bio = profile?.bio || "Passionate about full-stack engineering, clean architecture, and building production-ready AI solutions.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-[var(--bg)]">
      {/* Signature Element — Hero NodeGraph */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0"
      >
        <NodeGraph />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Eyebrow & Availability */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold px-3 py-1 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)]/40 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Agent AI & Web Architecture</span>
            </span>

            {profile?.isAvailable && (
              <span className="font-mono text-xs font-semibold px-3.5 py-1 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse" />
                <span>Available for Hire</span>
              </span>
            )}
          </motion.div>

          {/* Profile Image (Optional accent ring) */}
          {profile?.profileImage && (
            <motion.div variants={itemVariants} className="inline-block">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-[var(--surface)] border-2 border-[var(--accent)] shadow-2xl mx-auto overflow-hidden">
                <img
                  src={profile.profileImage || DEFAULT_AVATAR}
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Main Headline & Subhead */}
          <motion.div variants={itemVariants} className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.25rem] font-heading font-bold tracking-tight text-[var(--text)] leading-[1.1]">
              Hi, I'm <span className="text-[var(--accent)]">{name}</span>
            </h1>

            <p className="text-xl sm:text-2xl font-heading font-medium text-[var(--text)]/90 leading-snug max-w-3xl mx-auto">
              {tagline}
            </p>

            <p className="text-base text-[var(--text-muted)] font-sans leading-relaxed max-w-2xl mx-auto pt-1">
              {bio}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="px-7 py-3.5 rounded-xl bg-[var(--accent)] text-[#0D1117] font-semibold text-sm shadow-lg shadow-[var(--accent)]/15 flex items-center gap-2 cursor-pointer font-sans"
            >
              <span>Explore Featured Projects</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            {profile?.resumeUrl && (
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="px-7 py-3.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text)] font-semibold text-sm flex items-center gap-2 cursor-pointer font-sans"
              >
                <FileDown className="w-4 h-4 text-[var(--accent)]" />
                <span>Download Resume</span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
