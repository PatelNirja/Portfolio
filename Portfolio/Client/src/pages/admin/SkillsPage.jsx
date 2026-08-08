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
import { skillsApi } from "../../api/skillsApi";
import { Plus } from "lucide-react";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editSkill, setEditSkill] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const { register, handleSubmit, reset } = useForm();

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await skillsApi.getSkills();
      if (res.success) setSkills(res.data.skills || []);
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setEditSkill(null);
    reset({ name: "", category: "frontend", proficiency: 80 });
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditSkill(skill);
    reset({ name: skill.name, category: skill.category, proficiency: skill.proficiency });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editSkill) {
        await skillsApi.updateSkill(editSkill._id, data);
      } else {
        await skillsApi.createSkill(data);
      }
      setModalOpen(false);
      fetchSkills();
      setToast({ isVisible: true, message: `Skill ${editSkill ? "updated" : "created"}!`, type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await skillsApi.deleteSkill(deleteTarget._id);
      setDeleteTarget(null);
      fetchSkills();
      setToast({ isVisible: true, message: "Skill deleted", type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Category", accessor: "category", cell: (row) => <span className="uppercase text-[10px] font-extrabold text-sky-500">{row.category}</span> },
    { header: "Proficiency", accessor: "proficiency", cell: (row) => <span>{row.proficiency}%</span> },
  ];

  return (
    <AdminLayout title="Skills Management">
      <SEO title="Manage Skills" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Manage technical skills and proficiency percentages</p>
          <Button icon={Plus} size="sm" onClick={openCreateModal}>
            Add Skill
          </Button>
        </div>

        <DataTable columns={columns} data={skills} isLoading={loading} onEdit={openEditModal} onDelete={(row) => setDeleteTarget(row)} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editSkill ? "Edit Skill" : "Add Skill"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Skill Name" {...register("name", { required: true })} />
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="devops">DevOps</option>
              <option value="tools">Tools</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Input label="Proficiency (%)" type="number" min="0" max="100" {...register("proficiency", { required: true })} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Skill
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} message={`Delete skill "${deleteTarget?.name}"?`} />

      <Toast isVisible={toast.isVisible} type={toast.type} message={toast.message} onClose={() => setToast((t) => ({ ...t, isVisible: false }))} />
    </AdminLayout>
  );
}
