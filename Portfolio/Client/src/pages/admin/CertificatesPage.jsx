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
import { certificatesApi } from "../../api/certificatesApi";
import { Plus } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const { register, handleSubmit, reset } = useForm();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await certificatesApi.getCertificates();
      if (res.success) setCertificates(res.data.certificates || []);
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
    reset({ name: "", issuer: "", issueDate: "", credentialId: "", credentialUrl: "" });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    reset({
      name: item.name,
      issuer: item.issuer,
      issueDate: item.issueDate ? item.issueDate.split("T")[0] : "",
      credentialId: item.credentialId,
      credentialUrl: item.credentialUrl,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editItem) {
        await certificatesApi.updateCertificate(editItem._id, data);
      } else {
        await certificatesApi.createCertificate(data);
      }
      setModalOpen(false);
      fetchItems();
      setToast({ isVisible: true, message: `Certificate ${editItem ? "updated" : "created"}!`, type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await certificatesApi.deleteCertificate(deleteTarget._id);
      setDeleteTarget(null);
      fetchItems();
      setToast({ isVisible: true, message: "Certificate deleted", type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Issuer", accessor: "issuer" },
    { header: "Issue Date", accessor: "issueDate", cell: (row) => formatDate(row.issueDate) },
  ];

  return (
    <AdminLayout title="Certificates Management">
      <SEO title="Manage Certificates" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Manage professional credentials and certificates</p>
          <Button icon={Plus} size="sm" onClick={openCreateModal}>
            Add Certificate
          </Button>
        </div>

        <DataTable columns={columns} data={certificates} isLoading={loading} onEdit={openEditModal} onDelete={(row) => setDeleteTarget(row)} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Certificate" : "Add Certificate"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Certificate Name" {...register("name")} />
          <Input label="Issuer" {...register("issuer")} />
          <Input label="Issue Date" type="date" {...register("issueDate")} />
          <Input label="Credential ID" {...register("credentialId")} />
          <Input label="Credential URL" placeholder="https://..." {...register("credentialUrl")} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm">Save Certificate</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} message={`Delete "${deleteTarget?.name}"?`} />

      <Toast isVisible={toast.isVisible} type={toast.type} message={toast.message} onClose={() => setToast((t) => ({ ...t, isVisible: false }))} />
    </AdminLayout>
  );
}
