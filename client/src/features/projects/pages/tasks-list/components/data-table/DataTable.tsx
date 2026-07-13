import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import type {
    ColumnDef,
} from "@tanstack/react-table";

import "./_data-table.scss";
import { useState } from "react";
import { DataTableCell } from "./DataTableCell";
import { DataTableRow } from "./DataTableRow";


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

                {
                    table.getHeaderGroups().map(
                    headerGroup => (
                        <div
                            key={headerGroup.id}
                            className="data-table__row"
                        >
                            {
                                headerGroup.headers.map(
                                    header => {
                                        return < DataTableCell header={header}/>
                                    }
                                )
                            }
                        </div>
                        )
                    )
                }
            </div>


            <div className="data-table__body">

                {
                    table.getRowModel().rows.map(row => (
                        <DataTableRow row={row}/>
                    ))
                }
            </div>
        </div>
    );
};