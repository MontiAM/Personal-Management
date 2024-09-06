import { useEffect, useState } from "react";
import StatisticCard from "./StatisticsCard";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function StatisticsSection({ fetchDate }) {
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

  const getPercentage = (current, previous) => {
    if (previous === 0 || isNaN(previous)) {
      return 0;
    }
    return Math.round(((current - previous) * 100) / previous);
  };

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
        const resTotalExpensesAmount = await geTotalExpenseAmount(
          startOfMonth,
          endOfMonth
        );

        setTotalIncomeAmount(resTotalIncomesAmount);
        setTotalExpenseAmount(resTotalExpensesAmount);
      };

      fetchData();
    }
  }, [fetchDate]);

  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
        <StatisticCard
          totalAmount={totalIncomeAmount.currentPeriod}
          percentageChange={getPercentage(
            totalIncomeAmount.currentPeriod,
            totalIncomeAmount.previousPeriod
          )}
          type="income"
          categoryName={"Total Ingresos"}
        />
        <StatisticCard
          totalAmount={totalExpenseAmount.currentPeriod}
          percentageChange={getPercentage(
            totalExpenseAmount.currentPeriod,
            totalExpenseAmount.previousPeriod
          )}
          categoryName={"Total Gastos"}
        />
        <StatisticCard
          totalAmount={6000}
          percentageChange={-5}
          categoryName={"Ahorro"}
        />
      </div>
    </>
  );
}

export default StatisticsSection;
