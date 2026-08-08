import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({ title, children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0f19]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar title={title} />
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
