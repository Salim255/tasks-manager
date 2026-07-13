import type { Row } from "@tanstack/react-table";

import { DataTableCell } from "./DataTableCell";

type DataTableRowProps<TData> = {
    row: Row<TData>;
};

export const DataTableRow = <TData,>({
    row,
}: DataTableRowProps<TData>) => {

    return (
        <div
            className={`data-table__row ${
                row.getIsSelected()
                    ? "data-table__row--selected"
                    : ""
            }`}
        >

            {row.getVisibleCells().map(cell => (

                <DataTableCell
                    key={cell.id}
                    cell={cell}
                />

            ))}

        </div>
    );

};