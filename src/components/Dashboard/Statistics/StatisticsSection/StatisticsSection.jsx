import StatisticCard from "./StatisticsCard";

function StatisticsSection() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticCard totalAmount={1000} percentageChange={0} categoryName={"Total Ingresos"} />
        <StatisticCard totalAmount={3000} percentageChange={30} categoryName={"Total Gastos"} />
        <StatisticCard totalAmount={500} percentageChange={40} categoryName={"Diferencia"} />
        <StatisticCard totalAmount={6000} percentageChange={-5} categoryName={"Ahorro"} />
      </div>
  );
}

export default StatisticsSection;


// import { useState } from "react";
// import { Carousel } from "antd";
// import Chart1 from "./Chart1";
// import Chart2 from "./Chart2";
// import Chart3 from "./Chart3";

// const contentStyle = {
//   height: "600px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   paddingTop: "50px",
// };

// const ChartSection = () => {
//   const [dotPosition, setDotPosition] = useState("top");
//   const handlePositionChange = ({ target: { value } }) => {
//     setDotPosition(value);
//   };
//   return (
//     <>
//       <Carousel dotPosition={dotPosition}>
//         <div>
//           <Chart1 styleContent={contentStyle}>1</Chart1>
//         </div>
//         <div>
//           <Chart2 styleContent={contentStyle}>1</Chart2>
//         </div>
//         <div>
//           <Chart3 styleContent={contentStyle}>1</Chart3>
//         </div>
//       </Carousel>
//     </>
//   );
// };
// export default ChartSection;
