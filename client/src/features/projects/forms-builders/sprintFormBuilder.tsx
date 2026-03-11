import { useReducer } from "react";
import type { SprintStatus } from "../models/sprint.model";

export type SprintFormState = {
    name: string;
    status: SprintStatus;
    startDate?: string;
    endDate?: string;
    completeDate?: string;
    goal?: string;
    errors: Partial<Record<"name" | "goal" | "status" | "startDate" | "endDate" | "completeDate" , string>>;
};

type Action =
  | { type: "SET_FIELD"; field: keyof Omit<SprintFormState, "errors">; value: string }
  | { type: "SET_ERROR"; field: keyof SprintFormState["errors"]; message: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET" };

export const initialTaskFormState: SprintFormState = {
    name: "",
    status: 'upcoming', 
    errors: {},
};

function reducer(state: SprintFormState, action: Action): SprintFormState {
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

export const useSprintForm = () => {
  const [state, dispatch] = useReducer(reducer, initialTaskFormState);

  const setField = (field: keyof Omit<SprintFormState, "errors">, value: string) =>
    dispatch({ type: "SET_FIELD", field, value });

  const setError = (field: keyof SprintFormState["errors"], message: string) =>
    dispatch({ type: "SET_ERROR", field, message });

  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" });

  const reset = () => dispatch({ type: "RESET" });

  return { state, setField, setError, clearErrors, reset };
};