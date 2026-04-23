import axios from "axios";
import api from "./Axios";

export type ReportFilter = "weekly" | "monthly" | "quarterly" | "yearly";


export const fetchReport = async (filter: ReportFilter) => {
  const res = await api.get(`/reports/cashier-report?filter=${filter}`);
  console.log("Report data:", res);
  // return res.data;
};

export const downloadReportPDF = async (filter: ReportFilter) => {
  const res = await api.get(
    `/reports/cashier-report?filter=${filter}`,
    {
      responseType: "arraybuffer", 
    }
  );
  console.log(res.headers["content-type"]);
  console.log(res.data.byteLength);

  const blob = new Blob([res.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `cashier-report-${filter}.pdf`;

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};
