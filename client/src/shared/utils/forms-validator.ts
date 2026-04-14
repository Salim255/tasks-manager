import type { AuthFormState } from "../../features/auth/form-builder/authFormBuilder";

 const Validators = {
  required: (value: string) =>
    !value ? "This field is required" : undefined,

  minLength: (min: number, field: string) => (value: string) =>
    value.length < min ? `${field} must be at least ${min} characters` : undefined,

  maxLength: (max: number, field: string) => (value: string) =>
    value.length > max ? `${field} must be less than ${max} characters` : undefined,

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
    Validators.minLength(8, "Password")(state.password) ||
    Validators.maxLength(20, "Password")(state.password);

  if (!isLogin) {
    errors.confirmPassword =
      Validators.required(state.confirmPassword) ||
      Validators.match(state.password, state.confirmPassword);
  }

  return errors;
};
