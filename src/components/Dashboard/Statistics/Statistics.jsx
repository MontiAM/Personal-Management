import SideDrawer from "@/components/common/SideDrawer";
import DatePickerComponent from "@/components/common/DatePicker";
import StatisticsSection from "./statistics-section/StatisticsSection";
import ChartSection from "./chart-section/ChartSection";
import TableBalanceSection from "./table-balance/TableBalanceSection";

import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const Statistics = () => {
  const [selectedDate, setSelectedDate] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [filterDate, setFilterDate] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);

  const handleFilter = () => {
    setFilterDate(selectedDate);
  };

  return (
    <div className="flex flex-wrap justify-center items-stretch">
      <div className="w-full flex flex-col lg:flex-row gap-2">
        <SideDrawer title="Filtros">
          <DatePickerComponent onDateChange={setSelectedDate} />
          <button
            onClick={handleFilter}
            className="text-white h-12 rounded-lg bg-blue-500 p-3 col-span-full"
          >
            Filter
          </button>
        </SideDrawer>

        <div className="w-full">
          <StatisticsSection fetchDate={filterDate} />
        </div>
      </div>

      {/* <div className="bg-gray-950 lg:h-[calc(100vh-11rem)] shadow-lg shadow-gray-900 rounded-lg p-2"> */}
      {/* <div className="pt-4 w-full">
            <ChartSection fetchDate={filterDate}/>
          </div> */}
      {/* </div> */}

      {/* <div className="w-full lg:w-1/3 lg:pl-4">
        <TableBalanceSection />
      </div> */}
    </div>
  );
};

export default Statistics;
