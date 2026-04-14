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
