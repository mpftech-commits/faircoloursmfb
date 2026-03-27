import { useState } from "react";
import { Link } from "react-router";
import FormTab from "../common/FormTab";
import RadioSm from "../form/input/RadioSm";
import Button from "../ui/button/Button";

import Input from "../form/input/InputField";
import { CalendarDays, Download } from "lucide-react";
import GenerateReports from "../../pages/ReportPage/GenerateReportsPage";
import ReportPage from "../../pages/ReportPage/ReportPage";

export default function ReportBuilder() {
  const [selected, setSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="border border-gray-300 bg-white p-5 rounded-xl" >
        <div>
            <h3 className="font-bold ">Custom Report Builder</h3>
        </div>

        <div className="space-y-4">
           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="sm:col-span-1">
                    <label className="text-gray-800">
                        Report Type
                    </label>
                    <select name="Rbdr" id="rept-bdr" className="w-full px-2 py-3 border text-brand-800  border-gray-300 text-sm rounded-lg focus:outline-none focus:bg-gray-50 focus:text-black">
                        <option value="fraud detection summary" className="border-gray-300">Fraud Detection Summary</option>
                        <option value="internal audit" className="border-gray-300">Risk Analysis Report</option>
                        <option value="finance" className="border-gray-300 ">Employee Audit Report</option>
                        <option value="compliance" className="border-gray-300 ">Financial Impact Report</option>
                        <option value="others" className="border-gray-300 ">Others</option>
                    </select>
                </div> 

                <div className="sm:col-span-1">
                    <label className="text-gray-800 ">
                        Time Period
                    </label>
                    <FormTab />
                </div>                  
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="sm:col-span-1">
                    <label className="text-gray-800">
                        Start Date
                    </label>

                    <div className="relative w-full max-w-md">
                        <CalendarDays  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                        <Input type="date" className="w-full pl-10 pr-4 py-2 " />
                    </div>
                </div> 

                <div className="sm:col-span-1">
                    <label className="text-gray-800">
                        End Date
                    </label>

                    <div className="relative w-full max-w-md">
                        <CalendarDays  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
                        <Input type="date" className="w-full pl-10 pr-4 py-2 " />
                    </div>

                </div>                  
            </div>

            <div>
              <h3 className="text-gray-900 text-sm">Export Format</h3>
              <div className="flex gap-3 ">
                  <RadioSm id="pdf" name="export-format" value="pdf" label="PDF" checked={selected === "pdf"} onChange ={setSelected} />
                  <RadioSm id="excel" name="export-format" value="excel" label="Excel" checked={selected === "excel"} onChange ={setSelected} />
                  <RadioSm id="csv" name="export-format" value="csv" label="CSV" checked={selected === "csv"} onChange ={setSelected} />
              </div>
           </div>

           <div className="flex gap-4">
               <div>
                  
                       <Link to="/404">
                           <Button onClick={openModal} size="sm"  className="bg-blue-500 cursor-pointer text-white">
                               <Download className="size-5 " />
                               Generate Report
                           </Button>
                       </Link>
                          
                       
                       {/* {isModalOpen && (
                         <GenerateReports />
                       )}  */}
                   
               </div>
             
           </div>
       </div>
    </div>     
   );
}
