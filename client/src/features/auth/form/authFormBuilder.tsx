// Auth state
export type AuthFormState = {
    email: string;
    password: string;
    errors: Partial<Record< 'email' | 'password', string>>
}


// Actions
type Actions = 
    { type: 'SET_FIELD' } | { type: 'SET_ERROR' } | { type: 'CLEAR_ERRORS' } | {type: 'RESET'}

const initState = {}

const reducer = (state, action) => {
    switch(action.type){
        case ''
        default:
            return  state
    }
}
export const useAuthForm =  () => {

}