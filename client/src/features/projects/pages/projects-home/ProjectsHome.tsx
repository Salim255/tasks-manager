import { useNavigate } from "react-router-dom";
import "./_projects-home.scss";
import { useEffect, useState } from "react";
import { useDashboardView, useIsFetchingDashboard } from "../../states/projectsSelectors";
import { useDispatch } from "react-redux";
import { fetchDashboardOverviewHttp } from "../../http/project.http";
import type { AppDispatch } from "../../../../redux/store";
import { setActiveProject } from "../../states/projectSlice";
import { HeroSection } from "./components/hero-section/HeroSection";
import { HeroStats } from "./components/hero-stats/HeroStats";
import { ProjectsPanel } from "./components/projects-panel/ProjectsPanel";
import { AssignedToMePanel } from "./components/assigned-to-me-panel/AssignedToMePanel";

export function stringToColor(value: string): string {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  const saturation = 55 + (Math.abs(hash >> 8) % 25); // 55-80%
  const lightness = 40 + (Math.abs(hash >> 16) % 20); // 40-60%

  return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.14)`;
}

export const ProjectsHome = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isFetchingDashboard = useIsFetchingDashboard();
  const dashboardData = useDashboardView();
  const navigate = useNavigate();
  const onCreateProject = () => {
    navigate("/create-project");
  }

  const visibleProjects = showAllProjects
    ? dashboardData?.recentProjects ?? [] 
    : (dashboardData?.recentProjects ?? []).slice(0, 6);
  
  const hasMoreProjects =
    (dashboardData?.recentProjects?.length ?? 0) > 6;

  const onNavigateProject = (project: any ) => {
    if (!project?.id || !project?.key) return;
    
    dispatch(setActiveProject({projectId: project?.id}));
    queueMicrotask(() => {
      navigate(`/workspaces/${project?.key}/board`);
    })
  }

  useEffect(() => {
    if(!dashboardData && !isFetchingDashboard) {
      dispatch(fetchDashboardOverviewHttp());
    }
  }, [dispatch,dashboardData,  isFetchingDashboard]);

  
  return (
    <main className="projects-home">
      
      
      <section className="projects-home__hero">
        <HeroSection onCreateProject={onCreateProject} />

        <HeroStats dashboardData={dashboardData} />
      </section>

      <section className="projects-home__grid">
        <div className="projects-home__main">
           <ProjectsPanel
            visibleProjects={visibleProjects}
            hasMoreProjects={hasMoreProjects}
            showAllProjects={showAllProjects}
            setShowAllProjects={setShowAllProjects}
            onNavigateProject={onNavigateProject}
          />
        </div>

        <aside className="projects-home__sidebar">
          <AssignedToMePanel dashboardData={dashboardData} />
        </aside>
      </section>
    </main>
  );
};