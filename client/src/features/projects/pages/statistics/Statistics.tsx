import "./_statistics.scss";
import { useEffect } from "react";
import { useTasksSelector } from "../../../tasks/states/taskSelectors";
import { useStatisticsData } from "./hooks/statisticsHooks";
import { useSprints } from "../../../sprints/states/sprintSelectors";
import { TypeWorkChart } from "./components/type-work-chart/TypeWorkChart";
import { WorkStatusChart } from "./components/work-status-chart/WorkStatusChart";

export const  Statistics = () => {
    const { tasks } = useTasksSelector();
    const sprints  = useSprints();
    const { barChartDataPercentage, circleChartDataPercentage } = useStatisticsData(tasks);

    useEffect(() => {}, [tasks, sprints])
    return <section className="statistics">
        <div className="statistics__work-status">
            <WorkStatusChart circleChartDataPercentage={circleChartDataPercentage}/>
        </div>
        <div className="statistics__work-types">
            <TypeWorkChart barChartDataPercentage={barChartDataPercentage} />
        </div>
    </section>
}