import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
type acceptProps = {
  month: number;
  year: number;
  editCalendar: (key: "month" | "year", value: number) => void;
};

export default function MonthSelector(props: acceptProps) {
  const { month, year, editCalendar } = props;

  const handleMonthChange = (number: number) => {
    editCalendar("month", month + number);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-63 max-h-7">
      <div
        className="cursor-pointer hover:bg-schema-surface-container rounded-md p-2.5 aspect-square text-schema-on-surface"
        onClick={() => handleMonthChange(-1)}
      >
        <IoIosArrowBack />
      </div>
      <p>
        {monthArr[month]} {year}
      </p>
      <div
        className="cursor-pointer hover:bg-schema-surface-container rounded-md p-2.5 aspect-square text-schema-on-surface"
        onClick={() => handleMonthChange(1)}
      >
        <IoIosArrowForward />
      </div>
    </div>
  );
}
