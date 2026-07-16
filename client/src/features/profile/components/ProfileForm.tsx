import "./_profile_form.scss";
import { createProfileHttp, type CreateProfilePayload } from '../http/profileHttp';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../../redux/store';
import { useProfileForm } from '../form-builder/profileFormBuilder';
import { validateProfileForm } from '../../../shared/utils/forms-validator';
import { useProfileSelector } from "../states/profileSelectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileForm = () => {
  const { profile } = useProfileSelector();
  const {setField, reset, state, setError } = useProfileForm();
  const dispatcher = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
  

  useEffect(() => {
    if(profile){
      navigate("/workspaces")
    }
  }, [profile, navigate]);
  
return (
 <section className="profile-setup">
    <div className="profile-setup__hero">

      <div className="profile-setup__hero-copy">
        <h1 className="profile-setup__title">
          Create your profile
        </h1>

        <p className="profile-setup__subtitle">
          Complete your personal information to personalize your workspace and
          collaborate more effectively across your projects.
        </p>
      </div>

    </div>

    <div className="profile-setup__card">

      <form
        onSubmit={handleSubmit}
        className="form"
      >

        <div className="form__group">
          <label
            htmlFor="firstName"
            className="form__label"
          >
            First name
          </label>

          <input
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
            className="form__input"
            placeholder="John"
          />

          {state.errors.firstName && (
            <p className="form__error">
              {state.errors.firstName}
            </p>
          )}
        </div>

        <div className="form__group">
          <label
            htmlFor="lastName"
            className="form__label"
          >
            Last name
          </label>

          <input
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
            className="form__input"
            placeholder="Doe"
          />

          {state.errors.lastName && (
            <p className="form__error">
              {state.errors.lastName}
            </p>
          )}
        </div>

        <div className="profile-setup__actions">
          <button className="btn btn--primary">
            Continue
          </button>
        </div>

      </form>

    </div>
</section>
);
};