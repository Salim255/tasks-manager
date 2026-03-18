import { useEffect, useReducer } from 'react';


type ProfileFormState = {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  errors: Record<string, string>;
};

type Action = { type: "SET_FIELD"; field: string; value: string } | 
{ type: "SET_ERROR"; field: string; message: string } | 
{ type: "CLEAR_ERRORS" };

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
        default: 
            return state; 
    } 
}


export const ProfileForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    dispatch({
        type: 'SET_FIELD',
        field: event.target.name,
        value: event.target.value
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.firstName.trim() || ! state.lastName.trim()) return;
    console.log(state);
  };

  useEffect(() => {
    //console.log(state);
  }, [state])
  return (
    <form onSubmit={handleSubmit} className='form'>
        <h3>Create Profile</h3>
        <div className="form__form-group">
            <label htmlFor="firstName">Your first name</label>
            <input
                type="text"
                name="name"
                value={state.firstName}
                onChange={handleChange}
                placeholder="Your first name"
            />
        </div>
        <div className="form__form-group">
            <label htmlFor="lastName">Your last name</label>
            <input
                name="lastName"
                value={state.lastName}
                onChange={handleChange}
                placeholder="Your last name"
            />
        </div> 

        <button type="submit" className="btn">
            Create profile
        </button>
    </form>
  );
};