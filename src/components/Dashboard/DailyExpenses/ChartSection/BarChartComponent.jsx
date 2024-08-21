import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'Jan', expense: 400 },
  { month: 'Feb', expense: 300 },
  { month: 'Mar', expense: 200 },
  { month: 'Apr', expense: 278 },
  { month: 'May', expense: 189 },
];

const BarChartComponent = ({styleContent}) => (
 <div style={styleContent}>
   <BarChart
    width={600}
    height={300}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="expense" fill="#8884d8" />
  </BarChart>
 </div>
);

export default BarChartComponent;