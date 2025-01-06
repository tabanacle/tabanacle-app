import useDisclosure from "@/utils/hooks/useDisclosure";
import useQueryString from "@/utils/hooks/useQueryString";
import { FC, useState } from "react";
import Button from "../Shared/Button";
import DateSelector from "../Shared/DateSelector";
import DrawerUI from "../Shared/DrawerUI";
import Dropdown from "../Shared/Dropdown";
import DropdownItem from "../Shared/Dropdown/DropdownItem";

interface MembersFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  queryParams: {
    gender: string;
    date: string;
    "start-date": string;
    "end-date": string;
  };
}

const MembersFilters: FC<MembersFiltersProps> = ({
  isOpen,
  onClose,
  queryParams,
}) => {
  const [filters, setFilters] = useState({
    gender: queryParams?.gender || "",
    date: queryParams?.date || "",
    startDate: queryParams?.["start-date"] || "",
    endDate: queryParams?.["end-date"] || "",
  });
  const genderDropdown = useDisclosure();

  const { updateQueryString } = useQueryString();

  return (
    <DrawerUI isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-between gap-1.6 h-full">
        <div className="flex flex-col gap-1.6">
          <div className="flex items-center justify-between gap-1.2">
            <h3 className="text-1.8 leading-3.2 font-medium text-black">
              Filter members
            </h3>
          </div>

          <Dropdown
            isOpen={genderDropdown.isOpen}
            onClose={genderDropdown.onClose}
            onOpen={genderDropdown.onOpen}
            toggle={genderDropdown.toggle}
            btnText={filters.gender || "Select gender"}
            btnClass="w-full h-4.4 capitalize"
            dropListClass="w-full"
          >
            <DropdownItem
              value="Male"
              onClick={() => {
                setFilters((fil) => ({ ...fil, gender: "male" }));
                genderDropdown.onClose();
              }}
            />
            <DropdownItem
              value="Female"
              onClick={() => {
                setFilters((fil) => ({ ...fil, gender: "female" }));
                genderDropdown.onClose();
              }}
            />
          </Dropdown>

          <DateSelector
            directDate={filters.date}
            startDate={filters.startDate}
            endDate={filters.endDate}
            setDirectDate={(date) =>
              setFilters((fil) => ({
                ...fil,
                date: date,
                startDate: "",
                endDate: "",
              }))
            }
            dateRangeSelected={(from, to) =>
              setFilters((fil) => ({
                ...fil,
                startDate: from,
                endDate: to,
                date: "",
              }))
            }
            btnClass="h-4.4 capitalize w-full"
          />
        </div>

        <div className="flex items-center gap-0.8 justify-end">
          <Button
            size="md"
            style="borderless"
            text="Cancel"
            onClick={onClose}
          />

          <Button
            size="md"
            style="filled"
            text="Done"
            onClick={() => {
              updateQueryString({
                gender: filters.gender,
                "start-date": filters.startDate,
                "end-date": filters.endDate,
                date: filters.date,
              });
              onClose();
            }}
          />
        </div>
      </div>
    </DrawerUI>
  );
};

export default MembersFilters;
