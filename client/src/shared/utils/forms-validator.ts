import type { AuthFormState } from "../../features/auth/form-builder/authFormBuilder";

export const Validators = {
  required: (value: string) =>
    !value ? "This field is required" : undefined,

  minLength: (min: number) => (value: string) =>
    value.length < min ? `Minimum length is ${min}` : undefined,

  maxLength: (max: number) => (value: string) =>
    value.length > max ? `Maximum length is ${max}` : undefined,

  email: (value: string) =>
    /^\S+@\S+\.\S+$/.test(value) ? undefined : "Invalid email",

  match: (a: string, b: string) =>
    a === b ? undefined : "Passwords do not match"
};

export const validateForm = (state: AuthFormState, isLogin: boolean) => {
  const errors: AuthFormState["errors"] = {};

  errors.email =
    Validators.required(state.email) ||
    Validators.email(state.email);

  errors.password =
    Validators.required(state.password) ||
    Validators.minLength(8)(state.password) ||
    Validators.maxLength(20)(state.password);

  if (!isLogin) {
    errors.confirmPassword =
      Validators.required(state.confirmPassword) ||
      Validators.match(state.password, state.confirmPassword);
  }

  return errors;
};
