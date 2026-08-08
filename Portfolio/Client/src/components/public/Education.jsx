import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function Education({ educations }) {
  if (!educations || educations.length === 0) return null;

  return (
    <section id="education" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2 mb-16"
        >
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Academic Background
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {educations.map((edu, idx) => (
            <motion.div
              key={edu._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h3>
                  <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">{edu.institution}</p>
                  {edu.fieldOfStudy && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{edu.fieldOfStudy}</p>
                  )}
                  {edu.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(edu.startDate)} - {edu.isCurrent ? "Present" : formatDate(edu.endDate)}
                </span>
                {edu.grade && <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-2">Grade: {edu.grade}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
