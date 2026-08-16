import React from "react";
import { motion } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function Achievements({ achievements }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <span className="section-eyebrow text-glow">
            Recognitions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
            Achievements & Awards
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={item._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-[var(--color-accent-secondary-muted)] border border-[var(--color-accent-secondary)]/30 text-[var(--color-accent-secondary)]">
                    <Trophy className="w-6 h-6" />
                  </div>
                  {item.date && (
                    <span className="text-xs font-mono font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1 rounded-full border border-[var(--color-surface-border)]">
                      {formatDate(item.date)}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-[var(--color-text-muted)] font-sans leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors pt-2 group"
                >
                  <span>Verify Award</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
