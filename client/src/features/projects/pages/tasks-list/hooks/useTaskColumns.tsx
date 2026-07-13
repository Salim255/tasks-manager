import type { ColumnDef } from "@tanstack/react-table";

import type { Task } from "../../../../tasks/models/task.model";

import { Status } from "../../../../../shared/components/task-status/TaskStatus";
import { Assignee } from "../../../../../shared/components/assignee/Assignee";
import { TaskLabel } from "../../../../../shared/components/task-label/TaskLabel";
import { TaskDescription } from "../../../../../shared/components/task-description/TasDescription";


export const useTaskColumns = (): ColumnDef<Task>[] => {

    return [

        {
            accessorKey: "title",

            header: "Task",
            size: 320,
            enableResizing: true,
            cell: ({ row }) => (
                <TaskLabel
                    name={row.original.title}
                />
                
            ),
        },

         {
            accessorKey: "description",

            header: "Description",
            size: 320,
            enableResizing: true,
            cell: ({ row }) => (
                <TaskDescription
                    description={row.original.description}
                />
                
            ),
        },

        {
            accessorKey: "status",

            header: "Status",
            enableResizing: true,
            size: 140,
            cell: ({ row }) => (
                <Status
                    status={row.original.status}
                />
            ),
        },


        {
            accessorKey: "assigneeId",

            header: "Assignee",
            enableResizing: true,
            size: 180,
            cell: ({ row }) => (
                <Assignee
                    assigneeId={row.original.assigneeId}
                    pageName="task-list-item"
                />
            ),
        },

    ];
};