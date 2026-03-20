import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const Chart = ({ data }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow h-72">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);