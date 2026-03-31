import "./_auth-form.scss";
import { useState, type ChangeEvent } from "react";
import { useAuthForm } from "../../form-builder/authFormBuilder";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { authUser, type LoginPayload } from "../../http/auth.http";
import { toast } from "react-toastify";

export const AuthForm = () => {
    const [iSLogin, setAuthMode] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();
    const { state, setField } = useAuthForm();
    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!state.email || !state.password || (!iSLogin && !state.confirmPassword)) {
            //toast.success("User created!");
            toast.error("Please fill all the fields");
            return
        };
        const payload: LoginPayload = {email: state.email, password: state.password, authType: iSLogin ? 'login' :'register'};
        dispatch(authUser(payload));
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setField(e.target.name as "password" | "email", e.target.value);
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
                placeholder="enter your email">

            </input>
        </div>
        <div className="form-row">
            <label className="form-label">password</label>
            <input 
                className="form-input"
                name="password"
                onChange={handleInput}
                value={state.password}
                placeholder="password">
            </input>
        </div>
        {
            !iSLogin && <div className="form-row ">
                <label className="form-label">confirm password</label>
                <input 
                    className="form-input"
                    name="confirmPassword"
                    onChange={handleInput}
                    value={state.confirmPassword}
                    placeholder="confirm password">
                </input>
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