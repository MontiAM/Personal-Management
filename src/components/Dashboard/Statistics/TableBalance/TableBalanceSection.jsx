import { DatePicker } from "antd";
import TableBalance from "./TableBalance";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
dayjs.extend(customParseFormat);

const monthFormat = "YYYY";

const generateDefaultData = (year) => {
  const defaultData = [];
  for (let i = 1; i <= 12; i++) {
    defaultData.push({
      year: year,
      month: i,
      total_income: 0,
      total_expense: 0,
      balance: 0,
    });
  }
  return defaultData;
};

const TableBalanceSection = () => {

  const [ date, setDate ] = useState(dayjs())
  const [ dataSource, setDataSource ] = useState(generateDefaultData())

  useEffect( () => {
    if (date) {
      const startOfYear = date.startOf("year").format("YYYY-MM-DD");
      const endOfYear = date.endOf("year").format("YYYY-MM-DD");
      
      const getBalanceData = async( startDate, endDate) => {
        try { 
          const res = await fetch(
            `/api/statistics/monthlyBalance?fecha_desde=${startDate}&fecha_hasta=${endDate}`
          );
          const data = res.json();
          return data;
        } catch(error) {
          console.error("Error fetching data: ", error);
          return null
        }
      }

      const fetchData = async () => {
        const resBalanceData = await getBalanceData(startOfYear, endOfYear);

        const year = date.year();
        const defaultData = generateDefaultData(year);

        const finalData = defaultData.map((defaultMonth) => {
          const foundMonth = resBalanceData.find(
            (data) => data.month === defaultMonth.month && data.year === year
          );
          return foundMonth || defaultMonth; 
        });

        setDataSource(finalData);
      };

      fetchData()
      
    }
  }, [date])


  const handleChange = (value) => {
    setDate(value)  
  };

  return (
    <>
      <div className="bg-gray-950 lg:h-[calc(100vh-6rem)] shadow-lg shadow-gray-900 rounded-lg">
        <div className="flex justify-between pb-5">
          <h1 className="text-white text-lg sm:text-xl font-bold">Balance</h1>
          <DatePicker
            defaultValue={dayjs()}
            format={monthFormat}
            picker="year"
            onChange={handleChange}
          />
        </div>
        <TableBalance dataSource={dataSource} />
      </div>
    </>
  );
};

export default TableBalanceSection;
