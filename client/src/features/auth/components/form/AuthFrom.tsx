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

    return <>
    <form onSubmit={onSubmit} className="form ">
        <div className="form-row">
            <label className="form-label">Email</label>
            <input 
                className="form-input"
                name="email"
                onChange={handleInput}
                value={state.email}
                placeholder="Enter your email">

            </input>
            { state.errors.email && (
                <p className="alert-danger">{state.errors.email}</p>
            )}
        </div>
        <div className="form-row">
            <label className="form-label">password</label>
            <input 
                className="form-input"
                name="password"
                onChange={handleInput}
                value={state.password}
                placeholder="Password">
            </input>
             {state.errors.password && (
                <p className="alert-danger">{state.errors.password}</p>
            )}
        </div>
        {
            !iSLogin && <div className="form-row ">
                <label className="form-label">confirm password</label>
                <input 
                    className="form-input"
                    name="confirmPassword"
                    onChange={handleInput}
                    value={state.confirmPassword}
                    placeholder="Confirm password">
                </input>
                 {state.errors.confirmPassword && (
                <p className="alert-danger">{state.errors.confirmPassword}</p>
            )}
            </div>
        }
       <div className="form-row auth-form__btns">
            <button type="submit" className="btn btn-block">
               { !iSLogin ? 'Signup' : 'Login'}
            </button>

            <p>{iSLogin ? "Don't have an account?" : "Already have an account?"}
                <button type="button" onClick={handleAutMode} className="member-btn">
                    {iSLogin ? 'Switch to Signup' : 'Switch to Login'}
                </button>
            </p>
       </div>
    </form>
    </>
}