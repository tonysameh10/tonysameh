"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderKanban,
  MessagesSquare,
  Layers,
  Package,
  Users,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/projects", label: "المشاريع", icon: FolderKanban },
  { href: "/admin/inquiries", label: "الاستفسارات", icon: MessagesSquare },
  { href: "/admin/clients", label: "العملاء", icon: Users },
  { href: "/admin/revenue", label: "الإيرادات والمدفوعات", icon: Wallet },
  { href: "/admin/services", label: "الخدمات", icon: Layers },
  { href: "/admin/packages", label: "الباقات", icon: Package },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success("تم تسجيل الخروج");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("حصلت مشكلة أثناء الخروج");
    }
  }

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-line">
        <span className="relative w-9 h-6">
          <Image
            src="/images/logo.png"
            alt="Tony Sameh logo"
            fill
            sizes="36px"
            className="object-contain"
          />
        </span>
        <div>
          <span className="font-bold text-ink">Tony Sameh.</span>
          <span className="block text-xs text-muted">لوحة التحكم</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1" aria-label="Admin navigation">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "bg-brand text-white"
                  : "text-body hover:bg-surface-2 hover:text-ink"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-line">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-danger hover:bg-danger/5 transition-colors"
        >
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar (right side in RTL) */}
      <aside className="hidden md:block w-60 shrink-0 border-r border-line bg-white">
        {content}
      </aside>

      {/* Mobile header + drawer */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-white border-b border-line px-4 py-3">
        <span className="font-bold text-ink">Tony Sameh.</span>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="القائمة"
          className="p-2 rounded-md text-ink hover:bg-surface-2"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {mobileOpen && (
        <aside className="md:hidden fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute top-3 left-3 p-2 text-ink"
            aria-label="إغلاق"
          >
            <X size={22} />
          </button>
          {content}
        </aside>
      )}
    </>
  );
}
