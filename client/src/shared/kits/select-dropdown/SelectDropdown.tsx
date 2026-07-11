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

  renderTrigger?: (
    selectedOption: SelectOption | undefined,
    open: () => void
  ) => React.ReactNode;
  placement?: "right";
};

export const SelectDropdown = ({
  value,
  label,
  placeholder = "Select option",
  options,
  onChange,
  renderTrigger,
  placement
}: SelectDropdownProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(
    option => option.value === value
  );


  const openDropdown = () => {
    setIsOpen(true);
  };


  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };


  const selectOption = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };


  return (
    <div className="select-dropdown">


      {label && (
        <label className="select-dropdown__label">
          {label}
        </label>
      )}


      {/* CUSTOM TRIGGER */}
      {renderTrigger ? (
        renderTrigger(
          selectedOption,
          openDropdown
        )
      ) : (

        /* CURRENT DEFAULT BEHAVIOR */
        <button
          type="button"
          className="select-dropdown__trigger"
          onClick={toggleDropdown}
        >
          <span className="select-dropdown__value">
            {selectedOption?.label ?? placeholder}
          </span>

          <IoChevronDown
            className={`select-dropdown__icon ${
              isOpen
                ? "select-dropdown__icon--open"
                : ""
            }`}
          />

        </button>

      )}


      {isOpen && (
        <div   className={
                `select-dropdown__menu ${
                    placement
                        ? "select-dropdown__menu--right"
                        : ""
                }`
            }>

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