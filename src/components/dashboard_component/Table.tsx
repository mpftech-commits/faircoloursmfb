export const Table = ({ headers, children }: any) => (
  <table className="w-full bg-white rounded-2xl shadow overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        {headers.map((h: string) => (
          <th key={h} className="p-3 text-left text-sm">{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);