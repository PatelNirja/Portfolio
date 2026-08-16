import React, { useState } from "react";
import { motion } from "framer-motion";
import { InfiniteSlider } from "../core/InfiniteSlider";

// ─── Icon Imports ───────────────────────────────────────────────────────────
import {
  SiReact, SiTailwindcss, SiJavascript, SiTypescript,
  SiHtml5, SiCss, SiVite,
  SiNodedotjs, SiExpress, SiPython, SiCplusplus,
  SiMongodb, SiPostgresql, SiMysql,
  SiDocker, SiGit, SiGithub, SiPostman, SiVscodium,
  SiNextdotjs, SiVuedotjs, SiAngular, SiFirebase,
  SiNpm, SiJest, SiWebpack, SiSvelte,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { Code2, Cpu, Zap } from "lucide-react";

// ─── Icon Resolver ────────────────────────────────────────────────────────────
function resolveIcon(name) {
  const n = name.toLowerCase().replace(/[.\s]/g, "");
  if (n.includes("react") && !n.includes("native")) return SiReact;
  if (n.includes("next")) return SiNextdotjs;
  if (n.includes("vue")) return SiVuedotjs;
  if (n.includes("angular")) return SiAngular;
  if (n.includes("svelte")) return SiSvelte;
  if (n.includes("tailwind")) return SiTailwindcss;
  if (n.includes("html")) return SiHtml5;
  if (n.includes('css') && !n.includes('tailwind')) return SiCss;
  if (n.includes("javascript") || n === "js") return SiJavascript;
  if (n.includes("typescript") || n === "ts") return SiTypescript;
  if (n.includes("vite")) return SiVite;
  if (n.includes("webpack")) return SiWebpack;
  if (n.includes("node")) return SiNodedotjs;
  if (n.includes("express")) return SiExpress;
  if (n.includes("python")) return SiPython;
  if (n.includes("java") && !n.includes("javascript") && !n.includes("script")) return FaJava;
  if (n.includes("cpp") || n.includes("c++") || n.includes("cplusplus")) return SiCplusplus;
  if (n.includes("restapi") || n.includes("rest")) return Zap;
  if (n.includes("graphql")) return Cpu;
  if (n.includes("mongo")) return SiMongodb;
  if (n.includes("postgres") || n.includes("postgresql")) return SiPostgresql;
  if (n.includes("mysql")) return SiMysql;
  if (n.includes("firebase")) return SiFirebase;
  if (n.includes("docker")) return SiDocker;
  if (n.includes("aws")) return FaAws;
  if (n.includes("github")) return SiGithub;
  if (n.includes("git")) return SiGit;
  if (n.includes("postman")) return SiPostman;
  if (n.includes("vscode") || n.includes("visualstudio")) return SiVscodium;
  if (n.includes("npm") || n.includes("pnpm")) return SiNpm;
  if (n.includes("jest")) return SiJest;
  return Code2;
}

// ─── Single skill pill ────────────────────────────────────────────────────────
function SkillPill({ skill }) {
  const Icon = resolveIcon(skill.name);
  return (
    <div className="skill-pill group flex items-center gap-3 px-5 py-3 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface)]/80 backdrop-blur-md cursor-default select-none transition-all duration-300 hover:scale-105 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-hover)] hover:shadow-[0_0_20px_var(--color-accent-muted)]">
      <Icon className="w-5 h-5 shrink-0 text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-200" />
      <span className="font-sans text-sm font-semibold text-[var(--color-text-main)] whitespace-nowrap leading-none">
        {skill.name}
      </span>
    </div>
  );
}

// ─── Row config ───────────────────────────────────────────────────────────────
const ROW_CONFIGS = [
  { reverse: false, duration: 35, gap: 20 },
  { reverse: true,  duration: 40, gap: 20 },
  { reverse: false, duration: 38, gap: 20 },
];

// Distribute skills evenly across N rows
function distributeIntoRows(skills, numRows) {
  const rows = Array.from({ length: numRows }, () => []);
  skills.forEach((skill, i) => {
    rows[i % numRows].push(skill);
  });
  return rows;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  // Deduplicate by name (case-insensitive)
  const seen = new Set();
  const allSkills = skills.filter((s) => {
    const key = s.name.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Calculate row distribution (max 3 rows for clean centering)
  const numRows = Math.min(3, Math.max(1, Math.ceil(allSkills.length / 5)));
  const rows = distributeIntoRows(allSkills, numRows);

  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden flex flex-col items-center justify-center text-center"
      style={{ contain: "layout" }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(167,139,250,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ─── Header ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="section-eyebrow text-glow">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
            Technologies I Work With
          </h2>
          <p className="text-base text-[var(--color-text-muted)] font-sans max-w-xl mx-auto pt-1">
            Technologies I use to build modern full-stack and AI-powered products.
          </p>
        </motion.div>
      </div>

      {/* ─── Centered Marquee Rows Container ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-5 px-4 flex flex-col items-center justify-center">
        {rows.map((rowSkills, rowIdx) => {
          if (rowSkills.length === 0) return null;
          const cfg = ROW_CONFIGS[rowIdx % ROW_CONFIGS.length];

          return (
            <div key={rowIdx} className="w-full flex justify-center items-center">
              <InfiniteSlider
                reverse={cfg.reverse}
                duration={cfg.duration}
                gap={cfg.gap}
                pauseOnHover
              >
                {rowSkills.map((skill) => (
                  <SkillPill key={skill._id || skill.name} skill={skill} />
                ))}
              </InfiniteSlider>
            </div>
          );
        })}

        {/* Static Centered Backup Grid for small skill counts or accessibility */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6 max-w-4xl mx-auto">
          {allSkills.length <= 8 && allSkills.map((skill) => (
            <SkillPill key={`static-${skill._id || skill.name}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
