import "./_auth-form.scss";
import { useState, type ChangeEvent } from "react";
import { useAuthForm } from "../../form-builder/authFormBuilder";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { authUser, type AuthPayload } from "../../http/auth.http";
import { validateAuthForm } from "../../../../shared/utils/forms-validator";

export const AuthForm = () => {
    const [iSLogin, setAuthMode] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();
    const { state, setField, setError } = useAuthForm();
    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateAuthForm(state, iSLogin);

        if (Object.values(errors).some(Boolean)) {
            // push errors into reducer
            Object.entries(errors).forEach(([field, message]) => {
                if (message) setError(field as "password" | "email" | "confirmPassword", message);
            });
            return;
        }
        
        const payload: AuthPayload = {
            email: state.email, 
            password: state.password, 
            authType: iSLogin ? 'login' :'register'
        };
        dispatch(authUser(payload));
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setField(e.target.name as "password" | "email" | "confirmPassword", e.target.value);
    }

    const handleAutMode = () => {
        setAuthMode((prev) => !prev);
    }

    return (
        <div className="auth">
            <form onSubmit={onSubmit} className="form">
                <div className="form__group">
                    <label className="form__label">Email</label>
                    <input 
                    className="form__input"
                    name="email"
                    onChange={handleInput}
                    value={state.email}
                    placeholder="Enter your email"
                    />
                    {state.errors.email && (
                    <p className="form__error">{state.errors.email}</p>
                    )}
                </div>

                <div className="form__group">
                    <label className="form__label">Password</label>
                    <input 
                    className="form__input"
                    name="password"
                    onChange={handleInput}
                    value={state.password}
                    placeholder="Password"
                    />
                    {state.errors.password && (
                    <p className="form__error">{state.errors.password}</p>
                    )}
                </div>

                {!iSLogin && (
                    <div className="form__group">
                    <label className="form__label">Confirm password</label>
                    <input 
                        className="form__input"
                        name="confirmPassword"
                        onChange={handleInput}
                        value={state.confirmPassword}
                        placeholder="Confirm password"
                    />
                    {state.errors.confirmPassword && (
                        <p className="auth-form__error">{state.errors.confirmPassword}</p>
                    )}
                    </div>
                )}

                <div className="auth__actions">
                    <button type="submit" className="btn btn--primary">
                    {iSLogin ? "Login" : "Signup"}
                    </button>

                    <p className="auth__switch">
                    {iSLogin ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        type="button" 
                        onClick={handleAutMode} 
                        className="auth__switch-btn"
                    >
                        {iSLogin ? "Switch to Signup" : "Switch to Login"}
                    </button>
                    </p>
                </div>
                </form>
        </div>
    )
}