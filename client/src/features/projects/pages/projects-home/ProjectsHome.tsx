import { useNavigate } from "react-router-dom";
import "./_projects-home.scss";
import { useEffect } from "react";
import { useDashboardView, useIsFetchingDashboard } from "../../states/projectsSelectors";
import { useDispatch } from "react-redux";
import { fetchDashboardOverviewHttp } from "../../http/project.http";
import type { AppDispatch } from "../../../../redux/store";

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
  const dispatch = useDispatch<AppDispatch>();
  const isFetchingDashboard = useIsFetchingDashboard();
  const dashboardData = useDashboardView();
  const navigate = useNavigate();
  const onCreateProject = () => {
    navigate("/create-project");
  }

  useEffect(() => {
    if(!dashboardData && !isFetchingDashboard) {
      dispatch(fetchDashboardOverviewHttp());
    }
  }, [dispatch,dashboardData,  isFetchingDashboard]);

  
  return (
    <main className="projects-home">
      <section className="projects-home__hero">
        <div className="projects-home__hero-content">
          <span className="projects-home__eyebrow">Workspace overview</span>
          <h1 className="projects-home__title">Build with clarity.</h1>
          <p className="projects-home__subtitle">
            Keep projects, sprints, and tasks aligned in one focused workspace.
            Track delivery, unblock work, and move your team forward without the noise.
          </p>

          <div className="projects-home__hero-actions">
            <button
                onClick={onCreateProject}
                className="btn btn--primary">
              Create project
            </button>
          </div>
        </div>

        <div className="projects-home__hero-stats">
          <article className="projects-home__stat-card">
            <span className="projects-home__stat-label">Active projects</span>
            <strong className="projects-home__stat-value"> { dashboardData? dashboardData?.projectsOverview?.activeProjectsCount : '08' }</strong>
            <span className="projects-home__stat-meta">  { dashboardData? dashboardData?.projectsOverview?.activeProjectsCount : '08' } updated today</span>
          </article>

          <article className="projects-home__stat-card">
            <span className="projects-home__stat-label">Current sprint</span>
            <strong className="projects-home__stat-value">{ dashboardData? dashboardData?.projectsOverview?.tasks?.total : '08' } tasks</strong>
            <span className="projects-home__stat-meta"> { dashboardData? dashboardData?.projectsOverview?.tasks?.inProgress : '08' } in progress · { dashboardData? dashboardData?.projectsOverview?.tasks?.done : '08' } done · { dashboardData? dashboardData?.projectsOverview?.tasks?.todo : '08' } todo</span>
          </article>

          <article className="projects-home__stat-card">
            <span className="projects-home__stat-label">Assigned to me</span>
            <strong className="projects-home__stat-value">{ dashboardData? dashboardData?.assignedToMe?.totalAssigned : '00' }</strong>
            <span className="projects-home__stat-meta"> { dashboardData? dashboardData?.assignedToMe.dueThisWeek : '00' } due this week</span>
          </article>
        </div>
      </section>

      <section className="projects-home__grid">
        <div className="projects-home__main">
          <section className="projects-home__panel">
            <div className="projects-home__panel-header">
              <div>
                <h2 className="projects-home__panel-title">Recent projects</h2>
                <p className="projects-home__panel-subtitle">
                  Pick up where your team left off.
                </p>
              </div>
              <button className="projects-home__text-button">View all</button>
            </div>

            <div className="projects-home__projects-list">
              {
                dashboardData?.recentProjects.map((p) => {
                  return <article key={p.id} className="projects-home__project-card">
                    <div key={p.id} className="projects-home__project-top">
                      <div className="projects-home__project-badge"   style={{ backgroundColor: stringToColor(p.key) }}>{p.key.slice(0,2)}</div>
                      <div>
                        <h3 className="projects-home__project-title">{ p.name }</h3>
                        <p className="projects-home__project-key">{p.key}</p>
                      </div>
                    </div>

                    <div className="projects-home__project-progress">
                      <div className="projects-home__progress-row">
                        <span>Progress</span>
                        <span>{p.progressPercentage}%</span>
                      </div>
                      <div className="projects-home__progress-bar">
                        <span style={{ width: `${p.progressPercentage}%` }} />
                      </div>
                    </div>

                    <div className="projects-home__project-footer">
                      <span className="projects-home__status projects-home__status--progress">
                        Sprint active
                      </span>
                      <span className="projects-home__project-meta">{ p.sprints.active.total } sprints</span>
                    </div>
                  </article>
                })
              }
            </div>
          </section>
        </div>

        <aside className="projects-home__sidebar">
          <section className="projects-home__panel">
            <div className="projects-home__panel-header">
              <div>
                <h2 className="projects-home__panel-title">Assigned to me</h2>
                <p className="projects-home__panel-subtitle">Tasks needing attention</p>
              </div>
            </div>

            <div className="projects-home__tasks-list">
              {
                dashboardData?.assignedToMe?.needsAttention?.today?.map((t) => {
                  return <article key={t.id} className="projects-home__task-item">
                    <div className="projects-home__task-type projects-home__task-type--task" />
                    <div className="projects-home__task-content">
                      <p className="projects-home__task-title">{t.title}</p>
                      <span className="projects-home__task-meta">{t.issueKey} · Today</span>
                    </div>
                  </article>
                })
              }
              
              {
                dashboardData?.assignedToMe?.needsAttention?.tomorrow?.map((t) => {
                  return <article key={t.id} className="projects-home__task-item">
                    <div className="projects-home__task-type projects-home__task-type--story" />
                    <div className="projects-home__task-content">
                      <p className="projects-home__task-title">{t.title}</p>
                      <span className="projects-home__task-meta">{t.issueKey} · Tomorrow</span>
                    </div>
                  </article>
                })
              }

              {
                dashboardData?.assignedToMe?.needsAttention?.highPriority?.map((t) => {
                  return  <article key={t.id} className="projects-home__task-item">
                    <div className="projects-home__task-type projects-home__task-type--bug" />
                    <div className="projects-home__task-content">
                      <p className="projects-home__task-title">{t.title}</p>
                      <span className="projects-home__task-meta"> {t.issueKey} · High priority</span>
                    </div>
                  </article>
                })
              }
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
};