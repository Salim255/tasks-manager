import { useEffect, useReducer } from "react";
import type { Task } from "../models/task.model";
import type { TaskType } from "../dto/task-dto";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";


export type TaskFormState = {
  title: string;
  description?: string | null;
  status: TaskStatus;
  taskType: TaskType,
  priority: TaskPriority;
  projectId: string;
  sprintId?: string | null;
  assigneeId?: string | null;
  dueAt?: string | null; // keep string for <input type="date">
  errors: Partial<Record< "taskType" | "title" | "description" | "status" | "priority" | "dueAt", string>>;
};

type TaskFormFields = Omit<TaskFormState, "errors">;

type Action =
  | { type: "SET_FIELD"; field: keyof Omit<TaskFormState, "errors">; value: TaskFormState[keyof TaskFormFields] }
  | { type: "SET_ERROR"; field: keyof TaskFormState["errors"]; message: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET" }
  | {
      type: "HYDRATE";
      payload: TaskFormState;
    };

export const initialTaskFormState: TaskFormState = {
  title: "",
  projectId: "",
  assigneeId: "",
  description: "",
  taskType: "task",
  status: "todo",
  priority: "low",
  dueAt: "",
  errors: {},
};

function reducer(state: TaskFormState, action: Action): TaskFormState {
  console.log("Hello from reducer✅✅", action)
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

    case "HYDRATE":
      return action.payload;

    default:
      return state;
  }
}

const mapTaskToFormState = (task: Task): TaskFormState => {
  return {
    title: task.title ?? undefined,
    description: task.description ?? undefined,
    status: task.status ?? "todo" ,
    taskType: task.taskType ?? "task",
    dueAt: task.dueAt ?? undefined,
    priority: task.priority ?? "low",
    projectId: task.projectId ?? undefined,
    sprintId: task.sprintId ?? undefined,
    assigneeId: task.assigneeId ?? undefined,
    errors: {},
  };
}

export const useTaskForm = (initialTask?: Task) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialTask,
    (comingTask) => {
      if (comingTask) {
        return mapTaskToFormState(comingTask)
      }
      return initialTaskFormState
    }
  );

  useEffect(() => {
    if (initialTask) {
      dispatch({
        type: "HYDRATE",
        payload: mapTaskToFormState(initialTask),
      });
      return;
    }

    dispatch({ type: "RESET" });
  }, [initialTask?.id]);

  const setField = <k extends keyof Omit<TaskFormState, "errors">>(field: k, value: TaskFormState[k]) => {
      dispatch({ type: "SET_FIELD", field, value });
  }


  const setError = (field: keyof TaskFormState["errors"], message: string) =>
    dispatch({ type: "SET_ERROR", field, message });

  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" });

  const reset = () => dispatch({ type: "RESET" });

  return { state, setField, setError, clearErrors, reset };
};