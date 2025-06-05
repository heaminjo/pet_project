import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
];
//  onMouseEnter={this.onPieEnter} 마우스 올라갈 시 실행행
export default function PieRing({ COLORS }) {
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        cx={120}
        cy={120}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
