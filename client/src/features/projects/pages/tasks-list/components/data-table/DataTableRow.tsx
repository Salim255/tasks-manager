import type {
    HeaderGroup,
    Row,
} from "@tanstack/react-table";

import { DataTableCell } from "./DataTableCell";
import { DataTableHeaderCell } from "./DataTableHeaderCell";

type DataTableRowProps<TData> = {
    row?: Row<TData>;
    headerGroup?: HeaderGroup<TData>;
};

export const DataTableRow = <TData,>({
    row,
    headerGroup,
}: DataTableRowProps<TData>) => {

    return (
        <div
            className={`data-table__row ${
                row?.getIsSelected()
                    ? "data-table__row--selected"
                    : ""
            }`}
            onClick={
                row
                    ? row.getToggleSelectedHandler()
                    : undefined
            }
        >
           
            {headerGroup?.headers.map(header => (
                <DataTableHeaderCell key={header.id} header={header} />
            ))}

            {row?.getVisibleCells().map(cell => (
                <DataTableCell
                    key={cell.id}
                    cell={cell}
                />
            ))}
        </div>
    );
};