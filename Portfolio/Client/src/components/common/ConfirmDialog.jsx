import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-xl shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button variant="secondary" size="sm" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={onConfirm} isLoading={isLoading}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
