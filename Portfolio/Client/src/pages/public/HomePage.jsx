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
        title={profile?.name ? `${profile.name} — Portfolio` : "Portfolio CMS"}
        description={profile?.tagline || "Full Stack Web Portfolio"}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white">
        <Navbar profile={profile} />

        <main className="flex-1">
          <Hero profile={profile} />
          <About profile={profile} />
          <Skills skills={skills} />

          {/* Projects Section */}
          <section id="projects" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-2 mb-12">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  Featured Work
                </h2>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
                  Projects & Applications
                </p>
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
