import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({ message, type = "success", isVisible, onClose, duration = 4000 }) {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 px-5 py-4 rounded-2xl glass-card border border-[var(--color-surface-border)] shadow-2xl"
        >
          {type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-secondary)] shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[var(--color-danger)] shrink-0" />
          )}
          <span className="text-sm font-sans font-medium text-[var(--color-text-main)]">{message}</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
