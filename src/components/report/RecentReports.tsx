import { ChevronLeftSquareIcon, File, Download } from "lucide-react";
import Button from "../ui/button/Button";

export default function RecentReports() {
  return (
    <div className="border border-gray-300 bg-white   p-5 rounded-xl" >
        <div className="flex justify-between">
            <div>
                <h3 className="font-bold ">Recent Reports</h3>
            </div>

            <div className="flex gap-2">
               <span className="text-sm text-gray-500">View All</span>
               <ChevronLeftSquareIcon size={18} className="-rotate-90" />
           </div>
        </div>
         
        <div className="mb-5 sm:mb-3 p-4 rounded-lg mt-2 flex justify-between gap-2 border border-gray-300 ">
           <div>
              <div className="flex gap-2">
                   <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-blue-50 text-blue-600 ">
                     <File  size={18}/>
                   </div>
               
                   <div className="flex flex-col gap-y-3">
                      <div>
                          <h4 className="font-medium text-sm ">Monthly Fraud Detection - January 2026</h4>
                          <span className="text-xs ">PDF . 2.4MB . Feb 1, 2026</span>
                      </div>
                   </div>
               </div>
            </div>

           <div>
               <Button size="sm" className="bg-blue-500 text-white">
                  <Download size={18} />
                    Download
               </Button>
           </div>
       </div>

        <div className="mb-5 sm:mb-3 p-4 rounded-lg mt-2 flex justify-between gap-2 border border-gray-300 ">
           <div>
              <div className="flex gap-2">
                   <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-brand-50 text-blue-600 ">
                     <File className="text-blue-500 " size={18}/>
                   </div>
               
                   <div className="flex flex-col gap-y-3">
                      <div>
                          <h4 className="font-medium text-sm ">QA 2025 Risk Analysis</h4>
                          <span className="text-xs text-gray-500 ">Excel . 5.8MB . Jan 1, 2026</span>
                      </div>
                   </div>
               </div>
            </div>

           <div>
               <Button size="sm" className="bg-blue-500 text-white">
                  <Download size={18}/>
                    Download
               </Button>
           </div>
       </div>

        <div className="mb-5 sm:mb-3 p-4 rounded-lg mt-2 flex justify-between gap-2 border border-gray-300 ">
           <div>
              <div className="flex gap-2">
                   <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-blue-50 text-blue-600 ">
                     <File size={18} />
                   </div>
               
                   <div className="flex flex-col gap-y-3">
                      <div>
                          <h4 className="font-medium text-sm d">High-Risk Accounts Investigation</h4>
                          <span className="text-xs text-gray-500 ">PDF . 1.2MB . Jan 10, 2026</span>
                      </div>
                   </div>
               </div>
            </div>

           <div>
               <Button size="sm" className="bg-blue-500 text-white">
                  <Download size={18}/>
                    Download
               </Button>
           </div>
       </div>

        <div className="mb-5 sm:mb-3 p-4 rounded-lg mt-2 flex justify-between gap-2 border border-gray-300">
           <div>
              <div className="flex gap-2">
                   <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-blue-50 text-blue-600 ">
                     <File size={18} />
                   </div>
               
                   <div className="flex flex-col gap-y-3">
                      <div>
                          <h4 className="font-medium text-sm ">Employee Payroll Audit - Decemember</h4>
                          <span className="text-xs text-gray-500 ">Excel . 4.1MB . Jan 5, 2026</span>
                      </div>
                   </div>
               </div>
            </div>

           <div>
               <Button size="sm" className="bg-blue-500 text-white">
                  <Download size={18}/>
                    Download
               </Button>
           </div>
       </div>
  </div>
 );
}
