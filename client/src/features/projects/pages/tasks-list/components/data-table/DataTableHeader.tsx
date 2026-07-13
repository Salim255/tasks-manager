import type { Table } from "@tanstack/react-table";

import { DataTableHeaderRow } from "./DataTableHeaderRow";

type DataTableHeaderProps<TData> = {
    table: Table<TData>;
};

export const DataTableHeader = <TData,>({
    table,
}: DataTableHeaderProps<TData>) => {

    return (
        <>
            {table.getHeaderGroups().map(headerGroup => (

                <DataTableHeaderRow
                    key={headerGroup.id}
                    headerGroup={headerGroup}
                />

            ))}
        </>
    );

};