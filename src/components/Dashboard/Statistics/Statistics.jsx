import DatePickerComponent from "@/components/common/DatePicker";
import StatisticsSection from "./StatisticsSection/StatisticsSection";
import ChartSection from "./ChartSection/ChartSection";
import TableBalanceSection from "./TableBalance/TableBalanceSection";

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

      <div className="flex flex-wrap mt-4">
        <div className="bg-gray-950 lg:h-[calc(100vh-11rem)] rounded-lg shadow-lg shadow-gray-900  w-full lg:w-2/3 pr-4">
          <div className="w-full">
            <StatisticsSection fetchDate={filterDate} />
          </div>
          <div className="py-4 w-full">
            <ChartSection />
          </div>
        </div>
        <div className="w-full lg:w-1/3 pl-4">
          <TableBalanceSection fetchDate={filterDate} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
