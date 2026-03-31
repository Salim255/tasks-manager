import type { TaskStatus } from "../../../../models/task.model";
import { CircleLegend } from "../circle-legend/CircleLegend";
import "./_circle-chart.scss";


export const CircleChart = ({
    circleChartDataPercentage,
}: {
    circleChartDataPercentage: Record<TaskStatus, { label: string; nb: number; value: number }>;
}) => {
    const p1 = circleChartDataPercentage.in_progress.value;
    const p2 = circleChartDataPercentage.todo.value;
    const p3 = circleChartDataPercentage.done.value;

    const e1 = p1;
    const e2 = p1 + p2;
    const e3 = p1 + p2 + p3;
    const countStyle = {
        background: `conic-gradient(
            #357DE8 0% ${e1}%,
            #BF63F3 ${e1}% ${e2}%,
            #82B536 ${e2}% ${e3}%
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
                <CircleLegend  circleChartDataPercentage={circleChartDataPercentage} />
            </section>
        }
    </>

}