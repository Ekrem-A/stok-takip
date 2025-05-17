'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'May 10', stock: 1400 },
  { date: 'May 11', stock: 1500 },
  { date: 'May 12', stock: 1600 },
  { date: 'May 13', stock: 1650 },
  { date: 'May 14', stock: 1700 },
  { date: 'May 15', stock: 1750 },
  { date: 'May 16', stock: 1800 },
];

export default function StockTrends() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Stock Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="stock" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}