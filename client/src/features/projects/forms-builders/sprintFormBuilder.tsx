import { useReducer } from "react";
import type { Sprint, SprintStatus } from "../models/sprint.model";

export type SprintFormState = {
    name?: string;
    status?: SprintStatus;
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
  | { type: "RESET", payload: SprintFormState  };

export const initialTaskFormState: SprintFormState = {
    name: "",
    status: 'planned', 
    errors: {},
};

function reducer(state: SprintFormState, action: Action): SprintFormState {
    console.log(state);
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

const mapSprintToFormState = (sprint: Sprint): SprintFormState => ({
  name: sprint.name ?? undefined,
  status: sprint.status ?? 'upcoming',
  startDate: sprint.startDate ?? undefined,
  endDate: sprint.endDate ?? undefined,
  goal: sprint.goal ?? undefined,
  completeDate: sprint.completeDate ??  undefined,
  errors: {},
});

export const useSprintForm = (initialSprint?: Sprint) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialSprint, // coming sprint
    (comingSprint) => comingSprint 
        ? mapSprintToFormState(comingSprint) 
        : initialTaskFormState
    );

  const setField = (field: keyof Omit<SprintFormState, "errors">, value: string) =>
    dispatch({ type: "SET_FIELD", field, value });

  const setError = (field: keyof SprintFormState["errors"], message: string) =>
    dispatch({ type: "SET_ERROR", field, message });

  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" });

  const reset = () => dispatch({
    type: "RESET",
    payload: initialSprint ? mapSprintToFormState(initialSprint) : initialTaskFormState
 });

  return { state, setField, setError, clearErrors, reset };
};