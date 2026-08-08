import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, CheckCircle } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function Certificates({ certificates }) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2 mb-16"
        >
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Verified Credentials
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Certifications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-500">
                    <Award className="w-6 h-6" />
                  </div>
                  {cert.issueDate && (
                    <span className="text-[11px] font-semibold text-slate-400">
                      Issued {formatDate(cert.issueDate)}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{cert.name}</h3>
                  <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">{cert.issuer}</p>
                </div>

                {cert.credentialId && (
                  <p className="text-[10px] font-mono text-slate-400">ID: {cert.credentialId}</p>
                )}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline pt-2"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
