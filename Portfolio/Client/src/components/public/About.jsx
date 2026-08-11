import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Sparkles, Cpu, Layers } from "lucide-react";

export default function About({ profile }) {
  if (!profile) return null;

  return (
    <section id="about" className="py-24 bg-[var(--bg)] border-t border-[var(--border)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16"
      >
        <div className="text-center space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
            // About Me
          </span>
          <h2 className="text-[2.25rem] font-heading font-bold text-[var(--text)] leading-tight">
            Engineering High-Performance Web & AI Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-[var(--text)]">
                Building resilient software architecture with clean, scalable code.
              </h3>
              <p className="text-[var(--text-muted)] font-sans leading-[1.6] text-base">
                {profile.bio || "Full stack software engineer specializing in scalable React interfaces, Node.js microservices, and AI-driven architectures."}
              </p>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
              {profile.location && (
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                  <MapPin className="w-5 h-5 text-[var(--accent)] shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)] block">Location</span>
                    <p className="text-sm font-semibold text-[var(--text)]">{profile.location}</p>
                  </div>
                </div>
              )}

              {profile.email && (
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                  <Mail className="w-5 h-5 text-[var(--accent)] shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)] block">Email</span>
                    <p className="text-sm font-semibold text-[var(--text)] truncate">{profile.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual Card */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[var(--accent-2)]">
                <Cpu className="w-5 h-5" />
                <h4 className="font-heading font-bold text-lg text-[var(--text)]">Core Architecture Principles</h4>
              </div>
              <ul className="space-y-3.5 text-sm font-sans text-[var(--text-muted)]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                  <span><strong>Multi-Agent AI Integration:</strong> Orchestrating specialized agent networks (FarmXpert, CUDAS RAG pipelines).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-2)] mt-2 shrink-0" />
                  <span><strong>Modern MERN Stack:</strong> React 19, Node.js, Express, MongoDB with stateless JWT authentication.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                  <span><strong>High-Performance UI:</strong> Framer Motion physics, Tailwind CSS tokens, & responsive layout baselines.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-2)] mt-2 shrink-0" />
                  <span><strong>Clean Code & Security:</strong> Strict state isolation, rate limiting, and defensive input validation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
