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
    <div className="flex flex-wrap justify-center items-stretch">
      <div className="w-full lg:w-2/3 ">

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

        <div className="bg-gray-950 lg:h-[calc(100vh-11rem)] shadow-lg shadow-gray-900 rounded-lg p-2">
          <div className="w-full">
            <StatisticsSection fetchDate={filterDate} />
          </div>
          <div className="pt-4 w-full">
            <ChartSection />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 lg:pl-4">
        <TableBalanceSection/>
      </div>
    </div>
  );
};

export default Statistics;
