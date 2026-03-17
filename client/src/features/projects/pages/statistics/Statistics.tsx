import { useEffect } from "react";
import { useTasksSelector } from "../../states/taskSelectors";
import "./_statistics.scss";
import { useStatisticsData } from "./hooks/statisticsHooks";
import { useSprintSelector } from "../../states/sprintSelectors";
import { TasksInPercent } from "./components/tasks-in-percent/TasksInPercent";
import { TasksCounter } from "./components/tasks-counter/TasksCounter";

export const  Statistics = () => {
    const { tasks } = useTasksSelector();
     const { sprints } = useSprintSelector();
    const { tasksByStatus, barChartDataPercentage } = useStatisticsData(tasks);

    useEffect(() => {}, [tasks, sprints])
    return <section className="statistics">
            <div className="statistics__status">
               <TasksCounter tasksByStatus={tasksByStatus}/>
            </div>
            <div className="statistics__work-types">
                < TasksInPercent barChartDataPercentage={barChartDataPercentage} />
            </div>
    </section>
}