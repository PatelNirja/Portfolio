import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { messagesApi } from "../../api/messagesApi";
import Input from "../common/Input";
import Button from "../common/Button";
import Toast from "../common/Toast";
import { Send, Mail, MapPin, CheckCircle2 } from "lucide-react";

export default function Contact({ profile }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const onSubmit = async (data) => {
    try {
      const response = await messagesApi.submitMessage(data);
      if (response.success) {
        setToast({
          isVisible: true,
          message: response.message || "Your message has been sent successfully!",
          type: "success",
        });
        reset();
      }
    } catch (err) {
      setToast({
        isVisible: true,
        message: err.message || "Failed to send message. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2 mb-16"
        >
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Get In Touch
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Let's Build Something Together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Have a project in mind or want to collaborate?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Fill out the contact form and I'll get back to you as soon as possible.
            </p>

            <div className="space-y-4 pt-4">
              {profile?.email && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Email Me</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{profile.email}</p>
                  </div>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{profile.location}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Your Name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register("name", { required: "Name is required" })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
                  })}
                />
              </div>

              <Input
                label="Subject"
                placeholder="Project Inquiry / Job Opportunity"
                error={errors.subject?.message}
                {...register("subject")}
              />

              <Input
                label="Message"
                isTextArea
                rows={5}
                placeholder="Hi, I'd like to discuss a project..."
                error={errors.message?.message}
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Message must be at least 10 characters" },
                })}
              />

              <Button type="submit" isLoading={isSubmitting} icon={Send} className="w-full py-3.5">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      <Toast
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, isVisible: false }))}
      />
    </section>
  );
}
