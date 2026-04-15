import { createProfileHttp, type CreateProfilePayload } from '../http/profileHttp';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../../redux/store';
import { useProfileForm } from '../form-builder/profileFormBuilder';
import { validateProfileForm } from '../../../shared/utils/forms-validator';

export const ProfileForm = () => {
  const {setField, reset, state, setError } = useProfileForm();
  const dispatcher = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setField(event.target.name as "firstName" | "lastName", event.target.value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateProfileForm(state);
    if (Object.values(errors).some(Boolean)) {
      // push errors into reducer
      Object.entries(errors).forEach(([field, message]) => {
          if (message) setError(field as "firstName" | "lastName", message);
      });
      return;
    }
    if (!state.firstName.trim() || ! state.lastName.trim()) return;

    const payload: CreateProfilePayload = {firstName: state.firstName, lastName: state.lastName};
    dispatcher(createProfileHttp(payload));
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h3> Profile Setup </h3>
        <div className="form-row">
            <label 
              className='form-label'
              htmlFor="firstName">
                Your first name
              </label>
            <input
                type="text"
                name="firstName"
                value={state.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                className='form-input'
            />
            { 
              state.errors.firstName && (
                <p className="alert-danger">{state.errors.firstName}</p>
              )
            }
        </div>
        <div className="form-row">
            <label
              className='form-label'
              htmlFor="lastName">Your last name</label>
            <input
                className='form-input'
                name="lastName"
                value={state.lastName}
                onChange={handleChange}
                placeholder="Your last name"
            />
            { 
              state.errors.lastName && (
                  <p className="alert-danger">{state.errors.lastName}</p>
              )
            }
        </div> 


        <button
          type="submit"
          className="btn btn-hero">
            Submit
        </button>
    </form>
  );
};