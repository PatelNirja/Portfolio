import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import SEO from "../../components/common/SEO";
import { ShieldCheck, LogIn, Lock } from "lucide-react";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const response = await login(data);
      if (response.success) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setServerError(err.message || "Invalid credentials. Please check your email and password.");
    }
  };

  return (
    <>
      <SEO title="Admin Login" />
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 text-slate-100">
        <div className="w-full max-w-md space-y-8 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Portal</h1>
            <p className="text-xs text-slate-400">Sign in to manage your portfolio content system</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
                {serverError}
              </div>
            )}

            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@portfolio.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" isLoading={isSubmitting} icon={LogIn} className="w-full py-3">
              Authenticate
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
