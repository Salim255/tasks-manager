import type { ChangeEvent } from "react";
import { useAuthForm } from "../../form/authFormBuilder";

export const AuthForm = () => {
    const { state, setField } = useAuthForm();
    const submit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
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