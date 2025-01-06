/* eslint-disable camelcase */
import dayjs from "dayjs";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../Button";
import useDisclosure from "@/utils/hooks/useDisclosure";
import CaretLeft from "../Icons/CaretLeft";
import CaretRight from "../Icons/CaretRight";
import useOnClickOutside from "@/utils/hooks/useOnclickOutside";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

interface SelectDateProps {
  dateRangeSelected: (from: string, to: string) => void;
  setDirectDate: (type: string) => void;
  directDate: string;
  startDate: string;
  endDate: string;
  clearDate?: () => void;
  //
  btnClass?: string;
}

const dateFilters = [
  {
    id: 1,
    name: "All time",
    type: "",
  },
  {
    id: 2,
    name: "Today",
    type: "today",
  },
  {
    id: 3,
    name: "Last week",
    type: "last_week",
  },
  {
    id: 4,
    name: "This week",
    type: "this_week",
  },
  {
    id: 5,
    name: "Last month",
    type: "last_month",
  },
  {
    id: 6,
    name: "This year",
    type: "this_year",
  },
  // {
  //   id: 7,
  //   name: "Custom",
  //   type: "custom",
  // },
];

const DateSelector: FC<SelectDateProps> = ({
  dateRangeSelected,
  setDirectDate,
  directDate,
  startDate,
  endDate,
  clearDate,
  btnClass,
}) => {
  const router = useRouter();
  // const [startDate, setStartDate] = useState<Date | undefined>(
  //   fromStartDate ? dayjs(String(fromStartDate)).toDate() : undefined
  // );
  // const [endDate, setEndDate] = useState<Date | undefined>(
  //   fromEndDate ? dayjs(String(fromEndDate)).toDate() : undefined
  // );
  // const [directDateQuery, setDirectDateQuery] = useState(
  //   fromEndDate ? "custom" : String(directDate)
  // );
  const openCalendar = useDisclosure();
  const dropdownRef = useRef(null);
  const dropButtonRef = useRef(null);

  useOnClickOutside(dropdownRef, dropButtonRef, openCalendar.onClose);

  const dateChange = (dates: [any, any]) => {
    console.log(dates);
    const [start, end] = dates;
    const from = dayjs(start).format("YYYY-MM-DD");
    const to = dayjs(end).format("YYYY-MM-DD");

    // setStartDate(start);
    // setEndDate(end);

    if (start && end) {
      // setDirectDateQuery("custom");
      dateRangeSelected(from, to);
      openCalendar.onClose();
    } else {
      // dateRangeSelected("", "");
    }
  };

  const dateButtonValue = () => {
    if (directDate) return String(directDate).split("_").join(" ");
    // if (dateRange) return dateRange;
    // if (directDateQuery && directDateQuery !== "custom")
    //   return directDateQuery.split("_").join(" ");
    if (endDate)
      return `${dayjs(startDate as string).format("DD MMM YYYY")} - ${dayjs(
        endDate as string
      ).format("MMM DD MMM YYYY")}`;
    return "Select date";
  };

  return (
    <div className="relative">
      <div ref={dropButtonRef} className="flex items-center gap-0.8">
        <Button
          size="md"
          style="outline"
          text={dateButtonValue()}
          onClick={openCalendar.toggle}
          className={`${btnClass} flex items-center justify-between gap-0.4 focus:shadow-focus focus:outline-none`}
          fontSize="text-1.4"
        />
      </div>

      <div
        ref={dropdownRef}
        className={String.raw`flex flex-col origin-top-left border border-black-20 rounded-0.8 bg-white shadow-dropdown
        absolute left-0 ${
          openCalendar.isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } transition-all duration-300 z-2 w-full`}
      >
        <div className="py-1.2 px-1.6 bg-transparent flex flex-wrap gap-0.4">
          {dateFilters.map(({ id, name, type }) => (
            <Button
              key={id}
              size="sm"
              style="borderless"
              text={name}
              onClick={() => {
                setDirectDate(type);
                openCalendar.onClose();
              }}
              bg={directDate === type && !endDate ? "bg-black" : ""}
              textClass={
                directDate === type && !endDate
                  ? "text-white text-1.4 leading-2 hover:text-black"
                  : ""
              }
            />
          ))}
        </div>

        <div className="border-t border-black-40 w-full">
          {/* <div className="w-[33.8rem] py-2 pr-3.2 pl-2.4"> */}
          <DateRangePicker
            isOpen={openCalendar.isOpen}
            maxDate={new Date()}
            value={[startDate, endDate]}
            onChange={(dates) => {
              const [from, to]: any = dates;

              dateRangeSelected(
                dayjs(from).format("YYYY-MM-DD"),
                dayjs(to).format("YYYY-MM-DD")
              );
              openCalendar.onClose();
            }}
            className={`${inter.className} p-1.6`}
          />
          {/* <DatePicker
              renderCustomHeader={({
                monthDate,
                customHeaderCount,
                decreaseMonth,
                increaseMonth,
              }) => (
                <div className="datepicker__current">
                  <button
                    type="button"
                    aria-label="Previous Month"
                    className="datepicker__navigation datepicker__navigation--previous"
                    style={{
                      visibility:
                        customHeaderCount === 1 ? "hidden" : "visible",
                    }}
                    onClick={decreaseMonth}
                  >
                    <span className="react-datepicker__navigation-ico react-datepicker__navigation-icon--previou">
                      <CaretLeft />
                    </span>
                  </button>
                  <span className="datepicker__current-month">
                    {monthDate.toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    type="button"
                    aria-label="Next Month"
                    className="datepicker__navigation datepicker__navigation--next"
                    style={{
                      visibility:
                        customHeaderCount === 1 ? "hidden" : "visible",
                    }}
                    onClick={increaseMonth}
                  >
                    <span className="react-datepicker__navigation-ico react-datepicker__navigation-icon--nex">
                      <CaretRight />
                    </span>
                  </button>
                </div>
              )}
              selected={startDate}
              onChange={dateChange}
              startDate={startDate}
              endDate={endDate}
              closeOnScroll
              maxDate={new Date()}
              calendarClassName={[inter.className, "calendar-style"].join(" ")}
              selectsRange
              isClearable
              inline
            /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
