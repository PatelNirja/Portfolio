import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category || "other")));

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2 mb-16"
        >
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Skills & Expertise
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Technologies I Master
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const categorySkills = skills.filter((s) => (s.category || "other") === cat);

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
              >
                <h3 className="text-base font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  {cat}
                </h3>

                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill._id || skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800 dark:text-slate-200">{skill.name}</span>
                        <span className="text-slate-400">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
