import { useEffect } from "react";
import { useTasksSelector } from "../../states/taskSelectors";
import "./_statistics.scss";
import { useStatisticsData } from "./hooks/statisticsHooks";
import { useSprintSelector } from "../../states/sprintSelectors";
import { TasksStatusChart } from "./components/tasks-status-chart/TasksStatusChart";
import { TypeTasksChart } from "./components/type-tasks-chart/TypeTasksChart";

export const  Statistics = () => {
    const { tasks } = useTasksSelector();
     const { sprints } = useSprintSelector();
    const { barChartDataPercentage, circleChartDataPercentage } = useStatisticsData(tasks);

    useEffect(() => {}, [tasks, sprints])
    return <section className="statistics">
        <div className="statistics__status">
            <TypeTasksChart circleChartDataPercentage={circleChartDataPercentage}/>
        </div>
        <div className="statistics__work-types">
            <TasksStatusChart barChartDataPercentage={barChartDataPercentage} />
        </div>
    </section>
}