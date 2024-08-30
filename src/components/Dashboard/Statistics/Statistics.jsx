import ChartSection from "./ChartSection/ChartSection";
import StatisticsSection from "./StatisticsSection/StatisticsSection";

const Statistics = () => {
  return (
    <div className="flex flex-col justify-center items-stretch">
      <div className="w-full">
        <StatisticsSection />
      </div>
      <div className="py-4 w-full">
        <ChartSection />
      </div>
    </div>
  );
};

export default Statistics;