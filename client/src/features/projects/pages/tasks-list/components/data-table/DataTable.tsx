import {
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import type {
    ColumnDef,
} from "@tanstack/react-table";

import "./_data-table.scss";
import { useState } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";


type DataTableProps<TData> = {
    columns: ColumnDef<TData, any>[];
    data: TData[];
};


export const DataTable = <TData,>({
    columns,
    data,
}: DataTableProps<TData>) => {
    const [rowSelection, setRowSelection] = useState({});
    const [columnSizing, setColumnSizing] = useState({});
   const table = useReactTable({

        data,

        columns,


        getCoreRowModel:
            getCoreRowModel(),


        columnResizeMode:
            "onChange",


        state: {
            columnSizing,
            rowSelection
        },


        onColumnSizingChange:
            setColumnSizing,
        onRowSelectionChange: 
            setRowSelection,

    });

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