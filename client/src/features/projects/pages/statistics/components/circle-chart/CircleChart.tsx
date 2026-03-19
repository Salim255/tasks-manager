import type { Task, TaskStatus } from "../../../../models/task.model";
import { CircleLegend } from "../circle-legend/CircleLegend";
import "./_circle-chart.scss";


export const CircleChart = ({
    tasksByStatus,
    circleChartDataPercentage,
}: {
    tasksByStatus: Record<TaskStatus, Task[ ]>;
    circleChartDataPercentage: Record<TaskStatus, { label: string; nb: number; value: number }>;
}) => {
    const countStyle = {
    background: `conic-gradient(
        #357DE8 
            0% 
            ${circleChartDataPercentage.in_progress.value}%,
        #BF63F3 
            ${circleChartDataPercentage.in_progress.value}% 
            ${circleChartDataPercentage.todo.value}%,
        #82B536
             ${circleChartDataPercentage.todo.value}%
              ${circleChartDataPercentage.done.value}%
        )`
    }

    const isEmptyProject =():boolean => {
        return !circleChartDataPercentage.done.value
        && !circleChartDataPercentage.in_progress.value
        && !circleChartDataPercentage.todo.value;
    }
    return <>
        {
            isEmptyProject()
            ? 
            <section className="circle-place-holder">
                <p> No work items yet! </p>
            </section>
            :
            <section className="circle-chart">
                <div className="circle-chart__circle-container">
                    <div className="circle-chart__chart" style={countStyle}></div>
                </div>
                <CircleLegend  tasksByStatus={tasksByStatus} />
            </section>
        }
    </>

}