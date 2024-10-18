import { useEffect, useState } from "react";
import StatisticCard from "./StatisticsCard";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import getPreviousMonthRange from "@/helpers/getPreviousMonthRange";

dayjs.extend(customParseFormat);

function StatisticsSection({ fetchDate }) {
  const [totals, setTotals] = useState([]);
  const [prevTotals, setPrevTotals] = useState([]);

  const getPercentage = (current, previous) => {    
    if (previous === 0 || isNaN(previous)) {
      return 0;
    }
    return Math.round(((current - previous) * 100) / previous);
  };

  const findByClasif = (totals, tipo) => {
    const resultado = totals.find(
      (transaccion) => transaccion.trans_type_classif === tipo
    );
    return resultado ? resultado.total_amount : 0;
  };

  useEffect(() => {
    if (fetchDate) {
      const startOfMonth = fetchDate[0].format("YYYY-MM-DD");
      const endOfMonth = fetchDate[1].format("YYYY-MM-DD");

      const getTotal = async (startDate, endDate) => {
        try {
          const res = await fetch(
            `/api/transactionsStatistics/groupByTypeClasif?fecha_desde=${startDate}&fecha_hasta=${endDate}`
          );
          const data = await res.json();
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };

      const getPReviousTotal = async (startDate, endDate) => {
        const prevDate = getPreviousMonthRange(startDate);
        try {
          const res = await fetch(
            `/api/transactionsStatistics/groupByTypeClasif?fecha_desde=${prevDate.startDate}&fecha_hasta=${prevDate.endDate}`
          );
          const data = await res.json();          
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };

      const fetchData = async () => {
        const resTotals = await getTotal(startOfMonth, endOfMonth);
        const prevResTotals = await getPReviousTotal(startOfMonth, endOfMonth);        
        setTotals(resTotals.data);
        setPrevTotals(prevResTotals.data);
      };

      fetchData();
    }
  }, [fetchDate]);

  return (
    <div className="flex flex-col items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
        <StatisticCard
          totalAmount={findByClasif(totals, "INGRESO")}
          percentageChange={getPercentage(
            findByClasif(totals, "INGRESO"),
            findByClasif(prevTotals, "INGRESO")
          )}
          type="income"
          categoryName={"Total Ingresos"}
        />
        <StatisticCard
          totalAmount={findByClasif(totals, "GASTO")}
          percentageChange={getPercentage(
            findByClasif(totals, "GASTO"),
            findByClasif(prevTotals, "GASTO")
          )}
          categoryName={"Total Gastos"}
        />
        <StatisticCard
          totalAmount={findByClasif(totals, "AHORRO")}
          percentageChange={getPercentage(
            findByClasif(totals, "AHORRO"),
            findByClasif(prevTotals, "AHORRO")
          )}
          categoryName={"Ahorro"}
        />
      </div>
  );
}

export default StatisticsSection;
