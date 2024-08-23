import ChartSection from "./ChartSection/ChartSection";

const Statistics = () => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
          <div>
            <h1 className="text-white text-5xl">Statistics</h1>
          </div>
        </section>
        <ChartSection />
      </div>
    </div>
  );
};

export default Statistics;
