import type { Table } from "@tanstack/react-table";

import { DataTableRow } from "./DataTableRow";

type DataTableHeaderProps<TData> = {
    table: Table<TData>;
};

export const DataTableHeader = <TData,>({
    table,
}: DataTableHeaderProps<TData>) => {

    return (
        <div className="data-table__header">

            {table.getHeaderGroups().map(headerGroup => (

                <DataTableRow
                    key={headerGroup.id}
                    headerGroup={headerGroup}
                />

            ))}

        </div>
    );

};