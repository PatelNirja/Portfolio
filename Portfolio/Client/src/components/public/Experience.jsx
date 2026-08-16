import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-16"
        >
          <span className="section-eyebrow text-glow">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
            Work Experience
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative border-l border-[var(--color-surface-border)] ml-4 sm:ml-6 space-y-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-background)] shadow-[0_0_12px_var(--color-accent-glow)] group-hover:scale-125 transition-transform duration-300" />

              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold font-display text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors">
                    {exp.role}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/30 text-[var(--color-accent)] w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(exp.startDate)} - {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-text-muted)] flex-wrap">
                  <span className="flex items-center gap-1.5 text-[var(--color-text-main)] font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    {exp.company}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                      {exp.location}
                    </span>
                  )}
                </div>

                {exp.description && (
                  <p className="text-sm text-[var(--color-text-muted)] font-sans leading-relaxed pt-1">
                    {exp.description}
                  </p>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-[var(--color-text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
