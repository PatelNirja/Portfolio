import React, { useState, useEffect } from "react";
import Navbar from "../../components/public/Navbar";
import Hero from "../../components/public/Hero";
import About from "../../components/public/About";
import Skills from "../../components/public/Skills";
import ProjectFilters from "../../components/public/ProjectFilters";
import ProjectGrid from "../../components/public/ProjectGrid";
import Experience from "../../components/public/Experience";
import Education from "../../components/public/Education";
import Achievements from "../../components/public/Achievements";
import Certificates from "../../components/public/Certificates";
import Contact from "../../components/public/Contact";
import Footer from "../../components/public/Footer";
import SEO from "../../components/common/SEO";
import { profileApi } from "../../api/profileApi";
import { skillsApi } from "../../api/skillsApi";
import { projectsApi } from "../../api/projectsApi";
import { experienceApi } from "../../api/experienceApi";
import { educationApi } from "../../api/educationApi";
import { achievementsApi } from "../../api/achievementsApi";
import { certificatesApi } from "../../api/certificatesApi";
import { useDebounce } from "../../hooks/useDebounce";

export default function HomePage() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [projectsLoading, setProjectsLoading] = useState(true);

  // Fetch initial profile & static data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [pRes, sRes, eRes, edRes, aRes, cRes] = await Promise.all([
          profileApi.getProfile(),
          skillsApi.getSkills(),
          experienceApi.getExperiences(),
          educationApi.getEducations(),
          achievementsApi.getAchievements(),
          certificatesApi.getCertificates(),
        ]);

        if (pRes.success) setProfile(pRes.data.profile);
        if (sRes.success) setSkills(sRes.data.skills);
        if (eRes.success) setExperiences(eRes.data.experiences);
        if (edRes.success) setEducations(edRes.data.educations);
        if (aRes.success) setAchievements(aRes.data.achievements);
        if (cRes.success) setCertificates(cRes.data.certificates);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch projects dynamically on category/search change
  useEffect(() => {
    const fetchProjects = async () => {
      setProjectsLoading(true);
      try {
        const res = await projectsApi.getProjects({
          category: activeCategory,
          search: debouncedSearch,
        });
        if (res.success) {
          setProjects(res.data.projects || []);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, [activeCategory, debouncedSearch]);

  return (
    <>
      <SEO
        title={profile?.name ? `${profile.name} — Portfolio` : "Portfolio"}
        description={profile?.tagline || "Full Stack Web Portfolio"}
      />
      <div className="bg-noise"></div>
      <div className="relative min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text-main)] selection:bg-[var(--color-accent)] selection:text-[#0B0D10]">
        <Navbar profile={profile} />

        <main className="flex-1 relative z-10">
          <Hero profile={profile} />
          <About profile={profile} />
          <Skills skills={skills} />

          {/* Projects Section */}
          <section id="projects" className="py-24 relative overflow-hidden">
            {/* Subtle background glow for projects section */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)]/20 to-[var(--color-background)] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-3 mb-16">
                <span className="section-eyebrow text-glow">
                  Selected Work
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading">
                  Projects & Applications
                </h2>
              </div>

              <ProjectFilters
                activeCategory={activeCategory}
                onSelectCategory={(cat) => setActiveCategory(cat)}
                searchQuery={searchQuery}
                onSearchChange={(q) => setSearchQuery(q)}
              />

              <ProjectGrid projects={projects} isLoading={projectsLoading} />
            </div>
          </section>

          <Experience experiences={experiences} />
          <Education educations={educations} />
          <Achievements achievements={achievements} />
          <Certificates certificates={certificates} />
          <Contact profile={profile} />
        </main>

        <Footer profile={profile} />
      </div>
    </>
  );
}
