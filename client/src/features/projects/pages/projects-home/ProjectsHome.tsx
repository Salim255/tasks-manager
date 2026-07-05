import { useNavigate } from "react-router-dom";
import "./_projects-home.scss";

export const ProjectsHome = () => {
  const navigate = useNavigate();
  const onCreateProject = () => {
    navigate("/create-project");
  }

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
                className="projects-home__button
                projects-home__button--primary">
              Create project
            </button>
          {/*   <button className="projects-home__button projects-home__button--secondary">
              Start sprint
            </button> */}
          </div>
        </div>

        <div className="projects-home__hero-stats">
          <article className="projects-home__stat-card">
            <span className="projects-home__stat-label">Active projects</span>
            <strong className="projects-home__stat-value">08</strong>
            <span className="projects-home__stat-meta">2 updated today</span>
          </article>

          <article className="projects-home__stat-card">
            <span className="projects-home__stat-label">Current sprint</span>
            <strong className="projects-home__stat-value">24 tasks</strong>
            <span className="projects-home__stat-meta">6 in progress · 12 done</span>
          </article>

          <article className="projects-home__stat-card">
            <span className="projects-home__stat-label">Assigned to me</span>
            <strong className="projects-home__stat-value">11</strong>
            <span className="projects-home__stat-meta">3 due this week</span>
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
              <article className="projects-home__project-card">
                <div className="projects-home__project-top">
                  <div className="projects-home__project-badge">WB</div>
                  <div>
                    <h3 className="projects-home__project-title">Website rebuild</h3>
                    <p className="projects-home__project-key">WB · Product design</p>
                  </div>
                </div>

                <div className="projects-home__project-progress">
                  <div className="projects-home__progress-row">
                    <span>Progress</span>
                    <span>68%</span>
                  </div>
                  <div className="projects-home__progress-bar">
                    <span style={{ width: "68%" }} />
                  </div>
                </div>

                <div className="projects-home__project-footer">
                  <span className="projects-home__status projects-home__status--progress">
                    Sprint active
                  </span>
                  <span className="projects-home__project-meta">12 tasks</span>
                </div>
              </article>

              <article className="projects-home__project-card">
                <div className="projects-home__project-top">
                  <div className="projects-home__project-badge projects-home__project-badge--green">
                    AP
                  </div>
                  <div>
                    <h3 className="projects-home__project-title">Admin portal</h3>
                    <p className="projects-home__project-key">AP · Internal tools</p>
                  </div>
                </div>

                <div className="projects-home__project-progress">
                  <div className="projects-home__progress-row">
                    <span>Progress</span>
                    <span>42%</span>
                  </div>
                  <div className="projects-home__progress-bar">
                    <span style={{ width: "42%" }} />
                  </div>
                </div>

                <div className="projects-home__project-footer">
                  <span className="projects-home__status projects-home__status--todo">
                    Planning
                  </span>
                  <span className="projects-home__project-meta">8 tasks</span>
                </div>
              </article>

              <article className="projects-home__project-card">
                <div className="projects-home__project-top">
                  <div className="projects-home__project-badge projects-home__project-badge--orange">
                    MB
                  </div>
                  <div>
                    <h3 className="projects-home__project-title">Mobile backlog</h3>
                    <p className="projects-home__project-key">MB · Feature stream</p>
                  </div>
                </div>

                <div className="projects-home__project-progress">
                  <div className="projects-home__progress-row">
                    <span>Progress</span>
                    <span>87%</span>
                  </div>
                  <div className="projects-home__progress-bar">
                    <span style={{ width: "87%" }} />
                  </div>
                </div>

                <div className="projects-home__project-footer">
                  <span className="projects-home__status projects-home__status--done">
                    Near release
                  </span>
                  <span className="projects-home__project-meta">5 tasks</span>
                </div>
              </article>
            </div>
          </section>

          <section className="projects-home__panel">
            <div className="projects-home__panel-header">
              <div>
                <h2 className="projects-home__panel-title">Current sprint</h2>
                <p className="projects-home__panel-subtitle">
                  Sprint 12 · Platform stabilization
                </p>
              </div>
              <button className="projects-home__text-button">Open board</button>
            </div>

            <div className="projects-home__sprint-overview">
              <article className="projects-home__metric-card">
                <span className="projects-home__metric-label">To do</span>
                <strong className="projects-home__metric-value">09</strong>
              </article>
              <article className="projects-home__metric-card">
                <span className="projects-home__metric-label">In progress</span>
                <strong className="projects-home__metric-value">06</strong>
              </article>
              <article className="projects-home__metric-card">
                <span className="projects-home__metric-label">Done</span>
                <strong className="projects-home__metric-value">12</strong>
              </article>
              <article className="projects-home__metric-card">
                <span className="projects-home__metric-label">Blocked</span>
                <strong className="projects-home__metric-value">02</strong>
              </article>
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
              <article className="projects-home__task-item">
                <div className="projects-home__task-type projects-home__task-type--task" />
                <div className="projects-home__task-content">
                  <p className="projects-home__task-title">Implement sprint creation flow</p>
                  <span className="projects-home__task-meta">FLOW-18 · Today</span>
                </div>
              </article>

              <article className="projects-home__task-item">
                <div className="projects-home__task-type projects-home__task-type--story" />
                <div className="projects-home__task-content">
                  <p className="projects-home__task-title">Refine board filtering UX</p>
                  <span className="projects-home__task-meta">FLOW-21 · Tomorrow</span>
                </div>
              </article>

              <article className="projects-home__task-item">
                <div className="projects-home__task-type projects-home__task-type--bug" />
                <div className="projects-home__task-content">
                  <p className="projects-home__task-title">Fix duplicate project key validation</p>
                  <span className="projects-home__task-meta">FLOW-24 · High priority</span>
                </div>
              </article>
            </div>
          </section>

          <section className="projects-home__panel">
            <div className="projects-home__panel-header">
              <div>
                <h2 className="projects-home__panel-title">Quick actions</h2>
                <p className="projects-home__panel-subtitle">Jump into the next step</p>
              </div>
            </div>

            <div className="projects-home__actions">
              <button className="projects-home__action-card">
                <span className="projects-home__action-title">Create task</span>
                <span className="projects-home__action-text">
                  Add a new task to the active sprint.
                </span>
              </button>

              <button className="projects-home__action-card">
                <span className="projects-home__action-title">Add sprint</span>
                <span className="projects-home__action-text">
                  Plan the next iteration and goals.
                </span>
              </button>

              <button className="projects-home__action-card">
                <span className="projects-home__action-title">Invite member</span>
                <span className="projects-home__action-text">
                  Bring teammates into the workspace.
                </span>
              </button>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
};