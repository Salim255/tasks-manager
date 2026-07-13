import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import type {
    ColumnDef,
} from "@tanstack/react-table";

import "./_data-table.scss";


type DataTableProps<TData> = {
    columns: ColumnDef<TData, any>[];
    data: TData[];
};


export const DataTable = <TData,>({
    columns,
    data,
}: DataTableProps<TData>) => {


    const table = useReactTable({
        data,
        columns,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <div className="data-table">

            <div className="data-table__header">

                {table.getHeaderGroups().map(
                    headerGroup => (
                        <div
                            key={headerGroup.id}
                            className="data-table__row"
                        >

                            {headerGroup.headers.map(
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
                className="data-table__resize-handle"
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
                            )}

                        </div>
                    )
                )}

            </div>


            <div className="data-table__body">

                {
                    table.getRowModel().rows.map(row => (

                        <div
                            key={row.id}
                            className="data-table__row"
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