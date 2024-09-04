import DatePickerComponent from "@/components/common/DatePicker";
import ChartSection from "./ChartSection/ChartSection";
import StatisticsSection from "./StatisticsSection/StatisticsSection";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const Statistics = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filterDate, setFilterDate] = useState(dayjs());

  const handleFilter = () => {
    setFilterDate(selectedDate);
  };

  return (
    <div className="flex flex-col justify-center items-stretch">
      <div className="flex gap-2 justify-start items-center ">
        <div className="flex gap-2 items-start">
          <DatePickerComponent onDateChange={setSelectedDate} />
        </div>
        <button
          onClick={handleFilter}
          className="text-white h-12 rounded-lg bg-blue-500 p-3 col-span-full"
        >
          Filter
        </button>
      </div>

      <div className="w-full">
        <StatisticsSection fetchDate={filterDate}/>
      </div>
      <div className="py-4 w-full">
        <ChartSection />
      </div>
    </div>
  );
};

export default Statistics;
