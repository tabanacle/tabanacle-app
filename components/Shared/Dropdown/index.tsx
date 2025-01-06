import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  ReactNode,
  useRef,
} from "react";
import Button from "../Button";
import useOnClickOutside from "@/utils/hooks/useOnclickOutside";
import useDisclosure from "@/utils/hooks/useDisclosure";
import Input from "../Input";
import Spinner from "../Spinner";

interface DropdownProps {
  btnText: string;
  width?: `${
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
    | ""}w-${string | number}`;
  btnClass?: string;
  dropListClass?: string;
  children: ReactNode;
  search?: never;
  inputLabel?: never;
  handleSearch?: never;
  inputType?: never;
  inputPlaceholder?: never;
  inputValue?: never;
  inputClass?: never;
  disabled?: boolean;
  loading?: boolean;
  isOpen: boolean;
  toggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  wrapClass?: string;
}

interface DropdownSearchProps {
  btnText?: never;
  width?: `${
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
    | ""}w-${string | number}`;
  btnClass?: never;
  dropListClass?: string;
  children: ReactNode;
  search: boolean;
  inputLabel?: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  inputType?: HTMLInputTypeAttribute;
  inputPlaceholder: string;
  inputValue: string;
  inputClass?: string;
  disabled?: boolean;
  loading?: boolean;
  isOpen: boolean;
  toggle?: never;
  onOpen: () => void;
  onClose: () => void;
  wrapClass?: string;
}

