import { flexRender } from "@tanstack/react-table";

import type {
    Header,
    Cell,
} from "@tanstack/react-table";

type DataTableCellProps<TData> = {
    cell?: Cell<TData, unknown>;
    header?: Header<TData, unknown>;
};

export const DataTableCell = <TData,>({
    cell,
    header,
}: DataTableCellProps<TData>) => {

    const column = header
        ? header.column
        : cell!.column;

    return (
        <div
            className="data-table__cell"
            style={{
                width: column.getSize(),
            }}
        >
            {header &&
                flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                )}

            {cell &&
                flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                )}

            {header?.column.getCanResize() && (
                <div
                    className={`data-table__resize-handle ${
                        header.column.getIsResizing()
                            ? "data-table__resize-handle--active"
                            : ""
                    }`}
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                />
            )}
        </div>
    );
};