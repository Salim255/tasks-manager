import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import "./_select-dropdown.scss";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectDropdownProps = {
  value?: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export const SelectDropdown = ({
  value,
  label,
  placeholder = "Select option",
  options,
  onChange,
}: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(
    option => option.value === value
  );

  const selectOption = (option: SelectOption) => {
    onChange(option.value);

    setIsOpen(false);

    console.log("Hello from update")
  };

 return (
  <div className="select-dropdown">

    {/* ============================================
        LABEL
    ============================================ */}
    {label && (
      <label className="select-dropdown__label">
        {label}
      </label>
    )}

    {/* ============================================
        TRIGGER
    ============================================ */}
    <button
      type="button"
      className="select-dropdown__trigger"
      onClick={() => setIsOpen(prev => !prev)}
    >
      <span className="select-dropdown__value">
        {selectedOption?.label ?? placeholder}
      </span>

      <IoChevronDown
        className={`select-dropdown__icon ${
          isOpen ? "select-dropdown__icon--open" : ""
        }`}
      />
    </button>

    {/* ============================================
        MENU
    ============================================ */}
    {isOpen && (
      <div className="select-dropdown__menu">

        <ul className="select-dropdown__list">

          {options.map(option => (
            <li
              key={option.value}
              className={`select-dropdown__option ${
                option.value === value
                  ? "select-dropdown__option--active"
                  : ""
              }`}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}

        </ul>

      </div>
    )}

  </div>
);
};