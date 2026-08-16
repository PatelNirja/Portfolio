import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function Education({ educations }) {
  if (!educations || educations.length === 0) return null;

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-16"
        >
          <span className="section-eyebrow text-glow">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
            Education
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {educations.map((edu, idx) => (
            <motion.div
              key={edu._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/30 text-[var(--color-accent)] shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold font-display text-[var(--color-text-main)]">{edu.degree}</h3>
                  <p className="text-sm font-semibold text-[var(--color-accent)]">{edu.institution}</p>
                  {edu.fieldOfStudy && (
                    <p className="text-sm text-[var(--color-text-muted)] font-sans">{edu.fieldOfStudy}</p>
                  )}
                  {edu.description && (
                    <p className="text-sm text-[var(--color-text-muted)] font-sans pt-2 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 border-[var(--color-surface-border)] pt-4 sm:pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/30 text-[var(--color-accent)]">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(edu.startDate)} - {edu.isCurrent ? "Present" : formatDate(edu.endDate)}
                </span>
                {edu.grade && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-text-main)] bg-[var(--color-surface)] border border-[var(--color-surface-border)] px-3 py-1 rounded-lg">
                    <Award className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Grade: {edu.grade}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
