import { useEffect, useReducer } from 'react';
import { createProfileHttp, type CreateProfilePayload } from '../http/profileHttp';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../../redux/store';

export const ProfileForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatcher = useDispatch<AppDispatch>();

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

    const payload: CreateProfilePayload = {firstName: state.firstName, lastName: state.lastName};
     dispatcher(createProfileHttp(payload));
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