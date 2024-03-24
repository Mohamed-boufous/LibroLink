import React from "react";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";

export default function BooksPieChart({ w, h,cx,cy }) {
  const data = [
    { name: "Free", value: 3 },
    { name: "Premium ", value: 2 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <PieChart width={w} height={h}>
      <Tooltip />
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx={cx}
        cy=  {cy}
        outerRadius={95}
        fill="#8884d8"
        label
      >
        <Cell fill="lightgray" />
        <Cell fill="rgb(249 115 22)" />
      </Pie>
    </PieChart>
  );
}
