import type { Task, TaskStatus } from "../../../../models/task.model";
import { CircleLegend } from "../circle-legend/CircleLegend";
import "./_circle-chart.scss";

export const CircleChart = ({ tasksByStatus }: { tasksByStatus: Record<TaskStatus, Task[ ]>}) => {
    const countStyle = {
    background: `conic-gradient(
        #357DE8 0% 35%,
        #BF63F3 35% 75%,
        #82B536 75% 100%)
    `}
    
    return <>
        <section className="circle-chart">
            <div className="text">
                <div className="circle-chart__chart" style={countStyle}></div>
            </div>
            <CircleLegend  tasksByStatus={tasksByStatus} />
        </section>
    </>

}