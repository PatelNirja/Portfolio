import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2 mb-16"
        >
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Career Journey
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Work Experience
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-sky-500/30 dark:border-slate-800 ml-4 sm:ml-6 space-y-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-sky-600 ring-4 ring-white dark:ring-slate-900 shadow-md group-hover:scale-125 transition-transform" />

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(exp.startDate)} - {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{exp.company}</span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-500" />
                      {exp.location}
                    </span>
                  )}
                </div>

                {exp.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                    {exp.description}
                  </p>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
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
