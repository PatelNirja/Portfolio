import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";
import SEO from "../../components/common/SEO";
import { messagesApi } from "../../api/messagesApi";
import { Mail, Check, Eye } from "lucide-react";
import { formatDateFull } from "../../utils/formatDate";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMessage, setViewMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await messagesApi.getMessages();
      if (res.success) setMessages(res.data.messages || []);
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleView = async (msg) => {
    setViewMessage(msg);
    if (!msg.isRead) {
      try {
        await messagesApi.markRead(msg._id);
        fetchMessages();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await messagesApi.deleteMessage(deleteTarget._id);
      setDeleteTarget(null);
      fetchMessages();
      setToast({ isVisible: true, message: "Message deleted", type: "success" });
    } catch (err) {
      setToast({ isVisible: true, message: err.message, type: "error" });
    }
  };

  const columns = [
    {
      header: "Status",
      accessor: "isRead",
      cell: (row) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${row.isRead ? "bg-slate-100 dark:bg-slate-800 text-slate-400" : "bg-sky-500/10 text-sky-500"}`}>
          {row.isRead ? "Read" : "New"}
        </span>
      ),
    },
    { header: "Sender", accessor: "name", cell: (row) => <span className="font-bold">{row.name} ({row.email})</span> },
    { header: "Subject", accessor: "subject" },
    { header: "Date", accessor: "createdAt", cell: (row) => formatDateFull(row.createdAt) },
  ];

  return (
    <AdminLayout title="Messages Inbox">
      <SEO title="Contact Inbox" />
      <div className="space-y-6">
        <p className="text-xs text-slate-500">Read and respond to public contact form submissions</p>
        <DataTable columns={columns} data={messages} isLoading={loading} onEdit={handleView} onDelete={(row) => setDeleteTarget(row)} />
      </div>

      <Modal isOpen={!!viewMessage} onClose={() => setViewMessage(null)} title={viewMessage?.subject || "Message Details"}>
        {viewMessage && (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{viewMessage.name}</p>
                <p className="text-xs text-sky-500">{viewMessage.email}</p>
              </div>
              <span className="text-xs text-slate-400">{formatDateFull(viewMessage.createdAt)}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {viewMessage.message}
            </div>
            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setViewMessage(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} message="Delete this contact message?" />

      <Toast isVisible={toast.isVisible} type={toast.type} message={toast.message} onClose={() => setToast((t) => ({ ...t, isVisible: false }))} />
    </AdminLayout>
  );
}
