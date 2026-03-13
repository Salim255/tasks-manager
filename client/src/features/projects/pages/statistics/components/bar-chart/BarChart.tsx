import "./_bar-chart.scss";
import type { Task, TaskStatus } from "../../../../models/task.model";

export const BarChart = ({ tasksByStatus }: { tasksByStatus: Record<TaskStatus, Task[ ]>}) => {
    const chartData = [
        { label: "Task", value: tasksByStatus.done.length },
        { label: "Bug", value: tasksByStatus.in_progress.length },
        { label: "Story", value: tasksByStatus.done.length }
    ];

     const max = Math.max(...chartData.map(d => d.value));

    return <div className="bar-char">
        {
           chartData.map((bar) => {
            const percent = max ? (bar.value / max) * 100 : 0;
            return (
                <div key={bar.label} className="bar-char__item">
                    <div 
                        className="bar"
                        style={{ "--value": `${percent}%` } as React.CSSProperties}
                    >
                        <span className="bar__value">{bar.value}</span>
                        <span className="bar__label">{bar.label}</span>
                    </div>
                </div>
            )
           }) 
        }
           
        </div>
}