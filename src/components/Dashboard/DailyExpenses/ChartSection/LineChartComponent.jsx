import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { date: '2024-01', expense: 400 },
  { date: '2024-02', expense: 300 },
  { date: '2024-03', expense: 200 },
  { date: '2024-04', expense: 278 },
  { date: '2024-05', expense: 189 },
];

const LineChartComponent = ({styleContent}) => (
  <div style={styleContent}>
    <LineChart
    width={600}
    height={300}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="expense" stroke="#8884d8" />
  </LineChart>
  </div>
);

export default LineChartComponent;
