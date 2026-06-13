import { Upload } from "lucide-react";
import { type ChangeEvent, type  DragEvent, useCallback, useMemo, useState } from "react";
import * as XLSX from "xlsx";

type ExcelUploadProps = {
  onFileParsed?: (
    rows: Array<Record<string, unknown>>,
    sheetName: string,
    fileName: string,
  ) => void;
};

const ExcelUpload = ({ onFileParsed }: ExcelUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [sheetName, setSheetName] = useState<string | null>(null);
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const processFile = useCallback(
    (file: File | undefined) => {
      if (!file) {
        return;
      }

      const extension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = ["xlsx", "xls", "csv"];

      if (!extension || !allowedExtensions.includes(extension)) {
        setError("Please upload a valid Excel or CSV file (.xlsx, .xls, .csv)." );
        setFileName(null);
        setSheetName(null);
        setRows([]);
        return;
      }

      setIsParsing(true);
      setError(null);

      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const result = event.target?.result;

          if (!result) {
            throw new Error("The selected file could not be read.");
          }

          const workbook =
            extension === "csv"
              ? XLSX.read(result as string, { type: "string" })
              : XLSX.read(result as ArrayBuffer, { type: "array" });

          const firstSheetName = workbook.SheetNames[0];
          const firstSheet = workbook.Sheets[firstSheetName];
          const parsedRows = XLSX.utils.sheet_to_json(firstSheet, {
            defval: "",
          }) as Array<Record<string, unknown>>;

          setFileName(file.name);
          setSheetName(firstSheetName);
          setRows(parsedRows);
          onFileParsed?.(parsedRows, firstSheetName, file.name);
        } catch (uploadError) {
          const message =
            uploadError instanceof Error
              ? uploadError.message
              : "The file could not be processed.";
          setError(message);
          setFileName(null);
          setSheetName(null);
          setRows([]);
        } finally {
          setIsParsing(false);
        }
      };

      if (extension === "csv") {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    },
    [onFileParsed],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    processFile(selectedFile);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files?.[0];
    processFile(droppedFile);
  };

  const previewRows = useMemo(() => rows.slice(0, 5), [rows]);

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: "1.5rem" }}>
      <div
        style={{
          border: isDragging ? "2px dashed #2563eb" : "2px dashed #cbd5e1",
          borderRadius: 16,
          padding: "2rem",
          background: isDragging ? "#eff6ff" : "#f8fafc",
          textAlign: "center",
          transition: "all 0.2s ease",
        }}
      >
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          style={{ display: "block", cursor: "pointer" }}
        >
          <input type="file" accept=".xlsx,.xls,.csv" onChange={handleInputChange} style={{ display: "none" }} />
          <p style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Upload an Excel file
          </p>
          <p style={{ color: "#64748b", marginBottom: "0.75rem" }}>
            Drag and drop your file here or click to browse
          </p>
          <span className="flex bg-blue-700 items-center justify-center text-white w-fit gap-1 m-auto p-1 rounded-md">
           <Upload size={12}/> Choose file
          </span>
        </label>
      </div>

      {isParsing && <p style={{ marginTop: "1rem", color: "#2563eb" }}>Processing your file...</p>}

      {error && (
        <p style={{ marginTop: "1rem", color: "#dc2626", fontWeight: 600 }}>
          {error}
        </p>
      )}

      {fileName && !error && (
        <div style={{ marginTop: "1rem", padding: "1rem", background: "#f0fdf4", borderRadius: 12 }}>
          <p style={{ margin: 0, fontWeight: 700 }}>File loaded: {fileName}</p>
          <p style={{ margin: "0.25rem 0 0", color: "#166534" }}>
            Sheet: {sheetName} • {rows.length} row(s) detected
          </p>
        </div>
      )}

      {previewRows.length > 0 && (
        <div style={{ marginTop: "1rem", overflowX: "auto" }}>
          <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Preview</p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <tbody>
              {previewRows.map((row, index) => (
                <tr key={`${index}-${Object.keys(row).join("-")}`}>
                  {Object.entries(row).map(([key, value]) => (
                    <td key={`${index}-${key}`} style={{ border: "1px solid #e2e8f0", padding: "0.45rem" }}>
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
