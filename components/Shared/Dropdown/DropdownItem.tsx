import { FC, ReactElement } from "react";

interface DropdownItemProps {
  value: string | ReactElement;
  onClick: () => void;
}

const DropdownItem: FC<DropdownItemProps> = ({ value, onClick }) => {
  return (
    <button
      type="button"
      className="inline-flex text-left p-0.8 text-1.4 leading-2 font-normal text-black hover:text-black-40 focus:text-black-40 focus:outline-none"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default DropdownItem;