const Dropdown: FC<DropdownProps | DropdownSearchProps> = ({
  btnText,
  width,
  btnClass,
  dropListClass,
  children,
  search,
  inputLabel,
  handleSearch,
  inputType,
  inputPlaceholder,
  inputValue,
  inputClass,
  disabled,
  loading,
  isOpen,
  toggle,
  onOpen,
  onClose,
  wrapClass,
}) => {
  const dropRef = useRef(null);

  useOnClickOutside(dropRef, dropRef, onClose);

  return (
    <div
      ref={dropRef}
      className={`relative ${wrapClass || ""} ${width || "w-full"}`}
    >
      {search ? (
        <Input
          label={inputLabel}
          type={inputType || "text"}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={handleSearch}
          disabled={disabled || loading}
          // containerClass=""
          className={inputClass}
          onFocus={onOpen}
          rightIcon={
            loading ? (
              <Spinner color="#000000CC" width={16} height={16} />
            ) : (
              <span className="[&>svg]:w-1.6 [&>svg]:h-1.6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.7075 21.2926C22.8005 21.3854 22.8742 21.4957 22.9246 21.6171C22.9749 21.7385 23.0008 21.8686 23.0008 22.0001C23.0008 22.1315 22.9749 22.2616 22.9246 22.383C22.8742 22.5044 22.8005 22.6147 22.7075 22.7076L16.7075 28.7076C16.6146 28.8005 16.5043 28.8743 16.3829 28.9246C16.2615 28.9749 16.1314 29.0008 16 29.0008C15.8686 29.0008 15.7385 28.9749 15.6171 28.9246C15.4957 28.8743 15.3854 28.8005 15.2925 28.7076L9.29251 22.7076C9.10487 22.5199 8.99945 22.2654 8.99945 22.0001C8.99945 21.7347 9.10487 21.4802 9.29251 21.2926C9.48015 21.1049 9.73464 20.9995 10 20.9995C10.2654 20.9995 10.5199 21.1049 10.7075 21.2926L16 26.5863L21.2925 21.2926C21.3854 21.1996 21.4957 21.1258 21.6171 21.0755C21.7385 21.0252 21.8686 20.9993 22 20.9993C22.1314 20.9993 22.2615 21.0252 22.3829 21.0755C22.5043 21.1258 22.6146 21.1996 22.7075 21.2926ZM10.7075 10.7076L16 5.4138L21.2925 10.7076C21.4801 10.8952 21.7346 11.0006 22 11.0006C22.2654 11.0006 22.5199 10.8952 22.7075 10.7076C22.8951 10.5199 23.0006 10.2654 23.0006 10.0001C23.0006 9.73469 22.8951 9.48019 22.7075 9.29255L16.7075 3.29255C16.6146 3.19958 16.5043 3.12582 16.3829 3.07549C16.2615 3.02517 16.1314 2.99927 16 2.99927C15.8686 2.99927 15.7385 3.02517 15.6171 3.07549C15.4957 3.12582 15.3854 3.19958 15.2925 3.29255L9.29251 9.29255C9.10487 9.48019 8.99945 9.73469 8.99945 10.0001C8.99945 10.2654 9.10487 10.5199 9.29251 10.7076C9.48015 10.8952 9.73464 11.0006 10 11.0006C10.2654 11.0006 10.5199 10.8952 10.7075 10.7076Z"
                    fill="#00000066"
                  />
                </svg>
              </span>
            )
          }
        />
      ) : (
        <Button
          size="md"
          style="outline"
          text={btnText || ""}
          onClick={() => toggle?.()}
          className={`${btnClass} flex items-center justify-between gap-0.4 focus:shadow-focus focus:outline-none`}
          textClass="whitespace-nowrap overflow-x-hidden text-1.4 leading-2 text-left"
          fontSize="text-1.4"
          rightIcon={
            <span className="[&>svg]:w-1.6 [&>svg]:h-1.6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7075 21.2926C22.8005 21.3854 22.8742 21.4957 22.9246 21.6171C22.9749 21.7385 23.0008 21.8686 23.0008 22.0001C23.0008 22.1315 22.9749 22.2616 22.9246 22.383C22.8742 22.5044 22.8005 22.6147 22.7075 22.7076L16.7075 28.7076C16.6146 28.8005 16.5043 28.8743 16.3829 28.9246C16.2615 28.9749 16.1314 29.0008 16 29.0008C15.8686 29.0008 15.7385 28.9749 15.6171 28.9246C15.4957 28.8743 15.3854 28.8005 15.2925 28.7076L9.29251 22.7076C9.10487 22.5199 8.99945 22.2654 8.99945 22.0001C8.99945 21.7347 9.10487 21.4802 9.29251 21.2926C9.48015 21.1049 9.73464 20.9995 10 20.9995C10.2654 20.9995 10.5199 21.1049 10.7075 21.2926L16 26.5863L21.2925 21.2926C21.3854 21.1996 21.4957 21.1258 21.6171 21.0755C21.7385 21.0252 21.8686 20.9993 22 20.9993C22.1314 20.9993 22.2615 21.0252 22.3829 21.0755C22.5043 21.1258 22.6146 21.1996 22.7075 21.2926ZM10.7075 10.7076L16 5.4138L21.2925 10.7076C21.4801 10.8952 21.7346 11.0006 22 11.0006C22.2654 11.0006 22.5199 10.8952 22.7075 10.7076C22.8951 10.5199 23.0006 10.2654 23.0006 10.0001C23.0006 9.73469 22.8951 9.48019 22.7075 9.29255L16.7075 3.29255C16.6146 3.19958 16.5043 3.12582 16.3829 3.07549C16.2615 3.02517 16.1314 2.99927 16 2.99927C15.8686 2.99927 15.7385 3.02517 15.6171 3.07549C15.4957 3.12582 15.3854 3.19958 15.2925 3.29255L9.29251 9.29255C9.10487 9.48019 8.99945 9.73469 8.99945 10.0001C8.99945 10.2654 9.10487 10.5199 9.29251 10.7076C9.48015 10.8952 9.73464 11.0006 10 11.0006C10.2654 11.0006 10.5199 10.8952 10.7075 10.7076Z"
                  fill="#00000066"
                />
              </svg>
            </span>
          }
          loading={loading}
          disabled={disabled || loading}
        />
      )}

      <div
        className={`absolute left-0 border-0.1 border-black-10 p-0.8 rounded-1.6 ${dropListClass} bg-white-80 [backdrop-filter:_blur(40px)]
        ${
          isOpen ? "scale-100" : "scale-0"
        } origin-top-left transition-all duration-300 z-1`}
      >
        <div className="flex flex-col h-fit max-h-20 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
