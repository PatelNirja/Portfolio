import React from "react";
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
import { Code2, Cpu, Zap, Database, Wrench } from "lucide-react";

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
    <div className="skill-pill group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm cursor-default select-none transition-all duration-200 hover:scale-[1.04] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface-hover)] hover:shadow-[0_0_12px_rgba(212,255,51,0.08)]">
      <Icon className="w-4 h-4 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-200" />
      <span className="font-sans text-sm font-medium text-[var(--color-text-main)] whitespace-nowrap leading-none">
        {skill.name}
      </span>
    </div>
  );
}

// ─── Row config ───────────────────────────────────────────────────────────────
const ROW_CONFIGS = [
  { reverse: false, duration: 32, gap: 16 },
  { reverse: true,  duration: 38, gap: 20 },
  { reverse: false, duration: 35, gap: 14 },
  { reverse: true,  duration: 42, gap: 18 },
  { reverse: false, duration: 30, gap: 16 },
];

// Distribute an array of skills across N rows as evenly as possible.
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

  // Deduplicate by name (case-insensitive) and flatten all categories
  const seen = new Set();
  const allSkills = skills.filter((s) => {
    const key = s.name.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Responsive: we always prepare 5 rows; CSS hides extras on small screens
  const NUM_ROWS = Math.min(ROW_CONFIGS.length, allSkills.length);
  const rows = distributeIntoRows(allSkills, NUM_ROWS);

  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden"
      style={{ contain: "layout" }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(80,120,255,0.05) 0%, transparent 70%), " +
            "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(120,60,220,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ─── Header ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-[var(--color-accent)]">
            Tech Stack
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--color-text-main)] leading-tight">
            Technologies I Work With
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-muted)] font-sans max-w-xl mx-auto">
            Technologies I use to build modern full-stack and AI-powered products.
          </p>
        </motion.div>
      </div>

      {/* ─── Marquee Rows ─── */}
      <div className="relative z-10 space-y-4">
        {rows.map((rowSkills, rowIdx) => {
          // Skip empty rows
          if (rowSkills.length === 0) return null;
          const cfg = ROW_CONFIGS[rowIdx % ROW_CONFIGS.length];

          // On mobile show only first 3 rows, on tablet first 4
          const mobileHide = rowIdx >= 3 ? "hidden md:block" : "";
          const tabletHide = rowIdx >= 4 ? "md:block lg:block" : "";
          const hideClass = rowIdx >= 3 ? "hidden sm:block" : "";

          return (
            <div key={rowIdx} className={`w-full ${hideClass}`}>
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
      </div>
    </section>
  );
}
