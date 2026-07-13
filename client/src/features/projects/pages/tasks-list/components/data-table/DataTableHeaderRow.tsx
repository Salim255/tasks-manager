import type { HeaderGroup } from "@tanstack/react-table";

import { DataTableHeaderCell } from "./DataTableHeaderCell";

type DataTableHeaderRowProps<TData> = {
    headerGroup: HeaderGroup<TData>;
};

export const DataTableHeaderRow = <TData,>({
    headerGroup,
}: DataTableHeaderRowProps<TData>) => {

    return (
        <div className="data-table__row">

            {headerGroup.headers.map(header => (

                <DataTableHeaderCell
                    key={header.id}
                    header={header}
                />

            ))}

        </div>
    );

};