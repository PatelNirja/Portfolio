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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
    >
      {/* Thumbnail Container */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={project.thumbnail || DEFAULT_PROJECT_THUMB}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Featured Badge */}
        {project.isFeatured && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-600 text-white shadow-md">
            Featured
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category Pill */}
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {project.category}
          </span>

          {/* Title */}
          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors flex items-center gap-1.5">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {project.shortDesc || project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link
            to={`/projects/${project.slug}`}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
          >
            View Details
          </Link>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title="View Code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-500 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
