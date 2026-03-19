import { useReducer } from "react";

type ProfileFormState = {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  errors: Record<string, string>;
};

type Action = { type: "SET_FIELD"; field: string; value: string } | 
{ type: "SET_ERROR"; field: string; message: string } | 
{ type: "CLEAR_ERRORS" }
|{ type: "RESET" };

const initialState: ProfileFormState = { firstName: "", lastName: "",  avatarUrl: "", errors: {}  };

function reducer(state: ProfileFormState, action: Action) { 
    switch (action.type) { 
       
        case "SET_FIELD": 
            return { 
                ...state, 
                [action.field]: action.value,
            }; 
        case "SET_ERROR": 
            return { 
                ...state, 
                errors: { 
                    ...state.errors, 
                    [action.field]: action.message,
                 } 
            }; 
        case "CLEAR_ERRORS": 
            return { 
                ...state, 
                errors: {},
             }; 
        case 'RESET':
            return state = initialState;
        default: 
            return state; 
    } 
}

export const useProfileForm = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const setField = (field: keyof Omit<ProfileFormState, "errors">, value: string) => {
        return dispatch({type: 'SET_FIELD', field, value })
    }

    const setError = (field: keyof ProfileFormState["errors"], message: string) => {
        return dispatch({type: 'SET_ERROR', field,  message })
    }

     const clearError = () => {
        return dispatch({type: 'CLEAR_ERRORS'})
    }

    const reset = () => {
        return dispatch({ type: 'RESET' })
    }

    return {setField, setError, clearError, reset}
}