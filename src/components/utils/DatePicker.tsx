import { ValueSetter } from "@/types";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

interface DatePickerProps {
  value: string | undefined; // date with dd/mm/yyyy format (locale)
  setValue: ValueSetter<string>;
}

export function DatePicker({ value, setValue }: DatePickerProps) {
  const dayName = ["M", "T", "W", "Th", "F", "S", "S"];
  const monthName = [
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

  const [localeDate, localeMonth, localeYear] = value
    ? value.split("/")
    : new Date().toLocaleDateString().split("/");
  const current =
    new Date(`${localeMonth}-${localeDate}-${localeYear}`) || new Date();
  const [date, month, year] = [
    current.getDate(),
    current.getMonth(),
    current.getFullYear(),
  ];

  const [togglePicker, setTogglePicker] = useState<boolean>(false);
  const [dateOptions, setDateOptions] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(Number(month));
  const [selectedYear, setSelectedYear] = useState<number>(Number(year));
  const [dateValue, setDateValue] = useState<string>(
    `${date}/${month}/${year}`
  );

  const handleBack = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleForward = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleSelectDate = (thisDate: number) => {
    setDateValue(`${thisDate}/${selectedMonth}/${selectedYear}`); // month start from 0
    setValue(
      `${thisDate > 9 ? thisDate : `0${thisDate}`}/${
        selectedMonth > 8 ? selectedMonth + 1 : `0${selectedMonth + 1}`
      }/${selectedYear}`
    ); // month start from 1
  };

  const isSelectedDate = (thisDate: number) => {
    const current = `${thisDate}/${selectedMonth}/${selectedYear}`;

    return current === dateValue;
  };

  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedMonth + 1, selectedYear);
    const numBlank = daysInMonth[0].day;

    [...Array(numBlank)].forEach((_, i) => {
      daysInMonth.splice(0, 0, { date: NaN, day: i });
    });

    setDateOptions(daysInMonth);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    try {
      const [localeDate, localeMonth, localeYear] = value
        ? value.split("/")
        : new Date().toLocaleDateString().split("/");
      const current =
        new Date(`${localeMonth}-${localeDate}-${localeYear}`) || new Date();
      const [date, month, year] = [
        current.getDate(),
        current.getMonth(),
        current.getFullYear(),
      ];

      setSelectedMonth(month);
      setSelectedYear(year);
      setDateValue(`${date}/${month}/${year}`);
    } catch {}
  }, [value]);

  return (
    <div className="flex relative">
      <button onClick={() => setTogglePicker(!togglePicker)}>
        <Icon name="calendar" />
      </button>
      {togglePicker && (
        <div className="flex z-20 bg-white flex-col absolute top-8 h-max w-48 border border-[#828282] rounded text-12">
          <div className="grid grid-cols-[24px_1fr_24px] text-center px-2 py-3">
            <button onClick={() => handleBack()}>
              <Icon name="arrow_back" />
            </button>
            <div className="font-bold">
              {monthName[selectedMonth]} {selectedYear}
            </div>
            <button onClick={() => handleForward()}>
              <Icon name="arrow_forward" />
            </button>
          </div>
          <div className="px-2 mb-2">
            <div className="grid grid-cols-7 text-center mb-1">
              {dayName.map((day) => (
                <span>{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 text-center gap-y-1">
              {dateOptions.map(({ date, _ }) => (
                <span
                  onClick={() => handleSelectDate(date)}
                  className={`cursor-default ${
                    isSelectedDate(date) &&
                    "border border-[#2F80ED] rounded-full w-5 place-self-center"
                  }`}
                >
                  {date || ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Get current month's date in { dateNumber: dateDay }
 * @param month
 * @param year
 * @returns
 */
const getDaysInMonth = (month: number, year: number) => {
  console.log(month, year);
  const nDays = new Date(year, month, 0).getDate();

  const currentMonth = [...Array(nDays)].map((_, i) => {
    const current = new Date(`${month}-${i + 1}-${year}`);
    return {
      date: i + 1,
      day: current.getDay() === 0 ? 6 : current.getDay() - 1,
    };
  });

  return currentMonth;
};
