import { useEffect, useState } from "react";
import ReportFilters from "../components/ReportFilters";
import ReportTable from "../components/ReportTable";
import {
  fetchReport,
  downloadReportPDF,
  type ReportFilter,
} from "../services/ReportService";

export default function ReportsPage() {
  const [filter, setFilter] = useState<ReportFilter>("weekly");
  const [data] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const loadReport = async () => {
    try {
      setLoading(true);
      setError("");

       await fetchReport(filter);

      // adjust based on your API response
      // console.log("Fetched report data:", res);
      // setData(res?.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadReportPDF(filter);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [filter]);

  return (
    <div className="p-3 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xs font-bold text-blue-700">Cashier Reports</h1>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-[10px] hover:opacity-90 disabled:opacity-50"
        >
         
          {downloading ? "Downloading..." : "Download PDF"}
        </button>
      </div>

      {/* Filters */}
      <ReportFilters selected={filter} onChange={setFilter} />

      {/* Content */}
      <div className="bg-white rounded-xl text-[10px] p-4 shadow-sm">
        {loading ? (
          <p className="text-gray-500">Loading report...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ReportTable data={data} />
        )}
      </div>
    </div>
  );
}
