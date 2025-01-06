import useOnClickOutside from "@/utils/hooks/useOnclickOutside";
import { FC, ReactNode, useRef } from "react";

interface DrawerUIProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const DrawerUI: FC<DrawerUIProps> = ({ children, isOpen, onClose }) => {
  const drawerRef = useRef(null);
  useOnClickOutside(drawerRef, drawerRef, onClose);

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 bg-black-10 ${
        isOpen ? "block" : "hidden"
      } z-1`}
    >
      <div
        ref={drawerRef}
        className="w-full md:w-40 absolute top-0 md:top-1.6 bottom-0 md:bottom-1.6 right-0 md:right-1.6 left-0 md:left-[unset] bg-white rounded-1.2 p-2.8"
      >
        {children}
      </div>
    </div>
  );
};

export default DrawerUI;
