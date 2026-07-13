import type { ColumnDef } from "@tanstack/react-table";

import type { Task } from "../../../../tasks/models/task.model";

import { Status } from "../../../../../shared/components/task-status/TaskStatus";
import { Assignee } from "../../../../../shared/components/assignee/Assignee";
import { TaskLabel } from "../../../../../shared/components/task-label/TaskLabel";
import { TaskDescription } from "../../../../../shared/components/task-description/TasDescription";
import { Reporter } from "../../../../../shared/components/reporter/Reporter";
import { Priority } from "../../../../../shared/components/priority/Priority";
import { Resolution } from "../../../../../shared/components/resolution/Resolution";
import { DateItem } from "../../../../../shared/components/date-item/DateItem";


export const useTaskColumns = (): ColumnDef<Task>[] => {

    return [
        {
            id: "select",

            size: 50,

            enableResizing: false,

            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),

            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        },

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
            accessorKey: "reporter",

            header: "Reporter",
            size: 320,
            enableResizing: true,
            cell: ({ row }) => (
                <Reporter reporterId={row.original.reporterId!} />
                
            ),
        },
        {
            accessorKey: "priority",

            header: "Priority",
            enableResizing: true,
            size: 140,
            cell: ({ row }) => (
                <Priority priority={row.original.priority} />
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
        }
        ,{
            accessorKey: "resolution",

            header: "Resolution",
            enableResizing: true,
            size: 140,
            cell: ({ row }) => (
                <Resolution status={row.original.status}/>
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
        {
            accessorKey: "updated at",

            header: "updated at",
            enableResizing: true,
            size: 180,
            cell: ({ row }) => (
                   <DateItem date={row.original.updatedAt}/>
            ),
        },
          {
            accessorKey: "due date",

            header: "due date",
            enableResizing: true,
            size: 180,
            cell: ({ row }) => (
                <DateItem date={row.original.dueAt}/>
            ),
        },
          {
            accessorKey: "created at",

            header: "Created at",
            enableResizing: true,
            size: 180,
            cell: ({ row }) => (
                <DateItem date={row.original.createdAt}/>
            ),
        },
    ];
};