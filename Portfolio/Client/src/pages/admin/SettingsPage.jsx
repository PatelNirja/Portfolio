import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "../../components/admin/AdminLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import SEO from "../../components/common/SEO";
import { settingsApi } from "../../api/settingsApi";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await settingsApi.getSettings();
        if (res.success && res.data?.settings) {
          const s = res.data.settings;
          reset({
            siteTitle: s.siteTitle,
            siteDescription: s.siteDescription,
            keywords: s.keywords?.join(", "),
            googleAnalyticsId: s.googleAnalyticsId,
          });
        }
      } catch (err) {
        setToast({ isVisible: true, message: err.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        keywords: data.keywords ? data.keywords.split(",").map((k) => k.trim()) : [],
      };
      await settingsApi.updateSettings(payload);
      setToast({ isVisible: true, message: "SEO Settings updated successfully!", type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  return (
    <AdminLayout title="SEO & Analytics Settings">
      <SEO title="Manage SEO Settings" />
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Search Engine Optimization (SEO)
          </h3>

          <Input label="Default Site Title" {...register("siteTitle")} />
          <Input label="Default Meta Description" isTextArea rows={3} {...register("siteDescription")} />
          <Input label="Global Keywords (comma separated)" placeholder="React, Node.js, Portfolio" {...register("keywords")} />
          <Input label="Google Analytics Tracking ID" placeholder="G-XXXXXXXXXX" {...register("googleAnalyticsId")} />

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button type="submit" icon={Save} className="px-6">
              Save Settings
            </Button>
          </div>
        </form>
      </div>

      <Toast isVisible={toast.isVisible} type={toast.type} message={toast.message} onClose={() => setToast((t) => ({ ...t, isVisible: false }))} />
    </AdminLayout>
  );
}
