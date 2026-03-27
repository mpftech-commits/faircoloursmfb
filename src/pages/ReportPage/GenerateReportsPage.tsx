// import PageMeta from "../../components/common/PageMeta";
import ReportBuilder from "../../components/report/ReportBuilder";
import ReportMetrics from "../../components/report/ReportMetrics";
import Reports from "../../components/report/Reports";
import ReportTemplates from "../../components/report/ReportTemplates";
import { useState, useEffect } from "react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
// import { Link } from "react-router";
import RecentReports from "../../components/report/RecentReports";
import {File, CalendarDays, CheckCircle, Download} from "lucide-react"




export default function GenerateReports() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  } }, [isOpen]);
  

  return (
    <>
     
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-12 xl:col-span-12">
         <Reports />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-12">
          <ReportMetrics />
       </div>

       <div className="col-span-12">
          <ReportTemplates />
       </div>

       <div className="col-span-12">
          <ReportBuilder />
        </div>

        <div className="col-span-12">
          <RecentReports />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100000] p-4">
          <div className="bg-white shadow-xl rounded-lg flex-1 w-full max-w-xl max-h-[90vh] overflow-y-auto p-8">
            <div className="bg-blue-light-25 mb-5 sm:mb-3 p-4 rounded-lg flex gap-3 border border-blue-light-50">
              <div className="flex">
                <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-blue-100 text-blue-600">
                  <File size={18} />
                </div>
              </div>

              <div className="flex flex-col gap-y-3">
                <div>
                  <h4 className="font-semibold text-sm ">Generate Audit Report</h4>
                  <span className="text-xs text-gray-500 ">Configure your report settings</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-2">
              <label className="text-brand-800 ">
                Report Type
              </label>

              <div className="flex justify-between flex-col gap-3 md:flex-row">
                <div>
                  <Button size="sm" className="w-full text-sm px-8 text-blue-600 border-2 rounded-lg bg-blue-50 border-blue-500">Comprehensive</Button>
                </div>
                <div>
                  <Button size="sm" className="w-full text-sm px-10 text-gray-800 border-2 rounded-lg  border-gray-200">Summary</Button>
                </div>
                <div>
                  <Button size="sm" className="w-full text-sm px-10 text-gray-800 border-2 rounded-lg  border-gray-200">Detailed</Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-2">
              <div className="relative w-full max-w-md">
                <CalendarDays size={18}   />
                <label className="pl-7">Date Range</label>
              </div>
            </div>

            <div className="space-y-4 p-2 -mt-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="text-gray-400 pl-1 text-xs ">
                   from
                  </label>
                  <div className="relative w-full max-w-md">
                    <Input type="date"/>
                    {/* <CalendarDays size={18}/>  */}
                  </div>
                </div> 

                <div className="">
                  <label className="text-gray-400  text-xs ">
                    To
                  </label>

                  <div className="relative w-full max-w-md">
                    <Input type="date"/>
                   {/* <CalendarDays size={18}/>  */}
                  </div>
                </div>     
              </div> 
            </div>

            <div className="space-y-4 p-2">
              <div className=" flex items-center gap-3">
               <CalendarDays size={18}/> 
                <label >Filter By Risk Level</label>
              </div>
           </div>

           <div className="space-y-4 p-2 -mt-3">
              <select className="w-full px-2 py-3 border   border-gray-300  text-sm rounded-lg focus:outline-none focus:bg-gray-900 focus:text-white" name="riskLevel" id="riskLevel">
                <option value="">High and Above</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="space-y-4 p-2">
              <label className="text-brand-800 ">
                Include Sections
              </label>

              <div className="bg-blue-light-25 mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-gray-300">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-9 h-9 p-1 bg-blue-100 text-blue-600 ">
                    <CheckCircle size={18} />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm ">Executive Summary</h4>
                    <span className="text-xs text-gray-500 ">Overview of key findings and risk scores</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-light-25 mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-gray-300">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-9 h-9 p-1 bg-blue-100 text-blue-600 ">
                    <CheckCircle size={18} />
                  </div>
               </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm dark:text-gray-400">Flagged Cases</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Detailed list of all high-risk accounts</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-light-25 mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-gray-300">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-9 h-9 p-1 bg-blue-100 text-blue-600 ">
                   <CheckCircle size={18} />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm ">Analytics & Charts</h4>
                    <span className="text-xs text-gray-500 ">Visual representation of trends and patterns</span>
                  </div>
                </div>
              </div>

              <div className=" mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-gray-200 bg-white">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-9 h-9 p-1 bg-blue-100 text-blue-600 ">
                    <CheckCircle size={18} />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  
                  <div>
                    <h4 className="font-medium text-sm d">Employee Records</h4>
                    <span className="text-xs text-gray-500 ">Complete employee database with risk indicators</span>
                  </div>
                 </div>
              </div>

              <div className="bg-blue-light-25 mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-gray-300">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-9 h-9 p-1 bg-blue-100 text-blue-600 ">
                    <CheckCircle size={18} />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm ">AI Recommendations</h4>
                    <span className="text-xs text-gray-500 ">Suggested actions and next steps</span>
                  </div>
                </div>
              </div>

              <div className="bg-white mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-gray-200">
               <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-9 h-9 p-1 bg-blue-100 text-blue-600 ">
                    <CheckCircle size={18} />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Activity Timeline</h4>
                    <span className="text-xs text-gray-500 ">Chronological log of detection and resolution</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-2">
                <label className="text-brand-800 ">
                  Export Format
                </label>

                <div className="flex justify-between flex-col gap-3 md:flex-row">
                  <div>
                    <Button size="sm" className="w-full text-xs px-8 text-blue-600 border-2 rounded-lg bg-blue-50 border-blue-500">PDF Document</Button>
                  </div>

                  <div>
                   <Button size="sm" className="w-full text-xs px-10 text-gray-800 border-2 rounded-lg  border-gray-200">Excel File</Button>
                  </div>

                  <div>
                   <Button size="sm" className="w-full text-xs px-10 text-gray-800 border-2 rounded-lg  border-gray-200">CSV Data</Button>
                  </div>
                </div>
              </div>

              <div  className="space-y-4 flex gap-3 justify-end">
                <div>
                  <Button onClick={() => setIsOpen(false)} size="sm" className="border-gray-200 border text-sm bg-white text-gray-800">Cancel</Button>
                </div>
                <div>
                  
                    <Button size="sm" className="border-gray-200 border text-sm bg-blue-600 text-white">
                      <Download size={18}/>
                        Generate Report
                    </Button>
                 
                </div>

              </div>
            </div>


            {/* <Link  to="/signin" className="text-sm ">
             <button 
               onClick={() => setIsOpen(false)}
               className="flex items-center justify-center bg-brand-500 w-full text-white px-4 py-3 rounded-lg" >
                Okay
             </button>
           </Link> */}
         </div>
        </div>
      )}
    </> 
  );
}
