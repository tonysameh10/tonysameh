import type { Database } from "@/types/database";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type Package = Database["public"]["Tables"]["packages"]["Row"];
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

// Admin helpers — these throw if the table doesn't exist (callers handle it)
async function adminClient() {
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

export async function getAdminProjects() {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getAdminInquiries() {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Inquiry[];
}

export async function getAdminServices() {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function getAdminPackages() {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Package[];
}

export async function getAdminSettings(): Promise<SiteSettings | null> {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) return null;
  return data as SiteSettings;
}
