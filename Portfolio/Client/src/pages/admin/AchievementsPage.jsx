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
import { achievementsApi } from "../../api/achievementsApi";
import { Plus } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const { register, handleSubmit, reset } = useForm();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await achievementsApi.getAchievements();
      if (res.success) setAchievements(res.data.achievements || []);
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
    reset({ title: "", description: "", date: "", link: "" });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    reset({
      title: item.title,
      description: item.description,
      date: item.date ? item.date.split("T")[0] : "",
      link: item.link,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editItem) {
        await achievementsApi.updateAchievement(editItem._id, data);
      } else {
        await achievementsApi.createAchievement(data);
      }
      setModalOpen(false);
      fetchItems();
      setToast({ isVisible: true, message: `Achievement ${editItem ? "updated" : "created"}!`, type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await achievementsApi.deleteAchievement(deleteTarget._id);
      setDeleteTarget(null);
      fetchItems();
      setToast({ isVisible: true, message: "Achievement deleted", type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Date", accessor: "date", cell: (row) => formatDate(row.date) },
  ];

  return (
    <AdminLayout title="Achievements Management">
      <SEO title="Manage Achievements" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Manage awards, hackathons, and honors</p>
          <Button icon={Plus} size="sm" onClick={openCreateModal}>
            Add Achievement
          </Button>
        </div>

        <DataTable columns={columns} data={achievements} isLoading={loading} onEdit={openEditModal} onDelete={(row) => setDeleteTarget(row)} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Achievement" : "Add Achievement"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" {...register("title", { required: true })} />
          <Input label="Description" isTextArea rows={2} {...register("description")} />
          <Input label="Date" type="date" {...register("date")} />
          <Input label="Verification Link" placeholder="https://..." {...register("link")} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm">Save Achievement</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} message={`Delete "${deleteTarget?.title}"?`} />

      <Toast isVisible={toast.isVisible} type={toast.type} message={toast.message} onClose={() => setToast((t) => ({ ...t, isVisible: false }))} />
    </AdminLayout>
  );
}
