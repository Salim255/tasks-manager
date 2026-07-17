export const HeroStats = ({ dashboardData }) => {
  const d = dashboardData?.projectsOverview;

  return (
    <div className="projects-home__hero-stats">

      <StatCard
        label="Active projects"
        value={d?.activeProjectsCount}
        meta={`${d?.activeProjectsCount} updated today`}
      />

      <StatCard
        label="Current sprint"
        value={`${d?.tasks?.total} tasks`}
        meta={`${d?.tasks?.inProgress} in progress · ${d?.tasks?.done} done · ${d?.tasks?.todo} todo`}
      />

      <StatCard
        label="Assigned to me"
        value={`${dashboardData?.assignedToMe?.totalAssigned} tasks`}
        meta={`${dashboardData?.assignedToMe?.dueThisWeek} due this week`}
      />

    </div>
  );
};
