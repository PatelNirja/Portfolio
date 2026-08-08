import React, { useState } from "react";
import { uploadApi } from "../../api/uploadApi";
import Spinner from "../common/Spinner";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

export default function ImageUploader({ value, onChange, label = "Upload Image" }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadApi.uploadImage(formData);
      if (response.success && response.data?.url) {
        onChange(response.data.url, response.data.publicId);
      }
    } catch (err) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("", "");
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors shadow-lg"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 bg-slate-50/50 dark:bg-slate-900/40 cursor-pointer transition-all">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-sky-500" />
              <span className="text-xs font-medium text-slate-500">Uploading to Cloudinary...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <UploadCloud className="w-8 h-8 text-sky-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Click to upload image (JPEG, PNG, WebP)
              </span>
              <span className="text-[10px] text-slate-400">Max size: 5MB</span>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
        </label>
      )}

      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}
