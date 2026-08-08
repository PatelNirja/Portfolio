import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import Spinner from "../../components/common/Spinner";
import SEO from "../../components/common/SEO";
import { projectsApi } from "../../api/projectsApi";
import { profileApi } from "../../api/profileApi";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f19]">
        <Spinner size="lg" className="text-sky-500" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#0b0f19] text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Project Not Found</h2>
        <p className="text-sm text-slate-500 max-w-sm">The project you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-5 py-2.5 bg-sky-600 text-white rounded-xl font-semibold text-xs">
          Return to Home Page
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={project.title} description={project.shortDesc} image={project.thumbnail} />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100">
        <Navbar profile={profile} />

        <main className="flex-1 pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-sky-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-sky-500/10 text-sky-500 border border-sky-500/20">
                {project.category}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Created {formatDate(project.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {project.shortDesc}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 max-h-[500px]">
            <img
              src={project.thumbnail || DEFAULT_PROJECT_THUMB}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action Links & Tech Badges */}
          <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Tech stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
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
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
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
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Project Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Full Description */}
          {project.description && (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Project Breakdown</h2>
              <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
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
