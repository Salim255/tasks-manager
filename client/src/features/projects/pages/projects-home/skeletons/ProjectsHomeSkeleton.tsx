import React from "react";
import { HeroSectionSkeleton } from "./HeroSectionSkeleton";
import { HeroStatsSkeleton } from "./HeroStatsSkeleton";
import { ProjectsPanelSkeleton } from "./ProjectsPanelSkeleton";
import { AssignedToMePanelSkeleton } from "./AssignedToMePanelSkeleton";

export const ProjectsHomeSkeleton: React.FC = () => {
  return (
    <main className="projects-home">

      <HeroSectionSkeleton />

      <HeroStatsSkeleton />

      <section className="projects-home__grid">

        <div className="projects-home__main">
          <ProjectsPanelSkeleton />
        </div>

        <aside className="projects-home__sidebar">
          <AssignedToMePanelSkeleton />
        </aside>

      </section>
    </main>
  );
};
