import "./_statistics.scss";
import { useEffect } from "react";
import { useTasks } from "../../../tasks/states/taskSelectors";
import { useStatisticsData } from "./hooks/statisticsHooks";
import { useSprints } from "../../../sprints/states/sprintSelectors";
import { TypeWorkChart } from "./components/type-work-chart/TypeWorkChart";
import { WorkStatusChart } from "./components/work-status-chart/WorkStatusChart";
import { PageMotion } from "../../../../shared/motion/PageMotion";

export const  Statistics = () => {
    const tasks = useTasks();
  
    const { barChartDataPercentage, circleChartDataPercentage } = useStatisticsData(tasks);

    return <PageMotion>
        <section className="statistics">
            <div className="statistics__work-status">
                <WorkStatusChart circleChartDataPercentage={circleChartDataPercentage}/>
            </div>
            <div className="statistics__work-types">
                <TypeWorkChart barChartDataPercentage={barChartDataPercentage} />
            </div>
        </section>
    </PageMotion>
}