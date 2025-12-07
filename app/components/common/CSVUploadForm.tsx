"use client";

import { useState, useRef } from "react";
import { Button, Upload, Table, App, Progress } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";

interface CSVUploadFormProps<T> {
  templatePath: string;
  templateFileName: string;
  csvPreviewData: any[];
  setCsvPreviewData: (data: any[]) => void;
  uploadFileList: UploadFile[];
  setUploadFileList: (files: UploadFile[]) => void;
  submitting: boolean;
  setSubmitting: (value: boolean) => void;
  mapCSVToAPI: (csvRow: any) => T | null;
  createItem: (data: T) => Promise<any>;
  itemName: string;
  itemNamePlural: string;
  onSuccess: () => void;
  templateColumns?: Array<{ title: string; dataIndex: string; key: string; width?: number; ellipsis?: boolean }>;
}

export default function CSVUploadForm<T>({
  templatePath,
  templateFileName,
  csvPreviewData,
  setCsvPreviewData,
  uploadFileList,
  setUploadFileList,
  submitting,
  setSubmitting,
  mapCSVToAPI,
  createItem,
  itemName,
  itemNamePlural,
  onSuccess,
  templateColumns,
}: CSVUploadFormProps<T>) {
  const { message } = App.useApp();
  const [uploadProgress, setUploadProgress] = useState(0);
  const processedFileRef = useRef<string | null>(null);

  const handleDownloadTemplate = () => {
    if (submitting) {
      message.warning("Vui lòng đợi upload xong!");
      return;
    }
    const link = document.createElement("a");
    link.href = templatePath;
    link.download = templateFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Đã tải template!");
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split(/\r?\n/).filter((line) => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim());
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values: string[] = [];
      let currentValue = "";
      let inQuotes = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = "";
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());

      if (values.length === headers.length) {
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });
        data.push(row);
      }
    }

    return data;
  };

  const handleFileChange = (info: any) => {
    if (submitting) {
      message.warning("Vui lòng đợi upload xong!");
      return;
    }

    setUploadFileList(info.fileList);

    if (info.fileList.length === 0) {
      setCsvPreviewData([]);
      processedFileRef.current = null;
      return;
    }

    const file = info.file.originFileObj || info.file;
    if (!file) return;

    // Create unique file identifier
    const fileId = `${file.name}-${file.size}-${file.lastModified}`;

    // Skip if this file was already processed
    if (processedFileRef.current === fileId) {
      return;
    }

    // Only process new files (not on status changes)
    if (info.file.status && info.file.status !== "removed") {
      return;
    }

    processedFileRef.current = fileId;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = parseCSV(text);

        if (parsed.length === 0) {
          message.warning("File CSV không có dữ liệu hoặc format không đúng!");
          setCsvPreviewData([]);
          processedFileRef.current = null;
          return;
        }

        setCsvPreviewData(parsed);
        message.success(`Đã đọc ${parsed.length} dòng dữ liệu`);
      } catch (error) {
        message.error("Không thể parse file CSV!");
        setCsvPreviewData([]);
        processedFileRef.current = null;
      }
    };

    reader.onerror = () => {
      message.error("Không thể đọc file!");
      setCsvPreviewData([]);
      processedFileRef.current = null;
    };

    reader.readAsText(file, "UTF-8");
  };

  const handleSubmit = async () => {
    if (csvPreviewData.length === 0) {
      message.warning(`Vui lòng upload file CSV trước!`);
      return;
    }

    setSubmitting(true);
    setUploadProgress(0);

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    try {
      for (let i = 0; i < csvPreviewData.length; i++) {
        const row = csvPreviewData[i];
        const apiData = mapCSVToAPI(row);

        if (!apiData) {
          results.failed++;
          results.errors.push(`Dòng ${i + 1}: Thiếu thông tin bắt buộc`);
          continue;
        }

        try {
          await createItem(apiData);
          results.success++;
        } catch (error: any) {
          results.failed++;
          results.errors.push(`Dòng ${i + 1}: ${error.message || "Lỗi không xác định"}`);
        }

        // Update progress
        const progress = Math.round(((i + 1) / csvPreviewData.length) * 100);
        setUploadProgress(progress);
      }

      if (results.success > 0) {
        message.success(`Đã tạo thành công ${results.success}/${csvPreviewData.length} ${itemNamePlural}!`);
      }

      if (results.failed > 0) {
        message.warning(`Có ${results.failed} ${itemNamePlural} không thể tạo. Vui lòng kiểm tra lại dữ liệu.`);
      }

      if (results.success === csvPreviewData.length) {
        onSuccess();
      }
    } catch (error: any) {
      message.error(error?.message || `Không thể tạo ${itemNamePlural} từ file`);
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Use template columns if provided, otherwise use dynamic columns from data
  const columns =
    csvPreviewData.length > 0
      ? Object.keys(csvPreviewData[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
          width: 150,
          ellipsis: true,
        }))
      : templateColumns || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          icon={<DownloadOutlined />}
          onClick={handleDownloadTemplate}
          type="default"
          className="bg-blue-500 hover:bg-blue-600 text-white border-0"
        >
          Tải template
        </Button>
      </div>

      <Upload
        accept=".csv"
        fileList={uploadFileList}
        onChange={handleFileChange}
        beforeUpload={() => {
          if (submitting) {
            message.warning("Vui lòng đợi upload xong!");
            return false;
          }
          return false;
        }}
        maxCount={1}
        showUploadList={true}
      >
        <Button
          icon={<UploadOutlined />}
          type="primary"
          className="bg-green-500 hover:bg-green-600 border-0"
          onClick={(e) => {
            if (submitting) {
              e.preventDefault();
              e.stopPropagation();
              message.warning("Vui lòng đợi upload xong!");
            }
          }}
        >
          Upload file
        </Button>
      </Upload>

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Preview dữ liệu</h3>
            <p className="text-sm text-gray-600">
              {csvPreviewData.length > 0 ? `Tổng cộng: ${csvPreviewData.length} ${itemNamePlural}` : "Chưa có dữ liệu"}
            </p>
          </div>
          {csvPreviewData.length > 0 && (
            <Button
              onClick={() => {
                if (submitting) {
                  message.warning("Vui lòng đợi upload xong!");
                  return;
                }
                setCsvPreviewData([]);
                setUploadFileList([]);
                processedFileRef.current = null;
              }}
              danger
              disabled={submitting}
            >
              Xóa preview
            </Button>
          )}
        </div>
        <Table
          columns={columns}
          dataSource={csvPreviewData.map((row, index) => ({
            key: index,
            ...row,
          }))}
          pagination={
            csvPreviewData.length > 10
              ? {
                  pageSize: 10,
                  showSizeChanger: false,
                  showTotal: (total) => `Tổng ${total} dòng`,
                }
              : false
          }
          size="small"
          className="csv-preview-table"
        />
      </div>

      {submitting && (
        <div className="pt-4">
          <Progress percent={uploadProgress} status="active" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            Đang tạo {itemNamePlural}... {uploadProgress}%
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button
          onClick={() => {
            setCsvPreviewData([]);
            setUploadFileList([]);
            processedFileRef.current = null;
          }}
          disabled={csvPreviewData.length === 0 || submitting}
        >
          Hủy
        </Button>
        <Button type="primary" onClick={handleSubmit} loading={submitting} disabled={csvPreviewData.length === 0}>
          Submit ({csvPreviewData.length} {itemNamePlural})
        </Button>
      </div>
    </div>
  );
}

