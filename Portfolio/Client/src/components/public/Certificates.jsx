import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function Certificates({ certificates }) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <span className="section-eyebrow text-glow">
            Verified Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/30 text-[var(--color-accent)]">
                    <Award className="w-6 h-6" />
                  </div>
                  {cert.issueDate && (
                    <span className="text-xs font-mono font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1 rounded-full border border-[var(--color-surface-border)]">
                      Issued {formatDate(cert.issueDate)}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold font-display text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--color-accent)]">{cert.issuer}</p>
                </div>

                {cert.credentialId && (
                  <p className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-surface)]/60 p-2 rounded-lg border border-[var(--color-surface-border)]/50">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors pt-2 group"
                >
                  <span>View Certificate</span>
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
