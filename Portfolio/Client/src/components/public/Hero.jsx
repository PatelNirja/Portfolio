import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";
import HeroBackground from "./HeroBackground";
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden">
      {/* 3D Particle Field Background */}
      <HeroBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Eyebrow & Availability */}
          {(profile?.isAvailable ?? true) && (
            <motion.div variants={itemVariants} className="flex items-center justify-center">
              <span className="font-sans text-xs font-semibold px-4 py-1.5 rounded-full bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/30 text-[var(--color-accent)] inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
                <span>Open to work</span>
              </span>
            </motion.div>
          )}

          {/* Main Headline & Subhead */}
          <motion.div variants={itemVariants} className="space-y-6 max-w-5xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05]">
              Hello, I'm <span className="text-[var(--color-accent)] text-glow">{name}</span>
            </h1>

            <p className="text-2xl sm:text-3xl font-medium text-[var(--color-text-main)]/90 leading-tight max-w-4xl mx-auto">
              {tagline}
            </p>

            <p className="text-lg text-[var(--color-text-muted)] font-sans leading-relaxed max-w-2xl mx-auto pt-2">
              {bio}
            </p>
          </motion.div>

          {/* Profile Image */}
          {profile?.profileImage && (
            <motion.div variants={itemVariants} className="inline-block mt-4">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 border-2 border-[var(--color-accent)]/50 shadow-[0_0_20px_var(--color-accent-muted)] overflow-hidden relative">
                <img
                  src={profile.profileImage || DEFAULT_AVATAR}
                  alt={name}
                  className="w-full h-full object-cover rounded-full z-10 relative"
                />
              </div>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-5 pt-8"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="px-8 py-4 rounded-xl bg-[var(--color-accent)] text-[#0B0D10] font-bold text-sm shadow-[0_0_20px_var(--color-accent-muted)] flex items-center gap-2 cursor-pointer font-sans transition-shadow hover:shadow-[0_0_30px_rgba(167,139,250,0.5)]"
            >
              <span>Explore Featured Work</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            {profile?.resumeUrl && (
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="px-8 py-4 rounded-xl glass hover:bg-[var(--color-surface-hover)] border border-[var(--color-surface-border)] text-[var(--color-text-main)] font-semibold text-sm flex items-center gap-2 cursor-pointer font-sans transition-colors"
              >
                <FileDown className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Download CV</span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
