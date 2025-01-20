import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart2 = ({ dataSource }) => {
  const currentMap = new Map(
    dataSource.currentPeriod?.map((item) => [
      item.expense_category,
      item.expense_amount,
    ])
  );
  const previousMap = new Map(
    dataSource.previousPeriod?.map((item) => [
      item.expense_category,
      item.expense_amount,
    ])
  );

  const allCategories = new Set([...currentMap.keys(), ...previousMap.keys()]);

  const data = Array.from(allCategories).map((category) => ({
    name: category,
    current: currentMap.has(category) ? currentMap.get(category) : 0,
    previous: previousMap.has(category) ? previousMap.get(category) : 0,
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            tick={{
              fontSize: 10,
              interval: 0,
              angle: -90,
              textAnchor: "end",
              dy: 2,
              overflow: "visible",
              whiteSpace: "normal",
            }}
            height={70}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="previous"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="current"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart2;
