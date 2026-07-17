import "./_statistics.scss";
import { useTasks } from "../../../tasks/states/taskSelectors";
import { useStatisticsData } from "./hooks/statisticsHooks";
import { TypeWorkChart } from "./components/type-work-chart/TypeWorkChart";
import { WorkStatusChart } from "./components/work-status-chart/WorkStatusChart";
import { PageMotion } from "../../../../shared/motion/PageMotion";
import { useActiveProject, useIsLoadingActiveProject } from "../../states/projectsSelectors";
import { StatisticsSkeleton } from "../../skeletons/StatisticsSkeleton";
import { Navigate } from "react-router-dom";

export const  Statistics = () => {
    const tasks = useTasks();
    const isLoading = useIsLoadingActiveProject();
    const activeProject = useActiveProject();

    const { barChartDataPercentage, circleChartDataPercentage } = useStatisticsData(tasks);

    if(!isLoading && !activeProject) {
        return <Navigate to="/workspaces" replace />;
    }

    return (
        <PageMotion>
            {isLoading ? (
            <StatisticsSkeleton />
            ) : (
            <section className="statistics">
                <div className="statistics__work-status">
                <WorkStatusChart circleChartDataPercentage={circleChartDataPercentage}/>
                </div>

                <div className="statistics__work-types">
                <TypeWorkChart barChartDataPercentage={barChartDataPercentage}/>
                </div>
            </section>
            )}
        </PageMotion>
    )
}