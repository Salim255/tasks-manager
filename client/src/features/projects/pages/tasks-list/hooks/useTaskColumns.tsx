import type { ColumnDef } from "@tanstack/react-table";
import type { Task } from "../../../../tasks/models/task.model";
import { Assignee } from "../../../../../shared/components/assignee/Assignee";
import { TaskLabel } from "../../../../../shared/components/task-label/TaskLabel";
import { TaskDescription } from "../../../../../shared/components/task-description/TasDescription";
import { Reporter } from "../../../../../shared/components/reporter/Reporter";
import { Priority } from "../../../../../shared/components/priority/Priority";
import { Resolution } from "../../../../../shared/components/resolution/Resolution";
import { DateItem } from "../../../../../shared/components/date-item/DateItem";
import { EditableStatus } from "../../../../tasks/components/editable-status/EditableStatus";
import { updateTasHttp } from "../../../../tasks/http/task.http";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../../redux/store";
import { useMemberOptions } from "../../../../members/hooks/MemberOptionsHook";
import { EditableAssignee } from "../../../../tasks/components/editable-assignee/EditableAssignee";


export const useTaskColumns = (): ColumnDef<Task>[] => {
    const dispatch = useDispatch<AppDispatch>();
    const memberOptions = useMemberOptions();

    const handleSave = (field: "status" | "assigneeId" | "taskType", value: string, taskId: string) => {
        if (!field || !value) return;

        //TODO: If the task's value equal the onchange value ignore the change
        dispatch(
            updateTasHttp({
                taskId: taskId,
                [field]: value,
            })
        );
    };
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
            enableSorting: true,
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
                <EditableStatus
                    taskStatus={row.original.status}
                    handleSave={(v) => handleSave("status", v, row.original.id)}
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
                <EditableAssignee
                TaskAssigneeId={row.original.assigneeId ?? "unassigned"}
                taskMembers={memberOptions}
                handleSave={(v) => handleSave("assigneeId", v, row.original.id)}
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