import { useNavigate } from "react-router-dom";
import "./_projects-home.scss";
import { useState } from "react";
import { useDashboardView, useIsFetchingDashboard } from "../../states/projectsSelectors";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { setActiveProject } from "../../states/projectSlice";
import { HeroSection } from "./components/hero-section/HeroSection";
import { HeroStats } from "./components/hero-stats/HeroStats";
import { ProjectsPanel } from "./components/projects-panel/ProjectsPanel";
import { AssignedToMePanel } from "./components/assigned-to-me-panel/AssignedToMePanel";
import { PageMotion } from "../../../../shared/motion/PageMotion";
import { ProjectsHomeSkeleton } from "./skeletons/ProjectsHomeSkeleton";


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

  return (
    <PageMotion>
      <main className="projects-home">
        {
          isFetchingDashboard
          ? <ProjectsHomeSkeleton/>
          : (
            <>  
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
            </>
          )
          } 
        </main>
    </PageMotion>
   
  );
};