import { useReducer } from "react";

export type ProjectFormState = {
    name: string;
    description?: string;
    status: 'active' | 'archived';
    errors: Partial<Record<"name" | "description" | "status", string>>;
}

// Actions
type Action =  
  | { type: "SET_FIELD"; field: keyof Omit<ProjectFormState, "errors">; value: string }
  | { type: "SET_ERROR"; field: keyof ProjectFormState["errors"]; message: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET" };

// State
export const initialProjectState: ProjectFormState = {
    name: "",
    description: "",
    status: 'active',
    errors: {}
}


// Reducer
function reducer(state: ProjectFormState, action: Action ){
    switch(action.type){
        case 'SET_FIELD':
          return  {
                ...state,
                [action.field]: action.value,
                errors: {...state.errors, [action.field]: undefined}
            }
        case 'SET_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.message
                }
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                errors: {}
            }
        case 'RESET':
            return state = initialProjectState;
        default:
            return state
    }
}

// From
export const useProjectForm = () => {

    // Reducer takes the created reducer and the state
    const [state, dispatch ] = useReducer(reducer, initialProjectState);

    // Set filed
    const setField = (field: keyof Omit<ProjectFormState, "errors">, value: string) => {
       return dispatch({type: 'SET_FIELD', field, value })
    }

    // Set error
    const setError = (field: keyof ProjectFormState["errors"], message: string ) => {
        return dispatch({type: 'SET_ERROR', field,  message })
    }

    // Clear error
    const clearError = () => {
        return dispatch({type: 'CLEAR_ERRORS'})
    }

    // Reset
    const reset = () => {
        return dispatch({ type: 'RESET' })
    }
    
    return {state,  setField, setError, clearError, reset };
}