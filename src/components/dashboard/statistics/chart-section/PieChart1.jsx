import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
    "#81d4a5",
    "#3e3e99",
    "#7474e0",
    "#66cc99",
    "#5a5ac6",
    "#3e3e99",
    "#a6a6ff",
    "#9adeb5",
    "#b8e6c9",
  ];

const PieChart1 = ({ dataSource }) => {
  const [activeSlices, setActiveSlices] = useState([]);

  useEffect(() => {
    if (dataSource) {
      setActiveSlices(dataSource.map(() => true));
    }
  }, [dataSource]);

  const handleLegendClick = (data, index) => {
    const newActiveSlices = [...activeSlices];
    newActiveSlices[index] = !newActiveSlices[index];
    if (newActiveSlices.every((slice) => !slice)) {
      newActiveSlices[index] = true;
    }
    setActiveSlices(newActiveSlices);
  };

  const filteredData = dataSource
    ? dataSource
        .filter((entry, index) => activeSlices[index])
        .map((entry) => ({
          ...entry,
          expense_amount: Number(entry.expense_amount),
        }))
    : [];

  const renderTooltip = (value, name, props) => {
    const { payload } = props;
    return [`$${value.toFixed(2)}`, payload.expense_category];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="expense_amount"
          isAnimationActive={true}
          data={filteredData}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          startAngle={90}
          endAngle={-270}
        >
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip formatter={renderTooltip} />
        <Legend
          onClick={handleLegendClick}
          payload={dataSource?.map((entry, index) => ({
            id: entry.expense_category,
            type: "square",
            value: entry.expense_category,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChart1;
