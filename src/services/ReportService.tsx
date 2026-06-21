import api from "./Axios";

export type ReportFilter = "weekly" | "monthly" | "quarterly" | "yearly";

export const fetchReport = async (filter: ReportFilter) => {
  const res = await api.get(`/reports/cashier-report?filter=${filter}`);
  console.log("Report data:", res);
  // return res.data;
};

const downloadPdfFromResponse = (data: ArrayBuffer, filename: string) => {
  const blob = new Blob([data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadReportPDF = async (filter: ReportFilter) => {
  const res = await api.get(`/reports/cashier-report?filter=${filter}`, {
    responseType: "arraybuffer",
  });
  downloadPdfFromResponse(res.data, `cashier-report-${filter}.pdf`);
};

export const downloadCashierReportPDF = async (
  cashierId: string,
  filter?: ReportFilter,
) => {
  const params = new URLSearchParams();
  params.append("cashierId", cashierId);
  if (filter) {
    params.append("filter", filter);
  }

  const res = await api.get(`/reports/cashier-report?${params.toString()}`, {
    responseType: "arraybuffer",
  });

  const filename = filter
    ? `cashier-report-${cashierId}-${filter}.pdf`
    : `cashier-report-${cashierId}.pdf`;

  downloadPdfFromResponse(res.data, filename);
};