import type { AuthFormState } from "../../features/auth/form-builder/authFormBuilder";
import type { ProfileFormState } from "../../features/profile/form-builder/profileFormBuilder";
import type { MemberFormState } from "../../features/projects/forms-builders/memberFormBuilder";
import type { ProjectFormState } from "../../features/projects/forms-builders/projectFormBuilder";
;
 const Validators = {
  required: (value: string, field: string) =>
    !value ? `${field} is required` : undefined,

  minLength: (min: number, field: string) => (value: string) =>
    value.length < min ? `${field} must be at least ${min} characters` : undefined,

  maxLength: (max: number, field: string) => (value: string) =>
    value.length > max ? `${field} must be less than ${max} characters` : undefined,

  email: (value: string) =>
    /^\S+@\S+\.\S+$/.test(value) ? undefined : "Invalid email",

  match: (a: string, b: string) =>
    a === b ? undefined : "Passwords do not match",
};

export const validateAuthForm = (state: AuthFormState, isLogin: boolean) => {
  const errors: AuthFormState["errors"] = {};

  errors.email =
    Validators.required(state.email, "Email") ||
    Validators.email(state.email);

  errors.password =
    Validators.required(state.password, "Password") ||
    Validators.minLength(8, "Password")(state.password) ||
    Validators.maxLength(20, "Password")(state.password);

  if (!isLogin) {
    errors.confirmPassword =
      Validators.required(state.confirmPassword, "Confirm Password") ||
      Validators.match(state.password, state.confirmPassword);
  }

  return errors;
};

export const validateProjectForm = (state: ProjectFormState) => {
  const errors: ProjectFormState["errors"] = {};

  errors.name =
    Validators.required(state.name, "Project Name") ||
    Validators.minLength(3, "Project Name")(state.name) ||
    Validators.maxLength(20, "Project Name")(state.name);
  return errors;
};

export const validateMemberForm = (state: MemberFormState) => {
    const errors: MemberFormState["errors"] = {};

    errors.memberEmail =
        Validators.required(state.memberEmail, "Member Email") ||
        Validators.email(state.memberEmail);

    return errors;
}

export const validateProfileForm = (state: ProfileFormState) => {
  const errors: ProfileFormState["errors"] = {};

  errors.firstName =
    Validators.required(state.firstName, "First Name") ||
    Validators.minLength(2, "First Name")(state.firstName) ||
    Validators.maxLength(50, "First Name")(state.firstName);

  errors.lastName =
    Validators.required(state.lastName, "Last Name") ||
    Validators.minLength(2, "Last Name")(state.lastName) ||
    Validators.maxLength(50, "Last Name")(state.lastName);

  return errors;
}
