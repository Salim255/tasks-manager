import type { ChangeEvent } from "react";
import { useAuthForm } from "../../form/authFormBuilder";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { authUser, type LoginPayload } from "../../http/auth.http";

export const AuthForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { state, setField } = useAuthForm();
    const submit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(state);
        if(!state.email || !state.password) return;
        const payload: LoginPayload = {email: state.email, password: state.password, authType: 'register'};
        dispatch(authUser(payload));
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setField(e.target.name as "password" | "email", e.target.value);
    }
    return <>
    <form onSubmit={submit}>
        <div>
            <label>Email</label>
            <input 
                name="email"
                onChange={handleInput}
                value={state.email}
                placeholder="enter your email">

            </input>
        </div>
        <div>
            <label>password</label>
            <input 
                name="password"
                onChange={handleInput}
                value={state.password}
                placeholder="password">
            </input>
        </div>
        <div>
            <label>confirm password</label>
            <input 
                name="confirmPassword"
                onChange={handleInput}
                value={state.confirmPassword}
                placeholder="confirm password">
            </input>
        </div>
        <button type="submit">
            submit
        </button>
    </form>
    </>
}