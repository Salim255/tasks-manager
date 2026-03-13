import { useTasksSelector } from "../../states/taskSelectors";
import "./_statistics.scss";
import { useStatisticsData } from "./hooks/statisticsHooks";

export const  Statistics = () => {
    const { tasks } = useTasksSelector();
     const { sprints } = useSprintSelector();
    const {} = useStatisticsData(tasks);

    return <section className="statistics">
            <div className="statistics__status">
               status
            </div>
            <div className="statistics__work-types">
                work type
            </div>
    </section>
}