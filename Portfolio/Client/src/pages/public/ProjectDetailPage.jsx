import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import Spinner from "../../components/common/Spinner";
import SEO from "../../components/common/SEO";
import { projectsApi } from "../../api/projectsApi";
import { profileApi } from "../../api/profileApi";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { DEFAULT_PROJECT_THUMB } from "../../utils/constants";
import { formatDate } from "../../utils/formatDate";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectAndProfile = async () => {
      setLoading(true);
      try {
        const [projRes, profRes] = await Promise.all([
          projectsApi.getProjectBySlug(slug),
          profileApi.getProfile(),
        ]);

        if (projRes.success) setProject(projRes.data.project);
        if (profRes.success) setProfile(profRes.data.profile);
      } catch (err) {
        setError(err.message || "Project not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndProfile();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <Spinner size="lg" className="text-[var(--color-accent)]" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--color-background)] text-center space-y-6">
        <h2 className="text-3xl font-display font-bold text-[var(--color-text-main)]">Project Not Found</h2>
        <p className="text-sm font-sans text-[var(--color-text-muted)] max-w-sm">The project you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-background)] rounded-xl font-sans font-bold text-sm shadow-[0_0_15px_var(--color-accent-muted)] hover:bg-[var(--color-accent-hover)] transition-all">
          Return to Home Page
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={project.title} description={project.shortDesc} image={project.thumbnail} />
      <div className="bg-noise"></div>
      <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text-main)]">
        <Navbar profile={profile} />

        <main className="flex-1 pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10 relative z-10">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                {project.category}
              </span>
              <span className="text-xs font-mono font-medium text-[var(--color-text-muted)]">
                Created {formatDate(project.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-text-main)] leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-text-muted)] font-sans leading-relaxed max-w-3xl">
              {project.shortDesc}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-3xl overflow-hidden glass-card max-h-[500px]">
            <img
              src={project.thumbnail || DEFAULT_PROJECT_THUMB}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action Links & Tech Badges */}
          <div className="flex flex-wrap items-center justify-between gap-6 p-8 rounded-3xl glass-card">
            {/* Tech stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-sans font-bold tracking-widest text-[var(--color-text-muted)] block">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-[var(--color-text-main)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl glass border border-[var(--color-surface-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-main)] font-sans font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-background)] font-sans font-bold text-xs shadow-[0_0_15px_var(--color-accent-muted)] flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Project Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Full Description */}
          {project.description && (
            <div className="p-8 sm:p-10 rounded-3xl glass-card space-y-6">
              <h2 className="text-2xl font-display font-bold text-[var(--color-text-main)]">Project Breakdown</h2>
              <div className="text-base text-[var(--color-text-muted)] font-sans leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>
            </div>
          )}
        </main>

        <Footer profile={profile} />
      </div>
    </>
  );
}
