import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { DEFAULT_PROJECT_THUMB } from "../../utils/constants";

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group flex flex-col rounded-3xl glass-card overflow-hidden h-full"
    >
      {/* Thumbnail Container */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-surface-border)]">
        <img
          src={project.thumbnail || DEFAULT_PROJECT_THUMB}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Featured Badge */}
        {project.isFeatured && (
          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px] font-sans font-extrabold uppercase tracking-widest bg-[var(--color-accent)] text-[#0B0D10] shadow-[0_0_15px_var(--color-accent-muted)]">
            Featured
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          {/* Category Pill */}
          <span className="text-[11px] font-sans font-extrabold uppercase tracking-widest text-[var(--color-accent)] text-glow">
            {project.category}
          </span>

          {/* Title */}
          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-2xl font-display font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors flex items-center gap-2">
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-sm text-[var(--color-text-muted)] font-sans line-clamp-2 leading-relaxed">
            {project.shortDesc || project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium bg-[var(--color-surface)]/50 border border-[var(--color-surface-border)] text-[var(--color-text-muted)] group-hover:border-[var(--color-surface-border)] group-hover:text-[var(--color-text-main)] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[var(--color-surface-border)] flex items-center justify-between">
          <Link
            to={`/projects/${project.slug}`}
            className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors"
          >
            Explore Case Study
          </Link>

          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:scale-110 transition-all"
                title="View Code"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:scale-110 transition-all"
                title="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
