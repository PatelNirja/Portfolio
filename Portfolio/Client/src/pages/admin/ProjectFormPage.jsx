import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ImageUploader from "../../components/admin/ImageUploader";
import Toast from "../../components/common/Toast";
import SEO from "../../components/common/SEO";
import { projectsApi } from "../../api/projectsApi";
import { Save, ArrowLeft } from "lucide-react";

export default function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { register, handleSubmit, reset, setValue } = useForm();
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(isEditMode);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  useEffect(() => {
    if (isEditMode) {
      const loadProject = async () => {
        try {
          const res = await projectsApi.getProjectByIdAdmin(id);
          if (res.success && res.data?.project) {
            const p = res.data.project;
            reset({
              title: p.title,
              shortDesc: p.shortDesc,
              description: p.description,
              category: p.category,
              techStack: p.techStack?.join(", "),
              tags: p.tags?.join(", "),
              liveUrl: p.liveUrl,
              githubUrl: p.githubUrl,
              isFeatured: p.isFeatured,
            });
            setThumbnail(p.thumbnail || "");
          }
        } catch (err) {
          setToast({ isVisible: true, message: err.message, type: "error" });
        } finally {
          setLoading(false);
        }
      };
      loadProject();
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        shortDesc: data.shortDesc,
        description: data.description,
        category: data.category || "web",
        thumbnail,
        techStack: data.techStack ? data.techStack.split(",").map((s) => s.trim()) : [],
        tags: data.tags ? data.tags.split(",").map((s) => s.trim()) : [],
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        isFeatured: Boolean(data.isFeatured),
      };

      if (isEditMode) {
        await projectsApi.updateProject(id, payload);
      } else {
        await projectsApi.createProject(payload);
      }

      navigate("/admin/projects");
    } catch (err) {
      setToast({ isVisible: true, message: err.message || "Failed to save project", type: "error" });
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit Project" : "Create Project"}>
      <SEO title={isEditMode ? "Edit Project" : "Create Project"} />
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate("/admin/projects")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects List</span>
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <Input label="Project Title" {...register("title", { required: "Title is required" })} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="web">Web Application</option>
                <option value="mobile">Mobile Application</option>
                <option value="ai">AI / Machine Learning</option>
                <option value="other">Other Project</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isFeatured"
                {...register("isFeatured")}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 dark:border-slate-700"
              />
              <label htmlFor="isFeatured" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Feature on Homepage
              </label>
            </div>
          </div>

          <Input label="Short Description" {...register("shortDesc")} placeholder="Brief overview for project card..." />

          <Input label="Detailed Description (Markdown)" isTextArea rows={6} {...register("description")} />

          <ImageUploader label="Thumbnail Image" value={thumbnail} onChange={(url) => setThumbnail(url)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Technologies (comma separated)" placeholder="React, Node.js, MongoDB" {...register("techStack")} />
            <Input label="Tags (comma separated)" placeholder="Fullstack, Cloudinary, JWT" {...register("tags")} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Live Demo URL" placeholder="https://..." {...register("liveUrl")} />
            <Input label="GitHub Repository URL" placeholder="https://github.com/..." {...register("githubUrl")} />
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button type="submit" icon={Save} className="px-6">
              {isEditMode ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </div>

      <Toast
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, isVisible: false }))}
      />
    </AdminLayout>
  );
}
