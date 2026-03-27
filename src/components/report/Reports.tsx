import {File} from "lucide-react"


export default function Reports() {
  return (
    <div className="border flex justify-between border-gray-300 bg-white   p-5 rounded-xl" >
        <div>
            <h3 className="font-bold ">Reports</h3>
            <p className="text-sm text-gray-900 ">Generate and download comprehensive audit reports</p>
        </div>

        <div className="border flex justify-center items-center gap-1 border-gray-300 bg-white  p-2 rounded-xl">
            <div>
                <File />
            </div>
            <span className="text-sm text-gray-900">Create Custom Report</span>

        </div>
    </div>    
   
 );
}
