import {
  ChangeEvent,
  FC,
  FocusEventHandler,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  KeyboardEvent,
  MutableRefObject,
  ReactElement,
} from "react";
import EyesClosed from "../Icons/EyesClosed";
import EyesOpen from "../Icons/EyesOpen";
import Warning from "../Icons/Warning";

type TypeOfPasswordProps = {};
type TypeOfNotPasswordProps = { password?: never; passwordClick?: never };

type PasswordInput = TypeOfPasswordProps | TypeOfNotPasswordProps;

interface InputProps {
  label?: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  id?: string;
  type: HTMLInputTypeAttribute;
  name?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  password?: true;
  passwordClick?: () => void;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  containerClass?: string;
  errorMessage?: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
}

const Input: FC<InputProps> = ({
  label,
  inputRef,
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  onKeyUp,
  onBlur,
  onFocus,
  inputMode,
  password,
  passwordClick,
  readOnly,
  required,
  disabled,
  className,
  containerClass,
  errorMessage,
  rightIcon,
  leftIcon,
}) => {
  return (
    <fieldset className={`${containerClass || "w-full flex flex-col gap-0.4"}`}>
      {label ? (
        <label
          htmlFor={id}
          className="text-1.2 leading-1.6 font-medium text-black"
        >
          {label}
        </label>
      ) : null}

      <div className="relative flex items-center">
        {/* Left icon */}
        {leftIcon ? (
          <span className="absolute left-0.8 [&>svg]:w-1.6 [&>svg]:h-1.6">
            {leftIcon}
          </span>
        ) : null}

        <input
          ref={inputRef}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          onFocus={onFocus}
          inputMode={inputMode}
          readOnly={readOnly}
          required={required}
          disabled={disabled}
          className={`bg-white-80 font-normal border-[0.05rem] ${
            errorMessage ? "border-red-light" : "border-black-20"
          } placeholder:font-normal placeholder:text-black-20 ${className}
          hover:border-black-40 focus:border-black-40 focus:outline-none focus:shadow-focus ${
            password || errorMessage || rightIcon ? "pr-3.2" : ""
          } ${leftIcon ? "pl-3" : ""}`}
        />

        {/* Password icons */}
        {password && !errorMessage ? (
          <button
            type="button"
            className="absolute right-1.2 [&>svg]:w-1.6 [&>svg]:h-1.6 focus:outline-none"
            onClick={passwordClick}
          >
            {type === "password" ? (
              <EyesClosed color="#00000066" />
            ) : (
              <EyesOpen color="#00000066" />
            )}
          </button>
        ) : null}

        {/* Status icon */}
        {errorMessage ? (
          <span className="absolute right-1.2 [&>svg]:w-1.6 [&>svg]:h-1.6">
            <Warning color="#FF4747" />
          </span>
        ) : null}

        {/* Right icon */}
        {rightIcon ? (
          <span className="absolute right-0.8 [&>svg]:w-1.6 [&>svg]:h-1.6">
            {rightIcon}
          </span>
        ) : null}
      </div>

      {/* Status message */}
      {errorMessage ? (
        <span
          className={`text-1.2 leading-1.6 font-normal inline-block ${
            errorMessage ? "text-red-light" : ""
          }`}
        >
          {errorMessage}
        </span>
      ) : null}
    </fieldset>
  );
};

export default Input;
