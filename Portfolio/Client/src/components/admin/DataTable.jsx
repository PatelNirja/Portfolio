import React from "react";
import Spinner from "../common/Spinner";
import EmptyState from "../common/EmptyState";
import { Edit, Trash2 } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  onEdit,
  onDelete,
  emptyMessage = "No items found",
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <Spinner size="lg" className="text-sky-500" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-6 py-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
          {data.map((row, rowIdx) => (
            <tr
              key={row._id || rowIdx}
              className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 text-slate-700 dark:text-slate-300">
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 text-right space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
