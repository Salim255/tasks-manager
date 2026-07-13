import "./_data-table.scss";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { useDataTable } from "../../hooks/useTaskTable";


type DataTableProps<TData> = {
    columns: ColumnDef<TData, any>[];
    data: TData[];
};


export const DataTable = <TData,>({
    columns,
    data,
}: DataTableProps<TData>) => {
  
   const table = useDataTable({data: data, columns: columns})

    return (
        <div className="data-table">

            <div className="data-table__header">
                <DataTableHeader table={table}/>
            </div>

            <div className="data-table__body">
                <DataTableBody table={table}/>
            </div>
        </div>
    );
};