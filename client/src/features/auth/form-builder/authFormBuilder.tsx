import { useReducer } from "react";

// Auth state
export type AuthFormState = {
    email: string;
    password: string;
    confirmPassword: string;
    errors: Partial<Record<"email" | "password", string>>
}


// Actions
type Action = 
    { type: "SET_FIELD", field: keyof Omit<AuthFormState, "errors">; value: string } 
    | { type: "SET_ERROR", field: keyof AuthFormState["errors"], message: string } 
    | { type: "CLEAR_ERRORS" } 
    | {type: "RESET"}

// State
const initialUserState: AuthFormState = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: {}
}

const reducer = (state:AuthFormState , action: Action) => {
    switch(action.type){
        case "SET_FIELD":
            return {
                ...state,
                [action.field]: action.value,
                errors: {...state.errors, [action.field]: undefined}
            }
        case "SET_ERROR":
            return {
                ...state,
                [action.field]: action.message
            }
        case "CLEAR_ERRORS":
            return {
                ...state,
                errors: { }
            }
        case "RESET":
            return state = initialUserState;
        default:
            return  state
    }
}

export const useAuthForm =  () => {
    // Reducer takes the created reducer and the state
    const [ state, dispatch ] = useReducer(reducer, initialUserState);

    // Set filed
    const setField = (field: keyof Omit<AuthFormState, "errors">, value: string) => {
        return dispatch({ type: "SET_FIELD", field, value })
    } 

    // Set error
    const setError = (field: keyof AuthFormState["errors"], message: string) => {
        return dispatch({ type: "SET_ERROR", field, message })
    }

    // Clear error
    const clearError = () => {
        return dispatch({ type: "CLEAR_ERRORS" });
    }

    // Reset
    const reset = () => {
        return dispatch({ type: "RESET" });
    }
    return {state, setField, setError, clearError, reset}
}