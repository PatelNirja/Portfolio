import React from "react";
import { motion } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function Achievements({ achievements }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2 mb-16"
        >
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Recognitions
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Achievements & Awards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={item._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500">
                  <Trophy className="w-6 h-6" />
                </div>
                {item.date && (
                  <span className="text-xs font-semibold text-slate-400">{formatDate(item.date)}</span>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                )}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline pt-2"
                >
                  <span>Verify Award</span>
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
