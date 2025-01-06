import { FC, ReactNode, RefObject } from "react";
import Spinner from "../Spinner";

interface ButtonProps {
  ref?: RefObject<HTMLButtonElement>;
  type?: "submit" | "reset";
  size: "sm" | "md" | "lg";
  style: "borderless" | "gray" | "outline" | "filled";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  text: string;
  className?: string;
  fontSize?: `${
    | "sub-base:"
    | "base:"
    | "xxs:"
    | "xs:"
    | "sm:"
    | "md:"
    | "lg:"
    | "xl:"
    | "xl-b:"
    | "2xl:"
    | ""}text-${number}`;
  disabled?: boolean;
  bg?: string;
  textClass?: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({
  ref,
  type,
  size,
  style,
  loading,
  leftIcon,
  rightIcon,
  text,
  className,
  fontSize,
  disabled,
  bg,
  textClass,
  onClick,
}) => {
  const setFontSize = () => {
    if (fontSize) return fontSize;
    if (size === "sm") return "text-1.4 leading-2";
    if (size === "md") return "text-1.6 leading-2.4";
    if (size === "lg") return "text-1.8 leading-2.8";
    return "text-1.4";
  };

  const setIconSize = () => {
    if (size === "sm") return "[&>svg]:w-1.6 [&>svg]:h-1.6";
    if (size === "md") return "[&>svg]:w-2 [&>svg]:h-2";
    if (size === "lg") return "[&>svg]:w-2.4 [&>svg]:h-2.4";
    return "[&>svg]:w-1.6 [&>svg]:h-1.6";
  };

  const setBtnStyle = () => {
    if (style === "borderless")
      return `${bg || "bg-transparent"} text-black hover:bg-black-04`;
    if (style === "gray") return "bg-black-04 text-black hover:bg-black-20";
    if (style === "outline")
      return "bg-white text-black border-0.1 border-black-10 hover:bg-black-04 hover:border-black-20";
    if (style === "filled")
      return `${
        bg || "bg-black"
      } text-white hover:bg-black-40 disabled:bg-black-04`;
    return "bg-transparent hover:bg-black-04";
  };

  return (
    <button
      ref={ref}
      type={type || "button"}
      className={`${className || "flex items-center"} ${setBtnStyle()} ${
        size === "sm" ? "px-0.8 rounded-0.8 h-2.8 gap-0.4" : ""
      } ${size === "md" ? "px-1.6 rounded-1.2 h-4 gap-0.8" : ""} ${
        size === "lg" ? "px-2.4 rounded-1.6 h-5.6 gap-0.8" : ""
      } disabled:cursor-not-allowed group`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <Spinner color="black" width={20} height={20} />
      ) : (
        <>
          {leftIcon ? (
            <span
              className={`left group-disabled:[&>svg]:opacity-[0.1] ${setIconSize()}`}
            >
              {leftIcon}
            </span>
          ) : null}

          {text ? (
            <span
              className={`${
                textClass || setFontSize()
              } font-normal group-disabled:text-black-10`}
            >
              {text}
            </span>
          ) : null}

          {rightIcon ? (
            <span
              className={`right group-disabled:[&>svg]:opacity-[0.1] ${setIconSize()}`}
            >
              {rightIcon}
            </span>
          ) : null}
        </>
      )}
    </button>
  );
};

export default Button;
