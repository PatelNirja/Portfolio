import React, { useState } from "react";
import { uploadApi } from "../../api/uploadApi";
import Spinner from "../common/Spinner";
import { FileText, UploadCloud, CheckCircle, Trash2 } from "lucide-react";

export default function FileUploader({ value, onChange, label = "Upload PDF Resume" }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadApi.uploadResume(formData);
      if (response.success && response.data?.url) {
        onChange(response.data.url);
      }
    } catch (err) {
      setError(err.message || "Failed to upload PDF file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          {label}
        </label>
      )}

      {value ? (
        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-xs font-bold">Resume Uploaded</p>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] underline opacity-90 hover:opacity-100"
              >
                View PDF document
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-500 bg-slate-50/50 dark:bg-slate-900/40 cursor-pointer transition-all">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-sky-500" />
              <span className="text-xs font-medium text-slate-500">Uploading PDF...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <UploadCloud className="w-7 h-7 text-sky-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Click to upload PDF resume
              </span>
              <span className="text-[10px] text-slate-400">Max size: 10MB</span>
            </div>
          )}
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      )}

      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}
