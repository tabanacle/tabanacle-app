import { FC, useRef } from "react";
import Bell from "../Shared/Icons/Bell";
import useDisclosure from "@/utils/hooks/useDisclosure";
import useOnClickOutside from "@/utils/hooks/useOnclickOutside";
import Close from "../Shared/Icons/Close";

const Notifications: FC = () => {
  const btnRef = useRef(null);
  const dropRef = useRef(null);
  const notifications = useDisclosure();
  useOnClickOutside(btnRef, dropRef, notifications.onClose);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        className="flex items-center justify-center min-w-2.8 h-2.8 [&>svg]:w-2 [&>svg]:h-2 relative"
        onClick={notifications.toggle}
      >
        <span className="absolute top-0.2 right-0.4 min-w-0.8 h-0.8 bg-red-light rounded-full" />
        <Bell />
      </button>

      <div
        ref={dropRef}
        className={`absolute right-0 bg-notificatin-drop [backdrop-filter:_blur(100px)] p-2 rounded-2 flex flex-col gap-0.4 w-32 ${
          notifications.isOpen ? "scale-100" : "scale-0"
        } transition-all duration-300 origin-top-right z-1`}
      >
        <div className="flex items-center justify-between gap-0.4 p-0.8">
          <p className="text-black text-2.4 leading-3.2 font-normal">
            Notifications
          </p>

          <button
            type="button"
            className="flex items-center justify-center min-w-2.8 h-2.8 [&>svg]:w-2 [&>svg]:h-2"
            onClick={notifications.onClose}
          >
            <Close />
          </button>
        </div>
        <div className="flex flex-col gap-0.4 h-20 overflow-y-auto"></div>
      </div>
    </div>
  );
};

export default Notifications;
