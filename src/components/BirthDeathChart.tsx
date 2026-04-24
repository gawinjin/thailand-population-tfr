import { useState } from "react";
import { Line, LineChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { enrichedDemographics } from "../data/demographics";
import { ChartChrome } from "./ChartChrome";
import { CustomTooltip } from "./CustomTooltip";

type Mode = "absolute" | "index" | "yoy";

export function BirthDeathChart() {
  const [mode, setMode] = useState<Mode>("absolute");
  const data = enrichedDemographics.map((row) => ({
    ...row,
    births: mode === "absolute" ? row.registered_births : mode === "index" ? row.birth_index_2016 : row.birth_change_yoy,
    deaths: mode === "absolute" ? row.registered_deaths : mode === "index" ? row.death_index_2016 : row.death_change_yoy
  }));
  return (
    <ChartChrome footer="Hover for source note, status, cutoff and natural change. Approximate rates are available in the source table below.">
      <div className="control-row">
        {(["absolute", "index", "yoy"] as Mode[]).map((item) => (
          <button className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>
            {item === "absolute" ? "Counts" : item === "index" ? "Index 2016 = 100" : "YoY change %"}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data} margin={{ top: 18, right: 18, left: 12, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e1ded5" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine x={2021} stroke="#b44745" label={{ value: "Deaths exceed births", position: "top" }} />
          <Line type="monotone" dataKey="births" name="Registered births" stroke="#2f6f73" strokeWidth={3} dot />
          <Line type="monotone" dataKey="deaths" name="Registered deaths" stroke="#8a5a44" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </ChartChrome>
  );
}
