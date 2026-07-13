import type { ColumnDef } from "@tanstack/react-table";
import type { Task } from "../../../../tasks/models/task.model";



export const useTaskColumns = (): ColumnDef<Task>[] => {

    return [
        {
            accessorKey: "title",

            header: "Task",

            cell: ({ row }) => (
                <span>
                    {row.original.title}
                </span>
            ),
        },
    ];
};