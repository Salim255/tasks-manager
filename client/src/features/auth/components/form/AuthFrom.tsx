import "./_auth-form.scss";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useAuthForm } from "../../form-builder/authFormBuilder";
import { authUserHttp } from "../../http/auth.http";

import { validateAuthForm } from "../../../../shared/utils/forms-validator";
import type { AuthPayload } from "../../dto/auth-dto";
import type { AppDispatch } from "../../../../redux/store";

export const AuthForm = () => {
    const [isLogin, setAuthMode] = useState(true);
    const [isSignupDetails, setSignupDetails] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const {
        state,
        setField,
        setError,
        clearError,
        reset,
    } = useAuthForm();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setField(
            name as
                | "email"
                | "password"
                | "confirmPassword"
                | "firstName"
                | "lastName",
            name === "email"
                ? value.toLowerCase()
                : value
        );
    };

    const handleSignupNext = () => {
        const errors = validateAuthForm(state, false);

        const credentialErrors = {
            email: errors.email,
            password: errors.password,
            confirmPassword: errors.confirmPassword,
        };

        if (Object.values(credentialErrors).some(Boolean)) {
            Object.entries(credentialErrors).forEach(([field, message]) => {
                if (message) {
                    setError(
                        field as "email" | "password" | "confirmPassword",
                        message
                    );
                }
            });

            return;
        }

        clearError();
        setSignupDetails(true);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLogin && !isSignupDetails) {
            handleSignupNext();
            return;
        }

        const errors = validateAuthForm(state, isLogin);

        if (Object.values(errors).some(Boolean)) {
            Object.entries(errors).forEach(([field, message]) => {
                if (message) {
                    setError(
                        field as
                            | "email"
                            | "password"
                            | "confirmPassword"
                            | "firstName"
                            | "lastName",
                        message
                    );
                }
            });

            return;
        }

        const payload: AuthPayload = {
            email: state.email,
            password: state.password,
            authType: isLogin ? "login" : "register",

            ...(isLogin
                ? {}
                : {
                    firstName: state.firstName,
                    lastName: state.lastName,
                }),
        };

        dispatch(authUserHttp(payload));
    };

    const handleAuthMode = () => {
        setAuthMode((prev) => !prev);
        setSignupDetails(false);
        reset();
    };

    const handleBack = () => {
        setSignupDetails(false);
        clearError();
    };

    return (
        <div className="auth">
            <form onSubmit={handleSubmit} className="form">

                {/* ============================================
                    SIGNUP STEP 2
                ============================================ */}

                {!isLogin && isSignupDetails ? (
                    <>
                        <div className="form__group">
                            <label className="form__label" htmlFor="firstName">
                                First name
                            </label>

                            <input
                                id="firstName"
                                className="form__input"
                                name="firstName"
                                type="text"
                                value={state.firstName}
                                onChange={handleInput}
                                placeholder="Enter your first name"
                                autoComplete="given-name"
                                autoFocus
                            />

                            {state.errors.firstName && (
                                <p className="form__error">
                                    {state.errors.firstName}
                                </p>
                            )}
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="lastName">
                                Last name
                            </label>

                            <input
                                id="lastName"
                                className="form__input"
                                name="lastName"
                                type="text"
                                value={state.lastName}
                                onChange={handleInput}
                                placeholder="Enter your last name"
                                autoComplete="family-name"
                            />

                            {state.errors.lastName && (
                                <p className="form__error">
                                    {state.errors.lastName}
                                </p>
                            )}
                        </div>

                        <div className="auth__actions u-mt-xl">
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={handleBack}
                            >
                                <HiArrowNarrowLeft />
                            </button>

                            <button
                                type="submit"
                                className="btn btn--primary"
                            >
                                Signup
                            </button>
                        </div>
                    </>
                ) : (
                    /* ============================================
                       LOGIN / SIGNUP STEP 1
                    ============================================ */

                    <>
                        <div className="form__group">
                            <label className="form__label" htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                className="form__input"
                                name="email"
                                type="email"
                                value={state.email}
                                onChange={handleInput}
                                placeholder="Enter your email"
                                autoComplete="email"
                                autoFocus
                            />

                            {state.errors.email && (
                                <p className="form__error">
                                    {state.errors.email}
                                </p>
                            )}
                        </div>

                        <div className="form__group">
                            <label className="form__label" htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                className="form__input"
                                name="password"
                                type="password"
                                value={state.password}
                                onChange={handleInput}
                                placeholder="Enter your password"
                                autoComplete={
                                    isLogin
                                        ? "current-password"
                                        : "new-password"
                                }
                            />

                            {state.errors.password && (
                                <p className="form__error">
                                    {state.errors.password}
                                </p>
                            )}
                        </div>

                        {!isLogin && (
                            <div className="form__group">
                                <label
                                    className="form__label"
                                    htmlFor="confirmPassword"
                                >
                                    Confirm password
                                </label>

                                <input
                                    id="confirmPassword"
                                    className="form__input"
                                    name="confirmPassword"
                                    type="password"
                                    value={state.confirmPassword}
                                    onChange={handleInput}
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                />

                                {state.errors.confirmPassword && (
                                    <p className="form__error">
                                        {state.errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="auth__actions u-mt-xl">
                            <button
                                type="submit"
                                className="btn btn--primary"
                            >
                                {isLogin ? "Login" : "Next"}
                            </button>
                        </div>
                    </>
                )}

                {/* ============================================
                    AUTH MODE SWITCH
                ============================================ */}

                <div className="auth__switch">
                    <span>
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </span>

                    <button
                        type="button"
                        onClick={handleAuthMode}
                        className="auth__switch-btn"
                    >
                        {isLogin ? "Signup" : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
};