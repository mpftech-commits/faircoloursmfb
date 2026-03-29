import Button from "../ui/button/Button";
import {AlertTriangle, Bolt, DollarSign, Users2} from "lucide-react"


export default function ReportTemplates() {
  return (
    <div className="border border-gray-200 bg-white p-5 rounded-xl" >
        <div>
            <h3 className="font-bold text-black">Report Templates</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-6 mt-4">
           {/* <!-- Template Item Start --> */}
            <div className="flex gap-3 rounded-lg border border-gray-300 bg-white p-4  md:p-5">
               <div className="flex">
                    <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-red-100 text-red-600  ">
                      <AlertTriangle className="text-red-600 size-5 " />
                    </div>
                </div>

               <div className="flex flex-col gap-y-3">
                    <div>
                        <h4 className="font-semibold ">Fraud Detection Summary</h4>
                        <span className="text-sm text-gray-800 ">Comprehensive overview of all detected fraud cases</span>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs  mt-1">Last: Yesterday, 3:42 PM</p>
                        </div>
                        <div>
                            <Button size="sm" className="bg-brand-500 -mt-2 bg-blue-500 text-white px-3 py-2 font-semibold cursor-pointer">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!-- Template Item End --> */}

           {/* <!-- Template Item Start --> */}

            <div className="flex gap-3 rounded-lg border border-gray-300 bg-white p-4 md:p-5">
               <div className="flex">
                    <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-red-100 text-red-600  ">
                      <Bolt className="text-warning-600 size-5 dark:text-warning-600" />
                    </div>
                </div>

               <div className="flex flex-col gap-y-3">
                    <div>
                        <h4 className="font-semibold ">Risk Analysis Report</h4>
                        <span className="text-sm ">Detailed overview of all risk assessment and trends </span>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 mt-1">Last: February 1, 2026</p>
                        </div>
                        <div>
                            <Button size="sm" className="bg-brand-500 -mt-2 bg-blue-500 text-white px-3 py-2 font-semibold cursor-pointer">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!-- Template Item End --> */}


           {/* <!-- Template Item Start --> */}
             
             <div className="flex gap-3 rounded-lg border border-gray-300 bg-white p-4 md:p-5">
               <div className="flex">
                    <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-blue-50 text-blue-600 ">
                      <Users2 className="text-brand-600 size-5 dark:text-brand-600" />
                    </div>
                </div>

               <div className="flex flex-col gap-y-3">
                    <div>
                        <h4 className="font-semibold ">Employee Audit Report</h4>
                        <span className="text-sm ">Complete detailed employee records and flag analysis</span>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 ">Last: January 30, 2026</p>
                        </div>
                        <div>
                            <Button size="sm" className="bg-brand-500 -mt-2 bg-blue-500 text-white px-3 py-2 font-semibold cursor-pointer">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!-- Template Item End --> */}

               
           {/* <!-- Template Item Start --> */}

             <div className="flex gap-3 rounded-lg border border-gray-300 bg-white p-4 md:p-5">
               <div className="flex">
                    <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-green-100 text-green-600 ">
                      <DollarSign className="text-success-600 size-5 dark:text-success-600" />
                    </div>
                </div>

               <div className="flex flex-col gap-y-3">
                    <div>
                        <h4 className="font-semibold ">Financial Impact Report</h4>
                        <span className="text-sm text-gray-800 ">All of the estimated financial losses and recoveries</span>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500  mt-1">Last: January 28, 2026</p>
                        </div>
                        <div>
                            <Button size="sm" className="bg-brand-500 -mt-2 bg-blue-500 text-white px-3 py-2 font-semibold cursor-pointer">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!-- Template Item End --> */}
        </div>
   </div>
    );
}
