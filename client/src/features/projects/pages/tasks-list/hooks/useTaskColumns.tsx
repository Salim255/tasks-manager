import type { ColumnDef } from "@tanstack/react-table";

import type { Task } from "../../../../tasks/models/task.model";

import { Status } from "../../../../../shared/components/task-status/TaskStatus";
import { Assignee } from "../../../../../shared/components/assignee/Assignee";
import { TaskLabel } from "../../../../../shared/components/task-label/TaskLabel";


export const useTaskColumns = (): ColumnDef<Task>[] => {

    return [

        {
            accessorKey: "title",

            header: "Task",

            cell: ({ row }) => (
                <TaskLabel
                    name={row.original.title}
                />
            ),
        },


        {
            accessorKey: "status",

            header: "Status",

            cell: ({ row }) => (
                <Status
                    status={row.original.status}
                />
            ),
        },


        {
            accessorKey: "assigneeId",

            header: "Assignee",

            cell: ({ row }) => (
                <Assignee
                    assigneeId={row.original.assigneeId}
                    pageName="task-list-item"
                />
            ),
        },

    ];
};