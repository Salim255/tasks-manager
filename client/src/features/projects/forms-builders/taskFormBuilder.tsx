import { useReducer } from "react";
import type { Task, TaskType } from "../models/task.model";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";


export type TaskFormState = {
  title: string;
  description?: string;
  status: TaskStatus;
  taskType: TaskType,
  priority: TaskPriority;
  projectId: string;
  sprintId?: string;
  assigneeId?: string;
  dueAt: string; // keep string for <input type="date">
  errors: Partial<Record< "taskType" | "title" | "description" | "status" | "priority" | "dueAt", string>>;
};

type Action =
  | { type: "SET_FIELD"; field: keyof Omit<TaskFormState, "errors">; value: string }
  | { type: "SET_ERROR"; field: keyof TaskFormState["errors"]; message: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET" };

export const initialTaskFormState: TaskFormState = {
  title: "",
  projectId: "",
  assigneeId: "",
  taskType: "task",
  status: "todo",
  priority: "low",
  dueAt: "",
  errors: {},
};

function reducer(state: TaskFormState, action: Action): TaskFormState {
  switch (action.type) {
  
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: undefined }, // clear field error on change
      };

    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };

    case "CLEAR_ERRORS":
      return { ...state, errors: {} };

    case "RESET":
      return initialTaskFormState;

    default:
      return state;
  }
}

const mapTaskToFormState = (task: Task): TaskFormState => ({
  title: task.title ?? undefined,
  description: task.description ?? undefined,
  status: task.status ?? "todo" ,
  taskType: task.taskType ?? "task",
  dueAt: task.dueAt ?? "",
  priority: task.priority ?? "low",
  projectId: task.projectId ?? undefined,
  sprintId: task.sprintId ?? undefined,
  assigneeId: task.assigneeId ?? undefined,
  errors: {},
});

export const useTaskForm = (initialTask?: Task) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialTask
    (comingTask) => comingTask ?
      mapSprintToFormState(comingSprint)
      : initialTaskFormState
  );

  const setField = (field: keyof Omit<TaskFormState, "errors">, value: string) =>
    dispatch({ type: "SET_FIELD", field, value });

  const setError = (field: keyof TaskFormState["errors"], message: string) =>
    dispatch({ type: "SET_ERROR", field, message });

  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" });

  const reset = () => dispatch({ type: "RESET" });

  return { state, setField, setError, clearErrors, reset };
};