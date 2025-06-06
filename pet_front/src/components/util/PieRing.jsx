import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

//  onMouseEnter={this.onPieEnter} 마우스 올라갈 시 실행행
export default function PieRing({ data, COLORS }) {
  if (!Array.isArray(data)) return null;
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
