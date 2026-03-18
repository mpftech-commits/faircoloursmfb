import { ChevronRight } from "lucide-react";

interface Props {
  icon: any;
  label: string;
  className: string
}

export default function ActionItem({ icon: Icon, label, className }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex   justify-between items-center cursor-pointer hover:bg-gray-50">

      
        <div className="flex items-center gap-3">
       
       <div className={`${className}`}>
         <Icon size={18} />
       </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      

      <ChevronRight size={18} className="text-gray-400" />

    </div>
 
  );
}