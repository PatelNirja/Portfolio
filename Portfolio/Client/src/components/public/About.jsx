import React, { useEffect, useRef } from "react";
import { MapPin, Mail, Cpu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About({ profile }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!profile) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Cards staggered animation
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [profile]);

  if (!profile) return null;

  return (
    <section id="about" ref={sectionRef} className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div ref={headlineRef} className="text-center space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-accent)] text-glow">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text-main)] leading-tight max-w-4xl mx-auto">
            Engineering High-Performance Web & AI Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Details */}
          <div 
            ref={(el) => (cardsRef.current[0] = el)} 
            className="lg:col-span-7 space-y-8 flex flex-col justify-between p-10 rounded-3xl glass border border-[var(--color-surface-border)]"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-[var(--color-text-main)] leading-snug">
                Building resilient software architecture with clean, scalable code.
              </h3>
              <p className="text-[var(--color-text-muted)] font-sans leading-relaxed text-lg">
                {profile.bio || "Full stack software engineer specializing in scalable React interfaces, Node.js microservices, and AI-driven architectures."}
              </p>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--color-surface-border)]/50">
              {profile.location && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-surface)]/40 border border-[var(--color-surface-border)] transition-colors hover:bg-[var(--color-surface-hover)]">
                  <div className="p-2.5 rounded-xl bg-[var(--color-accent-muted)] text-[var(--color-accent)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-sans text-[11px] uppercase tracking-wider font-bold text-[var(--color-text-muted)] block">Location</span>
                    <p className="text-base font-semibold text-[var(--color-text-main)]">{profile.location}</p>
                  </div>
                </div>
              )}

              {profile.email && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-surface)]/40 border border-[var(--color-surface-border)] transition-colors hover:bg-[var(--color-surface-hover)]">
                  <div className="p-2.5 rounded-xl bg-[var(--color-accent-muted)] text-[var(--color-accent)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-sans text-[11px] uppercase tracking-wider font-bold text-[var(--color-text-muted)] block">Email</span>
                    <p className="text-base font-semibold text-[var(--color-text-main)] truncate">{profile.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual Card */}
          <div 
            ref={(el) => (cardsRef.current[1] = el)}
            className="lg:col-span-5 p-10 rounded-3xl glass-card flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[var(--color-accent)]">
                <div className="p-2 rounded-lg bg-[var(--color-accent-muted)]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-xl text-[var(--color-text-main)]">Core Principles</h4>
              </div>
              <ul className="space-y-5 text-base font-sans text-[var(--color-text-muted)]">
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-accent)]" />
                  <span><strong className="text-[var(--color-text-main)] font-semibold">Multi-Agent AI Integration:</strong> Orchestrating specialized agent networks for complex workflows.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-main)] mt-2.5 shrink-0" />
                  <span><strong className="text-[var(--color-text-main)] font-semibold">Modern MERN Stack:</strong> React 19, Node.js, Express, MongoDB with stateless JWT authentication.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-accent)]" />
                  <span><strong className="text-[var(--color-text-main)] font-semibold">High-Performance UI:</strong> Framer Motion physics, Tailwind CSS tokens, & responsive layout baselines.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-main)] mt-2.5 shrink-0" />
                  <span><strong className="text-[var(--color-text-main)] font-semibold">Clean Code & Security:</strong> Strict state isolation, rate limiting, and defensive input validation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
