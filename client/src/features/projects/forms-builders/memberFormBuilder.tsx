import { useReducer } from "react";

type MemberRole = 'admin' | 'member';

export type MemberFormState = {
    projectId: string;
    memberEmail?: string;
    role:  MemberRole;
    errors: Partial<Record<"projectId" | "memberEmail" | "role", string>>;
}

// Actions
type Action =  
  | { type: "SET_FIELD"; field: keyof Omit<MemberFormState, "errors">; value: string }
  | { type: "SET_ERROR"; field: keyof MemberFormState["errors"]; message: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET" };

// State
export const initialMemberState: MemberFormState = {
    projectId: "",
    memberEmail: "",
    role: 'member' ,
    errors: {}
}


// Reducer
function reducer(state: MemberFormState, action: Action ){
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
            return state = initialMemberState;
        default:
            return state
    }
}


const mapProjectIdToFormState = (projectId: string): MemberFormState => ({
  projectId: projectId ?? undefined,
  memberEmail: initialMemberState.memberEmail,
  role: initialMemberState.role,
  errors: {},
});

// From
export const useMemberForm = (projectId: string) => {

    // Reducer takes the created reducer and the state
    const [state, dispatch ] = useReducer(
        reducer,
        projectId,
        (comingProjectId) => comingProjectId 
        ? mapProjectIdToFormState(comingProjectId) 
        : initialMemberState
    );

    // Set filed
    const setField = (field: keyof Omit<MemberFormState, "errors">, value: string) => {
       return dispatch({type: 'SET_FIELD', field, value })
    }

    // Set error
    const setError = (field: keyof MemberFormState["errors"], message: string) => {
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