import "./_bar-chart.scss";
import type { TaskType } from "../../../../models/task.model";

export const BarChart = ({ barChartDataPercentage }: { barChartDataPercentage: Record<TaskType, {label: string; nb: number; value: number}>}) => {


    //const max = Math.max(...chartData.map(d => d.value));
    return <div className="bar-char">
        {
            (Object?.keys(barChartDataPercentage) as TaskType[])?.map((key) => {
                 return (
                <div key={barChartDataPercentage[key].label} className="bar-char__item">
                    <div 
                        className="bar"
                        style={{ "--value": `${barChartDataPercentage[key].value}%` } as React.CSSProperties}
                    >
                        <span className="bar__value">{barChartDataPercentage[key].value} %</span>
                      {/*   <span className="bar__label">{barChartDataPercentage[key].label}</span> */}
                    </div>
                   <h1>{barChartDataPercentage[key].label}</h1>
                </div>
            )
            }) 
        } 
        </div>
}