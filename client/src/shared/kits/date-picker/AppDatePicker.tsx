import { forwardRef } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import "./_app-date-picker.scss";

type DatePickerFieldProps = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  min?: string;
  max?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
};

export const AppDatePicker = forwardRef<
  HTMLInputElement,
  DatePickerFieldProps
>(
  (
    {
      label,
      value,
      onChange,
      placeholder,
      hint,
      error,
      min,
      max,
      name,
      id,
      disabled = false,
    },
    ref
  ) => {
    return (
      <div className="date-picker-field">
        {label && (
          <label htmlFor={id} className="date-picker-field__label">
            {label}
          </label>
        )}

        <div
          className={`date-picker-field__control ${
            error ? "date-picker-field__control--error" : ""
          } ${disabled ? "date-picker-field__control--disabled" : ""}`}
        >
          <input
            ref={ref}
            id={id}
            name={name}
            type="date"
            className="date-picker-field__input"
            value={value ?? ""}
            min={min}
            max={max}
            disabled={disabled}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
          />

          <span className="date-picker-field__icon" aria-hidden="true">
            <HiOutlineCalendarDays />
          </span>
        </div>

        {hint && !error && (
          <p className="date-picker-field__hint">{hint}</p>
        )}

        {error && (
          <p className="date-picker-field__error">{error}</p>
        )}
      </div>
    );
  }
);

AppDatePicker.displayName = "DatePicker";