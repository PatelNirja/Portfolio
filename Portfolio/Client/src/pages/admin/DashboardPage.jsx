import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import SEO from "../../components/common/SEO";
import { projectsApi } from "../../api/projectsApi";
import { skillsApi } from "../../api/skillsApi";
import { messagesApi } from "../../api/messagesApi";
import { FolderGit2, Cpu, MessageSquare, Mail } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function DashboardPage() {
  const [stats, setStats] = useState({ projectsCount: 0, skillsCount: 0, unreadMessages: 0, totalMessages: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projRes, skillRes, msgRes] = await Promise.all([
          projectsApi.getProjects({ limit: 1 }),
          skillsApi.getSkills(),
          messagesApi.getMessages({ limit: 5 }),
        ]);

        setStats({
          projectsCount: projRes.pagination?.total || 0,
          skillsCount: skillRes.data?.skills?.length || 0,
          unreadMessages: msgRes.data?.unreadCount || 0,
          totalMessages: msgRes.pagination?.total || 0,
        });

        setRecentMessages(msgRes.data?.messages || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      <SEO title="Admin Dashboard" />
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Projects" value={stats.projectsCount} icon={FolderGit2} color="sky" />
          <StatsCard title="Technical Skills" value={stats.skillsCount} icon={Cpu} color="purple" />
          <StatsCard title="Unread Messages" value={stats.unreadMessages} icon={Mail} color="amber" />
          <StatsCard title="Total Messages" value={stats.totalMessages} icon={MessageSquare} color="emerald" />
        </div>

        {/* Recent Messages Section */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-sky-500" />
            Recent Contact Submissions
          </h3>

          {recentMessages.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">No contact messages received yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentMessages.map((msg) => (
                <div key={msg._id} className="py-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{msg.name} ({msg.email})</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-4">{formatDate(msg.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
