import { useState } from "react";
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

interface acceptProps {
  month: number;
  year: number;
}

export default function MonthSelector(props: acceptProps) {
  const { month, year } = props;

  const [displayMonth, setDisplayMonth] = useState(month);
  const [displayYear, setDisplayYear] = useState(year);

  const handleMonthChange = (number: number) => {
    setDisplayMonth((prev) => {
      if (prev + number < 0) {
        setDisplayYear((prev) => prev - 1);
        return 11;
      } else if (prev + number > 11) {
        setDisplayYear((prev) => prev + 1);
        return 0;
      }
      return prev + number;
    });
  };

  return (
    <div className="flex items-center justify-between w-full max-w-63">
      <div
        className="cursor-pointer border-1 border-schema-outline rounded-md p-2.5 aspect-square text-schema-on-surface"
        onClick={() => handleMonthChange(-1)}
      >
        <IoIosArrowBack />
      </div>
      <p>
        {monthArr[displayMonth]} {displayYear}
      </p>
      <div
        className="cursor-pointer border-1 border-schema-outline rounded-md p-2.5 aspect-square text-schema-on-surface"
        onClick={() => handleMonthChange(1)}
      >
        <IoIosArrowForward />
      </div>
    </div>
  );
}
