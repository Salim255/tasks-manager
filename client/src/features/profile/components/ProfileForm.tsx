import { useEffect, useReducer } from 'react';


type ProfileFormState = {
  name: string;
  avatarUrl?: string;
  errors: Record<string, string>;
};

type Action = { type: "SET_FIELD"; field: string; value: string } | 
{ type: "SET_ERROR"; field: string; message: string } | 
{ type: "CLEAR_ERRORS" };

const initialState: ProfileFormState = { name: "", avatarUrl: "", errors: {}  };

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
    if (!state.name.trim()) return;
    console.log(state);
  };

  useEffect(() => {
    //console.log(state);
  }, [state])
  return (
    <form onSubmit={handleSubmit} className='form'>
        <h3>Create Profile</h3>

        {/* Title */}
        <div className="form__form-group">
            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Enter task title"
            />
        </div>

        {/* Due Date */}
        <div className="form__form-group">
            <label htmlFor="dueAt">Due Date</label>
            <input
                id="dueAt"
                type="date"
                name="avatarUrl"
                value={state.avatarUrl}
                onChange={handleChange}
            />
        </div>

        <button type="submit" className="btn">
            Create profile
        </button>
    </form>
  );
};