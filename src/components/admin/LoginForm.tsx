"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import { loginSchema } from "@/lib/validations";
import { Input, Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginForm = { email: string; password: string };

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginForm) {
    setError(null);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        setError("الإيميل أو الباسورد غلط — جرب تاني");
        return;
      }
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("حصلت مشكلة أثناء تسجيل الدخول");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6">
      <div className="w-full max-w-sm rounded-lg bg-white border border-line p-8 shadow-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative w-10 h-7">
              <Image
                src="/images/logo.png"
                alt="Tony Sameh logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </span>
            <span className="text-xl font-bold text-ink">
              Tony Sameh<span className="text-accent">.</span>
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-ink">لوحة التحكم</h1>
          <p className="text-muted text-sm mt-1">سجّل الدخول للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field label="الإيميل" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="you@example.com"
              dir="ltr"
              className="text-left"
              {...register("email")}
              autoComplete="email"
            />
          </Field>

          <Field label="كلمة السر" error={errors.password?.message}>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              autoComplete="current-password"
            />
          </Field>

          {error && (
            <p className="text-sm text-danger bg-danger/5 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "يتم الدخول..." : "تسجيل الدخول"}
          </Button>
        </form>
      </div>
    </div>
  );
}
