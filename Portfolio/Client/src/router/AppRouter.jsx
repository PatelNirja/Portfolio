import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import HomePage from "../pages/public/HomePage";
import ProjectDetailPage from "../pages/public/ProjectDetailPage";
import NotFoundPage from "../pages/public/NotFoundPage";

// Admin Pages
import LoginPage from "../pages/admin/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import ProfilePage from "../pages/admin/ProfilePage";
import ProjectsPage from "../pages/admin/ProjectsPage";
import ProjectFormPage from "../pages/admin/ProjectFormPage";
import SkillsPage from "../pages/admin/SkillsPage";
import ExperiencePage from "../pages/admin/ExperiencePage";
import EducationPage from "../pages/admin/EducationPage";
import AchievementsPage from "../pages/admin/AchievementsPage";
import CertificatesPage from "../pages/admin/CertificatesPage";
import MessagesPage from "../pages/admin/MessagesPage";
import SettingsPage from "../pages/admin/SettingsPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />

      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/new"
        element={
          <ProtectedRoute>
            <ProjectFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/edit/:id"
        element={
          <ProtectedRoute>
            <ProjectFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <ProtectedRoute>
            <SkillsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/experience"
        element={
          <ProtectedRoute>
            <ExperiencePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/education"
        element={
          <ProtectedRoute>
            <EducationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/achievements"
        element={
          <ProtectedRoute>
            <AchievementsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/certificates"
        element={
          <ProtectedRoute>
            <CertificatesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
