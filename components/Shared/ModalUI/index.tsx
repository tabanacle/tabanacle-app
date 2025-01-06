import useOnClickOutside from "@/utils/hooks/useOnclickOutside";
import { FC, ReactNode, useRef } from "react";

interface ModalUIProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalBodyClass?: string;
}

const ModalUI: FC<ModalUIProps> = ({
  children,
  isOpen,
  onClose,
  modalBodyClass,
}) => {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, modalRef, onClose);

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 bg-black-10 ${
        isOpen ? "block" : "hidden"
      } flex justify-center z-1`}
    >
      <div
        ref={modalRef}
        className={`w-full md:min-w-40 absolute top-0 md:top-4 bottom-0 md:bottom-[unset] right-0 md:right-[unset] left-0 md:left-[unset] bg-white md:rounded-1.2 p-1.6 md:p-2.8 ${modalBodyClass}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalUI;
