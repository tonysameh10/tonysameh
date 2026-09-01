import type { Database } from "@/types/database";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type Package = Database["public"]["Tables"]["packages"]["Row"];
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type Client = Database["public"]["Tables"]["clients"]["Row"];
export type ClientNote = Database["public"]["Tables"]["client_notes"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];

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

export async function getAdminClients() {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Client[];
}

export async function getAdminClient(id: string): Promise<Client | null> {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data as Client;
}

export async function getAdminClientNotes(clientId: string) {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("client_notes")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ClientNote[];
}

export async function getAdminClientPayments(clientId: string) {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("client_id", clientId)
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Payment[];
}

export async function getAdminPayments() {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Payment[];
}

export async function getAdminProjectsForSelect() {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, title_ar")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as { id: string; title_ar: string }[];
}
