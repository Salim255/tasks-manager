import "./_bar-chart.scss";
import type { TaskType } from "../../../../models/task.model";
import { typeIcon } from "../../../../../../shared/utils/methods";

export const BarChart = ({ 
    barChartDataPercentage,
 }: { 
    barChartDataPercentage: Record<TaskType, { label: string; nb: number; value: number }>,
}) => {


    //const max = Math.max(...chartData.map(d => d.value));
    return <div className="bar-char">
        {
            (Object?.keys(barChartDataPercentage) as TaskType[])?.map((key) => {
                 return (
                <div 
                    key={barChartDataPercentage[key].label} 
                    id={barChartDataPercentage[key].label} 
                    className="bar-char__item">
                    <div 
                        className="bar"
                        style={{ "--value": `${barChartDataPercentage[key].value}%` } as React.CSSProperties}
                    >
                        <p className="bar__value">{barChartDataPercentage[key].value} %</p>
                    </div>
                   <p className="item-label"> <span> {typeIcon(barChartDataPercentage[key].label)} </span>{barChartDataPercentage[key].label}</p>
                </div>
            )
            }) 
        } 
        </div>
}