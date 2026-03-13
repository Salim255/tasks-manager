import type { Task, TaskStatus } from "../../../../models/task.model";
import "./_circle-chart.scss";

export const CircleChart = ({ tasksByStatus }: { tasksByStatus: Record<TaskStatus, Task[ ]>}) => {
    const countStyle = {
    background: `conic-gradient(
        red 0% 35%,
        blue 35% 75%,
        rgb(68, 255, 0) 75% 100%)
    `}
    
    return <>
        <section className="circle-chart">
            <div className="circle-chart__chart" style={countStyle}></div>
            <div className="circle-chart__legend">
                <div className="circle-chart__todo">
                    <span></span>  To Do { tasksByStatus.todo.length }
                </div>
                <div className="circle-chart__progress">
                    <span></span> In progress { tasksByStatus.in_progress.length }
                </div>
                <div className="circle-chart__done">
                    <span></span> Done { tasksByStatus.done.length }
                </div>
            </div>
        </section>
    </>

}