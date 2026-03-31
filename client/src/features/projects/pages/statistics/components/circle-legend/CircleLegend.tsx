import "./_circle-legend.scss";
import type { TaskStatus } from "../../../../models/task.model";

export const CircleLegend = ({circleChartDataPercentage}: { circleChartDataPercentage: Record<TaskStatus, { label: string; nb: number; value: number }> }) => {
    return  (
    <div className="circle-legend">
        <div className="circle-legend__todo">
            <span></span> To Do: { circleChartDataPercentage.todo.nb }
        </div>
        <div className="circle-legend__progress">
            <span></span> In progress: { circleChartDataPercentage.in_progress.nb }
        </div>
        <div className="circle-legend__done">
            <span></span> Done: { circleChartDataPercentage.done.nb }
        </div>
    </div>
    )
}