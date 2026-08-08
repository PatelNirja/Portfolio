import React from "react";
import ProjectCard from "./ProjectCard";
import EmptyState from "../common/EmptyState";
import Spinner from "../common/Spinner";

export default function ProjectGrid({ projects, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" className="text-sky-500" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return <EmptyState title="No projects match your search criteria." description="Try adjusting your filters or search terms." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project._id || project.slug} project={project} />
      ))}
    </div>
  );
}
