import ChartContainer from "./ChartContainer";
import Chart1 from "./Chart1";
import PieChart1 from "./PieChart1";
import Chart2 from "./Chart2";
import { useEffect, useState } from "react";

const ChartSection = ({ fetchDate }) => {
  const [categoryExpenses, setCategoryExpenses] = useState([]);

  useEffect(() => {
    if (fetchDate) {
      const startOfMonth = fetchDate.startOf("month").format("YYYY-MM-DD");
      const endOfMonth = fetchDate.endOf("month").format("YYYY-MM-DD");

      const getSumCategoryExpenses = async (startDate, endDate) => {
        try {
          const res = await fetch(
            `/api/statistics/categoryExpensesSum?fecha_desde=${startDate}&fecha_hasta=${endDate}`
          );
          const data = await res.json();
          return data;
        } catch (error) {
          console.error("Error fetching category data: ", error);
          return null;
        }
      };

      const fetchData = async () => {
        const resSumCategoryExpenses = await getSumCategoryExpenses(
          startOfMonth,
          endOfMonth
        );
        setCategoryExpenses(resSumCategoryExpenses);
      };

      fetchData();
    }
  }, [fetchDate]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Gráfico de Ventas"
          description="Ventas del último trimestre"
        >
          <Chart1 />
        </ChartContainer>
        <ChartContainer
          title="Gráfico de Ventas"
          description="Ventas del último trimestre"
        >
          <PieChart1 dataSource={categoryExpenses.currentPeriod}/>
        </ChartContainer>

        <ChartContainer title="Gastos por categoría">
          <Chart2 dataSource={categoryExpenses} />
        </ChartContainer>
      </div>
    </>
  );
};
export default ChartSection;
