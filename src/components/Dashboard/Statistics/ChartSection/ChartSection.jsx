import ChartContainer from "./ChartContainer";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";

const ChartSection = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartContainer
          title="Gráfico de Ventas"
          description="Ventas del último trimestre"
        >
          <Chart1 />
        </ChartContainer>

        <ChartContainer title="Gráfico de Usuarios">
          <Chart2/>
        </ChartContainer>

        <ChartContainer title="Gráfico de Ingresos">
          <Chart3/>
        </ChartContainer>
      </div>
    </>
  );
};
export default ChartSection;
