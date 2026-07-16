import { useTasks } from "../../../tasks/states/taskSelectors";
import "./_tasks-list.scss";
import { PageMotion } from "../../../../shared/motion/PageMotion";
import { DataTable } from "./components/data-table/DataTable";
import { useTaskColumns } from "./hooks/useTaskColumns";
import { useIsLoadingActiveProject } from "../../states/projectsSelectors";
import { DataTableSkeleton } from "../../skeletons/DataTableSkeleton";

export const TasksList = () => {
    const tasks = useTasks();
    const isLoading = useIsLoadingActiveProject();
    const columns = useTaskColumns();

   return (
    <PageMotion>
        <div className="data-table-container">

            <div className="data-table-scroll scroll-bar">
               {
                isLoading 
                ? <DataTableSkeleton/>
                :  <DataTable  columns={columns} data={tasks}/>
               }
            </div>

        </div>
        
    </PageMotion>
    );
}