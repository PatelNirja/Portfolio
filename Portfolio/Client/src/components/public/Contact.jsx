import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { messagesApi } from "../../api/messagesApi";
import Input from "../common/Input";
import Button from "../common/Button";
import Toast from "../common/Toast";
import { Send, Mail, MapPin } from "lucide-react";

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
    <section id="contact" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-20"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-accent)] text-glow">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text-main)] leading-tight max-w-2xl mx-auto">
            Let's Build Something Together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <h3 className="text-3xl font-display font-bold text-[var(--color-text-main)] leading-tight">
              Have a project in mind or want to collaborate?
            </h3>
            <p className="text-lg text-[var(--color-text-muted)] font-sans leading-relaxed">
              Fill out the contact form and I'll get back to you as soon as possible.
            </p>

            <div className="space-y-5 pt-6">
              {profile?.email && (
                <div className="flex items-center gap-5 p-5 rounded-3xl glass border border-[var(--color-surface-border)] group hover:bg-[var(--color-surface-hover)] transition-colors">
                  <div className="p-3.5 rounded-2xl bg-[var(--color-accent-muted)] text-[var(--color-accent)] group-hover:shadow-[0_0_15px_var(--color-accent-muted)] transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans uppercase font-bold tracking-widest text-[var(--color-text-muted)] block mb-1">Email Me</span>
                    <p className="text-base font-semibold text-[var(--color-text-main)]">{profile.email}</p>
                  </div>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-center gap-5 p-5 rounded-3xl glass border border-[var(--color-surface-border)] group hover:bg-[var(--color-surface-hover)] transition-colors">
                  <div className="p-3.5 rounded-2xl bg-[var(--color-accent-muted)] text-[var(--color-accent)] group-hover:shadow-[0_0_15px_var(--color-accent-muted)] transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans uppercase font-bold tracking-widest text-[var(--color-text-muted)] block mb-1">Location</span>
                    <p className="text-base font-semibold text-[var(--color-text-main)]">{profile.location}</p>
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
              className="p-10 rounded-[2rem] glass-card space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                rows={6}
                placeholder="Hi, I'd like to discuss a project..."
                error={errors.message?.message}
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Message must be at least 10 characters" },
                })}
              />

              <Button type="submit" isLoading={isSubmitting} icon={Send} className="w-full py-4 text-base font-bold tracking-wide">
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
