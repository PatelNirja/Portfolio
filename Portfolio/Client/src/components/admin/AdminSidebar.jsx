import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  MessageSquare,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Profile", path: "/admin/profile", icon: User },
  { label: "Projects", path: "/admin/projects", icon: FolderGit2 },
  { label: "Skills", path: "/admin/skills", icon: Cpu },
  { label: "Experience", path: "/admin/experience", icon: Briefcase },
  { label: "Education", path: "/admin/education", icon: GraduationCap },
  { label: "Achievements", path: "/admin/achievements", icon: Trophy },
  { label: "Certificates", path: "/admin/certificates", icon: Award },
  { label: "Messages", path: "/admin/messages", icon: MessageSquare },
  { label: "SEO Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 z-30 shrink-0">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2 rounded-xl bg-sky-600 text-white shadow-md">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-none">Portfolio CMS</h1>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-sky-600 dark:text-sky-400">Admin Control</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer link back to portfolio */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
        >
          View Public Site
        </a>
      </div>
    </aside>
  );
}
