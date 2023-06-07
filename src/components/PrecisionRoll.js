import React from "react";
import {Pie, Cell, PieChart, Label} from "recharts";

export default function PrecisionRoll({R}) {
  R *= 100;
  const data = [{value: R}, {value: 100 - R}, {value: 1}];

  return (
    <PieChart width={75} height={75}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        dataKey="value"
        innerRadius={25}
        outerRadius={32}
        startAngle={90}
        endAngle={-360}
      >
        Test React - Node JS - Display Data
        {data.map((entry, index) => {
          if (index === 1 || index === 2) {
            return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
          }
          return <Cell key={`cell-${index}`} fill="green" />;
        })}
        <Label
          value={data[0].value + "%"}
          position="center"
          fill="grey"
          style={{
            fontSize: "17px",
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        />
      </Pie>
    </PieChart>
  );
}
