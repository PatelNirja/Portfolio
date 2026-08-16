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
        <div className="p-3.5 bg-[var(--color-danger-muted)] border border-[var(--color-danger)]/30 text-[var(--color-danger)] rounded-2xl shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1 pt-1">
          <p className="text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-[var(--color-surface-border)]">
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
