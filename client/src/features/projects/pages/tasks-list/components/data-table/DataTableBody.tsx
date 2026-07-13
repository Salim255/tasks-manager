import type { Table } from "@tanstack/react-table";

import { DataTableRow } from "./DataTableRow";

type DataTableBodyProps<TData> = {
    table: Table<TData>;
};

export const DataTableBody = <TData,>({
    table,
}: DataTableBodyProps<TData>) => {

    return (
        <div className="data-table__body">

            {table.getRowModel().rows.map(row => (

                <DataTableRow
                    key={row.id}
                    row={row}
                />

            ))}

        </div>
    );
};