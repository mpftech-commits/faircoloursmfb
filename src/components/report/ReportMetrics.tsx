import { AlertCircle, Download, File } from "lucide-react";
import { useState } from "react";
// import AlertHexaIcon from "../../icons/index.ts";
//  import DownloadIcon from "../../icons/index.ts"
//  import  FileIcon from "../../icons/index.ts"

export default function ReportMetrics() {
  const [alert, setAlert] = useState({
    critical: 24,
    duplicate: 0,
    patterns: 0,
    records: 0,
  })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 mt-2">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
        <div className="flex items-center justify-between">
          <div>
             <span className="text-sm text-gray-900 ">Reports This Month</span>
          </div>
          <span className="bg-blue-100 p-2 rounded-lg">
            <File size={18} className="text-blue-900"/>
          </span>
          
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
              {alert.critical}
            </h4>
            
          </div>
          {alert.critical > 0 ? 
          <span className="flex text-green-500 gap-1 pt-1 text-sm">
            +{alert.critical} from last month
          </span> :
          <span className="flex text-gray-900 gap-1 pt-1 text-sm">
            No change
          </span> }
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-xl border border-gray-300 bg-white p-4   md:p-5">
        <div className="flex items-center justify-between">
          <div>
             <span className="text-sm text-gray-900">Cases Documented</span>
          </div>
          <span className="bg-red-100 p-2 rounded-lg">
              <AlertCircle className="text-red-800 size-5 dark:text-red-800" />
         </span>
      </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-900 text-title-sm ">
              156
            </h4>
          </div>
          <span className="flex text-green-500 gap-1 pt-1 text-sm">
            +12 from last month
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-xl border border-gray-300 bg-white p-4   md:p-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-900">Total Downloads</span>
          </div>
          <span className="bg-green-100 rounded-lg p-2">
            <Download className="text-green-500 size-6 dark:text-green-500" /> 
          </span>
          
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm ">
              89
            </h4>
          </div>
          <span className="flex text-gray-900  gap-1 pt-1 text-sm">
            last 30 days
          </span>
          
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-xl border border-gray-200 bg-white p-4  md:p-5">
        <div className="flex items-center justify-between">
          <div>
             <span className="text-sm text-gray-900">Avg. Report Size</span>
          </div>
          <span className="bg-purple-100 rounded-lg p-2">
            <File className="text-purple-800 size-6 dark:text-purple-800" />
          </span>
          
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm ">
              3.2MB
            </h4>
            <span className="text-sm text-gray-900 ">
              Across all formats
            </span>
          </div>
          
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

    </div>
  );
}

