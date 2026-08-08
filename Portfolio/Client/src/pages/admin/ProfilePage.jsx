import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "../../components/admin/AdminLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ImageUploader from "../../components/admin/ImageUploader";
import FileUploader from "../../components/admin/FileUploader";
import Toast from "../../components/common/Toast";
import SEO from "../../components/common/SEO";
import { profileApi } from "../../api/profileApi";
import { Save } from "lucide-react";

export default function ProfilePage() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileApi.getProfile();
        if (response.success && response.data?.profile) {
          const p = response.data.profile;
          reset({
            name: p.name,
            tagline: p.tagline,
            bio: p.bio,
            location: p.location,
            email: p.email,
            phone: p.phone,
            github: p.socialLinks?.github || "",
            linkedin: p.socialLinks?.linkedin || "",
            twitter: p.socialLinks?.twitter || "",
            website: p.socialLinks?.website || "",
          });
          setProfileImage(p.profileImage || "");
          setResumeUrl(p.resumeUrl || "");
        }
      } catch (err) {
        setToast({ isVisible: true, message: err.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        tagline: data.tagline,
        bio: data.bio,
        location: data.location,
        email: data.email,
        phone: data.phone,
        profileImage,
        resumeUrl,
        socialLinks: {
          github: data.github,
          linkedin: data.linkedin,
          twitter: data.twitter,
          website: data.website,
        },
      };

      const response = await profileApi.updateProfile(payload);
      if (response.success) {
        setToast({ isVisible: true, message: "Profile updated successfully!", type: "success" });
      }
    } catch (err) {
      setToast({ isVisible: true, message: err.message || "Failed to update profile", type: "error" });
    }
  };

  return (
    <AdminLayout title="Profile Management">
      <SEO title="Manage Profile" />
      <div className="max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Personal & Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Full Name" {...register("name", { required: true })} />
            <Input label="Tagline / Headline" {...register("tagline")} />
          </div>

          <Input label="Short Bio" isTextArea rows={3} {...register("bio")} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Input label="Location" {...register("location")} />
            <Input label="Email" type="email" {...register("email")} />
            <Input label="Phone" {...register("phone")} />
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3 pt-4">
            Media & Resume Attachments
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ImageUploader label="Profile Picture" value={profileImage} onChange={(url) => setProfileImage(url)} />
            <FileUploader label="PDF Resume" value={resumeUrl} onChange={(url) => setResumeUrl(url)} />
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3 pt-4">
            Social Media Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="GitHub URL" placeholder="https://github.com/..." {...register("github")} />
            <Input label="LinkedIn URL" placeholder="https://linkedin.com/in/..." {...register("linkedin")} />
            <Input label="Twitter URL" placeholder="https://twitter.com/..." {...register("twitter")} />
            <Input label="Personal Website" placeholder="https://..." {...register("website")} />
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button type="submit" icon={Save} className="px-6">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>

      <Toast
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, isVisible: false }))}
      />
    </AdminLayout>
  );
}
