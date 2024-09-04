import { useEffect, useState } from "react";
import StatisticCard from "./StatisticsCard";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function StatisticsSection({ fetchDate }) {
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

  useEffect(() => {
    if (fetchDate) {
      const startOfMonth = fetchDate.startOf("month").format("YYYY-MM-DD");
      const endOfMonth = fetchDate.endOf("month").format("YYYY-MM-DD");

      const geTotalIncomeAmount = async (startDate, endDate) => {
        try {
          const res = await fetch(
            `/api/statistics/totalIncomes?fecha_desde=${startDate}&fecha_hasta=${endDate}`
          );
          const data = await res.json();
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };
      const geTotalExpenseAmount = async (startDate, endDate) => {
        try {
          const res = await fetch(
            `/api/statistics/totalExpenses?fecha_desde=${startDate}&fecha_hasta=${endDate}`
          );
          const data = await res.json();
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };

      const fetchData = async () => {
        
        const resTotalIncomesAmount = await geTotalIncomeAmount(
          startOfMonth,
          endOfMonth
        );
        setTotalIncomeAmount(resTotalIncomesAmount);

        const resTotalExpensesAmount = await geTotalExpenseAmount(
          startOfMonth,
          endOfMonth
        );
        setTotalExpenseAmount(resTotalExpensesAmount);
      };

      fetchData();
    }
  }, [fetchDate]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatisticCard
        totalAmount={1000}
        percentageChange={0}
        categoryName={"Total Ingresos"}
      />
      <StatisticCard
        totalAmount={3000}
        percentageChange={30}
        categoryName={"Total Gastos"}
      />
      <StatisticCard
        totalAmount={500}
        percentageChange={40}
        categoryName={"Diferencia"}
      />
      <StatisticCard
        totalAmount={6000}
        percentageChange={-5}
        categoryName={"Ahorro"}
      />
    </div>
  );
}

export default StatisticsSection;
