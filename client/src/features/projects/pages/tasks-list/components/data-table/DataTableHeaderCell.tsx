import { flexRender } from "@tanstack/react-table";

import type { Header } from "@tanstack/react-table";

type DataTableHeaderCellProps<TData> = {
    header: Header<TData, unknown>;
};

export const DataTableHeaderCell = <TData,>({
    header,
}: DataTableHeaderCellProps<TData>) => {
    const canSort = header.column.getCanSort();

    const sortingState = header.column.getIsSorted();

    return (
        <div
            className="data-table__cell"
            style={{
                width: header.getSize(),
            }}

            onClick={
                canSort
                    ? header.column.getToggleSortingHandler()
                    : undefined
            }
        >

            <span>
                {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                )}
            </span>

            {
                sortingState === "asc" && (
                    <span className="data-table__sort-icon">
                        ↑
                    </span>
                )
            }


            {
                sortingState === "desc" && (
                    <span className="data-table__sort-icon">
                        ↓
                    </span>
                )
            }

            {header.column.getCanResize() && (
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