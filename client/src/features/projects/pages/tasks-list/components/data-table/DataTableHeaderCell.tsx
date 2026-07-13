import { flexRender } from "@tanstack/react-table";

import type { Header } from "@tanstack/react-table";

type DataTableHeaderCellProps<TData> = {
    header: Header<TData, unknown>;
};

export const DataTableHeaderCell = <TData,>({
    header,
}: DataTableHeaderCellProps<TData>) => {

    return (
        <div
            className="data-table__cell"
            style={{
                width: header.getSize(),
            }}
        >

            {flexRender(
                header.column.columnDef.header,
                header.getContext()
            )}

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