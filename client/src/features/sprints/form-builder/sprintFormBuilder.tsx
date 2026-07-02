import { useReducer } from "react";
import type { Sprint, SprintStatus } from "../model/sprint.model";


export type SprintFormState = {
    name: string;
    status: SprintStatus;
    startDate: string | null;
    endDate: string | null;
    completeDate: string | null;
    goal: string | null;
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
    startDate: null,
    endDate: null,
    completeDate: null,
    goal: null,
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

const mapSprintToFormState = (sprint: Sprint): SprintFormState => ({
  name: sprint.name ?? "",
  status: sprint.status ?? 'planned',
  startDate: sprint.startDate ?? null,
  endDate: sprint.endDate ?? null,
  goal: sprint.goal ?? null,
  completeDate: sprint.completeDate ??  null,
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