import "./_bar-chart-container.scss";
import type { TaskStatus } from "../../../../models/task.model";
import { PieChart } from "../../../../../../shared/kits/pie-chart/PieChart";


export const TypeTasksChart = ({
    circleChartDataPercentage,
}: { 
    circleChartDataPercentage: Record<TaskStatus, { label: TaskStatus; nb: number; value: number }>;
} ) => {
    return <div className="bar-chart-container" >
        <h4 className="tasks-counter__title">Status overview</h4>
        <div>
          <PieChart /> 
        </div>      
    </div>
}