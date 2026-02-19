import { useReducer } from "react";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type TaskFormState = {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  sprintId?: string;
  assigneeId?: string;
  dueAt: string; // keep string for <input type="date">
  errors: Partial<Record<"title" | "description" | "status" | "priority" | "dueAt", string>>;
};

type Action =
  | { type: "SET_FIELD"; field: keyof Omit<TaskFormState, "errors">; value: string }
  | { type: "SET_ERROR"; field: keyof TaskFormState["errors"]; message: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET" };

export const initialTaskFormState: TaskFormState = {
  title: "",
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

export const useTaskForm = () => {
  const [state, dispatch] = useReducer(reducer, initialTaskFormState);

  const setField = (field: keyof Omit<TaskFormState, "errors">, value: string) =>
    dispatch({ type: "SET_FIELD", field, value });

  const setError = (field: keyof TaskFormState["errors"], message: string) =>
    dispatch({ type: "SET_ERROR", field, message });

  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" });

  const reset = () => dispatch({ type: "RESET" });

  return { state, setField, setError, clearErrors, reset };
};