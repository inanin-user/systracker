"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function BarChartComponent({ data }) {
  return (
    <div className="pt-3 pb-3  rounded-xl bg-navy">
      <h1 className="ml-5 mb-3 text-xl">Disk Space (14:00 Everyday)</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: "#334756" }} />
          <Legend />
          <Bar dataKey="freeSpaceGB" name="Free Space (GB)" fill="#FF7D29" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
