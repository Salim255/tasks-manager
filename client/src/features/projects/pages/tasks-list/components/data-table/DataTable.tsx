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
                                    header => (
                                        <div
                                            key={header.id}
                                            className="data-table__cell"
                                            style={{
                                                width: header.getSize(),
                                            }}
                                        >
                                            {
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }

                                            {
                                                header.column.getCanResize() && (
                                                    <div
                                                        className={`data-table__resize-handle ${
                                                            header.column.getIsResizing()
                                                                ? "data-table__resize-handle--active"
                                                                : ""
                                                        }`}
                                                        onMouseDown={
                                                            header.getResizeHandler()
                                                        }
                                                        onTouchStart={
                                                            header.getResizeHandler()
                                                        }
                                                    />
                                                )
                                            }
                                    </div>
                                    )
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

                        <div
                            key={row.id}
                            className={`data-table__row ${
                                row.getIsSelected()
                                    ? "data-table__row--selected"
                                    : ""
                            }`}
                            onClick={row.getToggleSelectedHandler()}
                        >

                            {
                                row.getVisibleCells().map(cell => (

                                    <div
                                        key={cell.id}
                                        className="data-table__cell"
                                        style={{
                                            width: cell.column.getSize(),
                                        }}
                                    >

                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        }

                                    </div>

                                ))
                            }

                        </div>

                    ))
                }
            </div>
        </div>
    );
};