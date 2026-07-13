import {
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import type {
    ColumnDef,
    Table,
} from "@tanstack/react-table";

import { useState } from "react";

type UseDataTableProps<TData> = {
    data: TData[];
    columns: ColumnDef<TData, any>[];
};

export const useDataTable = <TData,>({
    data,
    columns,
}: UseDataTableProps<TData>): Table<TData> => {

    const [columnSizing, setColumnSizing] = useState({});

    const [rowSelection, setRowSelection] = useState({});

    // Enterprise features (enabled later)

    // const [sorting, setSorting] = useState([]);

    // const [columnFilters, setColumnFilters] = useState([]);

    // const [columnVisibility, setColumnVisibility] = useState({});

    // const [globalFilter, setGlobalFilter] = useState("");

    // const [pagination, setPagination] = useState(...);

    const table = useReactTable({

        data,

        columns,

        getCoreRowModel:
            getCoreRowModel(),

        columnResizeMode:
            "onChange",

        state: {

            columnSizing,

            rowSelection,

            // sorting,

            // columnFilters,

            // columnVisibility,

            // globalFilter,

        },

        onColumnSizingChange:
            setColumnSizing,

        onRowSelectionChange:
            setRowSelection,

        // onSortingChange:
        // setSorting,

        // onColumnFiltersChange:
        // setColumnFilters,

        // onColumnVisibilityChange:
        // setColumnVisibility,

    });

    return table;
};