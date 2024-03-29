import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

export default function SubAreaChart({ w,h,data,datakey }) {
  return (
    <ResponsiveContainer height={h} >
    <AreaChart
      width={w}
      height={h}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff8800" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ff8800" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis type="number">
        <Label value="Revenu in DH" angle={-90} position="insideLeft" fill="#ff8800" />
      </YAxis>
      <Tooltip />
      <Area
        type="monotone"
        dataKey={datakey}
        stroke="#ff8800"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  </ResponsiveContainer>
  );
}
