import { useTasks } from "../../../tasks/states/taskSelectors";
import "./_tasks-list.scss";
import { PageMotion } from "../../../../shared/motion/PageMotion";
import { DataTable } from "./components/data-table/DataTable";
import { useTaskColumns } from "./hooks/useTaskColumns";

export const TasksList = () => {
    const tasks = useTasks();
    
    const columns = useTaskColumns();
   return (
    <PageMotion>
        <div className="data-table-container">

            <div className="data-table-scroll scroll-bar">
                <DataTable  columns={columns} data={tasks}/>
            </div>

        </div>
        
    </PageMotion>
    );
}