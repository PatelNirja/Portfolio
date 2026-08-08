import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import SEO from "../../components/common/SEO";
import { experienceApi } from "../../api/experienceApi";
import { Plus } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const { register, handleSubmit, reset } = useForm();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await experienceApi.getExperiences();
      if (res.success) setExperiences(res.data.experiences || []);
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreateModal = () => {
    setEditItem(null);
    reset({ company: "", role: "", startDate: "", endDate: "", isCurrent: false, description: "", technologies: "" });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    reset({
      company: item.company,
      role: item.role,
      startDate: item.startDate ? item.startDate.split("T")[0] : "",
      endDate: item.endDate ? item.endDate.split("T")[0] : "",
      isCurrent: item.isCurrent,
      description: item.description,
      technologies: item.technologies?.join(", "),
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      technologies: data.technologies ? data.technologies.split(",").map((s) => s.trim()) : [],
    };
    try {
      if (editItem) {
        await experienceApi.updateExperience(editItem._id, payload);
      } else {
        await experienceApi.createExperience(payload);
      }
      setModalOpen(false);
      fetchItems();
      setToast({ isVisible: true, message: `Experience ${editItem ? "updated" : "created"}!`, type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await experienceApi.deleteExperience(deleteTarget._id);
      setDeleteTarget(null);
      fetchItems();
      setToast({ isVisible: true, message: "Experience deleted", type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const columns = [
    { header: "Company", accessor: "company" },
    { header: "Role", accessor: "role" },
    { header: "Start Date", accessor: "startDate", cell: (row) => formatDate(row.startDate) },
    { header: "End Date", accessor: "endDate", cell: (row) => (row.isCurrent ? "Present" : formatDate(row.endDate)) },
  ];

  return (
    <AdminLayout title="Experience Management">
      <SEO title="Manage Experience" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Manage work history and position timeline</p>
          <Button icon={Plus} size="sm" onClick={openCreateModal}>
            Add Experience
          </Button>
        </div>

        <DataTable columns={columns} data={experiences} isLoading={loading} onEdit={openEditModal} onDelete={(row) => setDeleteTarget(row)} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Experience" : "Add Experience"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Company" {...register("company", { required: true })} />
          <Input label="Role" {...register("role", { required: true })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" {...register("startDate", { required: true })} />
            <Input label="End Date" type="date" {...register("endDate")} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isCurrentExp" {...register("isCurrent")} />
            <label htmlFor="isCurrentExp" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Currently Working Here</label>
          </div>
          <Input label="Description" isTextArea rows={3} {...register("description")} />
          <Input label="Technologies (comma separated)" placeholder="React, Node.js" {...register("technologies")} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm">Save Experience</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} message={`Delete "${deleteTarget?.role} at ${deleteTarget?.company}"?`} />

      <Toast isVisible={toast.isVisible} type={toast.type} message={toast.message} onClose={() => setToast((t) => ({ ...t, isVisible: false }))} />
    </AdminLayout>
  );
}
