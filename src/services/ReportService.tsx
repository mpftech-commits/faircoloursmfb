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

//  const handleDownload = async (publicId: string) => {
//      try {
//        const res = await api.get(`/reports/${publicId}/cashier-report`, {
//          responseType: "arraybuffer",
//        });

//        // Validate content-type is actually PDF
//        const contentType = res.headers["content-type"];
//        if (!contentType || !contentType.includes("application/pdf")) {
//          console.error("Invalid content-type:", contentType);
//          alert("Failed to download PDF. Server returned an invalid response.");
//          return;
//        }

//        const blob = new Blob([res.data], { type: "application/pdf" });
//        const url = window.URL.createObjectURL(blob);

//        const link = document.createElement("a");
//        link.href = url;
//        link.download = `cashier-report-${publicId}.pdf`;

//        document.body.appendChild(link);
//        link.click();

//        link.remove();
//        window.URL.revokeObjectURL(url);
//      } catch (error: any) {
//        console.error("Download error:", error);
//        // Check if there's error response data
//        if (error.response?.data) {
//          // Might be JSON error message
//          const text = new TextDecoder().decode(error.response.data);
//          console.error("Error response:", text);
//        }
//        alert("Failed to download PDF. Please try again.");
//      }
//    };
