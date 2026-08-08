import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Calendar, Briefcase, FileDown } from "lucide-react";

export default function About({ profile }) {
  if (!profile) return null;

  return (
    <section id="about" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2 mb-16"
        >
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            About Me
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Passionate About Crafting Web Solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Architecting scalable software with clean code principles.
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
              {profile.bio || "I build high quality, responsive full stack web apps."}
            </p>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {profile.location && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                  <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{profile.location}</p>
                  </div>
                </div>
              )}

              {profile.email && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                  <Mail className="w-5 h-5 text-sky-500 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Email</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{profile.email}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/20 dark:border-slate-800 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Core Engineering Focus</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Clean Architecture & SOLID Principles
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  REST API Design & Stateless JWT Auth
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Responsive UI with Tailwind CSS & Framer Motion
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Cloudinary Media Integration & Stream Processing
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
