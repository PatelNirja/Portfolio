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
import { educationApi } from "../../api/educationApi";
import { Plus } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function EducationPage() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const { register, handleSubmit, reset } = useForm();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await educationApi.getEducations();
      if (res.success) setEducations(res.data.educations || []);
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
    reset({ institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", grade: "", description: "" });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    reset({
      institution: item.institution,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy,
      startDate: item.startDate ? item.startDate.split("T")[0] : "",
      endDate: item.endDate ? item.endDate.split("T")[0] : "",
      grade: item.grade,
      description: item.description,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editItem) {
        await educationApi.updateEducation(editItem._id, data);
      } else {
        await educationApi.createEducation(data);
      }
      setModalOpen(false);
      fetchItems();
      setToast({ isVisible: true, message: `Education ${editItem ? "updated" : "created"}!`, type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await educationApi.deleteEducation(deleteTarget._id);
      setDeleteTarget(null);
      fetchItems();
      setToast({ isVisible: true, message: "Education deleted", type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const columns = [
    { header: "Degree", accessor: "degree" },
    { header: "Institution", accessor: "institution" },
    { header: "Start Date", accessor: "startDate", cell: (row) => formatDate(row.startDate) },
    { header: "End Date", accessor: "endDate", cell: (row) => formatDate(row.endDate) },
  ];

  return (
    <AdminLayout title="Education Management">
      <SEO title="Manage Education" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Manage academic degrees and certificates</p>
          <Button icon={Plus} size="sm" onClick={openCreateModal}>
            Add Education
          </Button>
        </div>

        <DataTable columns={columns} data={educations} isLoading={loading} onEdit={openEditModal} onDelete={(row) => setDeleteTarget(row)} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Education" : "Add Education"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Institution" {...register("institution")} />
          <Input label="Degree" {...register("degree")} />
          <Input label="Field of Study" {...register("fieldOfStudy")} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" {...register("startDate")} />
            <Input label="End Date" type="date" {...register("endDate")} />
          </div>
          <Input label="Grade / GPA" {...register("grade")} />
          <Input label="Description" isTextArea rows={2} {...register("description")} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm">Save Education</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} message={`Delete "${deleteTarget?.degree}"?`} />

      <Toast isVisible={toast.isVisible} type={toast.type} message={toast.message} onClose={() => setToast((t) => ({ ...t, isVisible: false }))} />
    </AdminLayout>
  );
}
