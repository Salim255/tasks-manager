import type { DashboardData } from "../../interfaces/project-home.interface";
import { StatCard } from "../stat-card/StatCard";

export const HeroStats = ({ dashboardData }: {dashboardData?: DashboardData}) => {
  const d = dashboardData?.projectsOverview;

  return (
    <div className="projects-home__hero-stats">

      <StatCard
        label="Active projects"
        value={d?.activeProjectsCount ?? 0}
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
