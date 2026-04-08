
import { useState } from "react";

 function StatsCard  ({ title, value, icon }: any) {

  const [period, setPeriod] = useState('week');




  return(

    <div className="bg-white rounded-xl shadow overflow-hidden flex-1 p-3">
    <p className="text-gray-500 text-sm">{title}</p>
    <span className="flex items-center gap-3">
      <p className="bg-blue-100 w-fit p-1 rounded-md mt-2 text-blue-700 ">
        {icon}
      </p>
      <h2 className="text-lg font-medium text-blue-700">{value} {period}</h2>
    </span>
    {/* FILTER BUTTONS */}
    <div className="  gap-5 mt-3 py-2 space-x-2">
       <button onClick={() => setPeriod('weekly')} type="button" className="rounded-full bg-blue-50 text-xs font-medium px-2 py-1 text-blue-900 cursor-pointer">Weekly</button>
       <button onClick={() => setPeriod('monthly')} type="button" className=" rounded-full bg-green-50 text-xs font-medium px-2 py-1 text-green-700 cursor-pointer">Monthly</button>
       <button onClick={() => setPeriod('Quarter')} type="button" className=" rounded-full bg-yellow-50 text-xs font-medium px-2 py-1 text-yellow-700 cursor-pointer">Quarter</button>
       <button onClick={() => setPeriod('Yearly')} type="button" className=" rounded-full bg-yellow-50 text-xs font-medium px-2 py-1 text-yellow-700 cursor-pointer">Yearly</button>
    </div>
  </div>
  )
 };
export default StatsCard;