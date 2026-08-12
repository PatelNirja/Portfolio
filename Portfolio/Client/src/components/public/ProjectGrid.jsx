import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import EmptyState from "../common/EmptyState";
import Spinner from "../common/Spinner";

export default function ProjectGrid({ projects, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" className="text-[var(--color-accent)]" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return <EmptyState title="No projects match your search criteria." description="Try adjusting your filters or search terms." />;
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
    >
      <AnimatePresence>
        {projects.map((project) => (
          <ProjectCard key={project._id || project.slug} project={project} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

