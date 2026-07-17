export const AssignedToMePanel = ({ dashboardData }) => {
  const today = dashboardData?.assignedToMe?.needsAttention?.today ?? [];
  const tomorrow = dashboardData?.assignedToMe?.needsAttention?.tomorrow ?? [];
  const high = dashboardData?.assignedToMe?.needsAttention?.highPriority ?? [];

  return (
    <section className="projects-home__panel">

      <div className="projects-home__panel-header">
        <div>
          <h2 className="projects-home__panel-title">Assigned to me</h2>
          <p className="projects-home__panel-subtitle">Tasks needing attention</p>
        </div>
      </div>

      <div className="projects-home__tasks-list">
        {today.map((t) => <TaskItem key={t.id} task={t} type="task" meta="Today" />)}
        {tomorrow.map((t) => <TaskItem key={t.id} task={t} type="story" meta="Tomorrow" />)}
        {high.map((t) => <TaskItem key={t.id} task={t} type="bug" meta="High priority" />)}
      </div>

    </section>
  );
};
