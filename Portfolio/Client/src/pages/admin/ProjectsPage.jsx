import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import SEO from "../../components/common/SEO";
import { projectsApi } from "../../api/projectsApi";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsApi.getProjects({ all: true });
      if (res.success) {
        setProjects(res.data.projects || []);
      }
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await projectsApi.deleteProject(deleteTarget._id);
      setToast({ isVisible: true, message: "Project deleted successfully", type: "success" });
      setDeleteTarget(null);
      fetchProjects();
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const columns = [
    {
      header: "Title",
      accessor: "title",
      cell: (row) => (
        <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
          {row.thumbnail && (
            <img src={row.thumbnail} alt="" className="w-10 h-10 object-cover rounded-lg bg-slate-800" />
          )}
          <span>{row.title}</span>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      cell: (row) => <span className="uppercase text-[10px] font-extrabold tracking-wider text-sky-500">{row.category}</span>,
    },
    {
      header: "Featured",
      accessor: "isFeatured",
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${row.isFeatured ? "bg-amber-500/10 text-amber-500" : "text-slate-400"}`}>
          {row.isFeatured ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout title="Projects Management">
      <SEO title="Manage Projects" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Create, update, and manage portfolio projects</p>
          <Link to="/admin/projects/new">
            <Button icon={Plus} size="sm">
              Add New Project
            </Button>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={projects}
          isLoading={loading}
          onEdit={(row) => (window.location.href = `/admin/projects/edit/${row._id}`)}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
      />

      <Toast
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, isVisible: false }))}
      />
    </AdminLayout>
  );
}
