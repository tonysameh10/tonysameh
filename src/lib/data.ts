import { seedProjects, seedServices, seedPackages } from "@/lib/seed";
import type { Database } from "@/types/database";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type Package = Database["public"]["Tables"]["packages"]["Row"];
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

// Fallback: if Supabase schema isn't applied yet, use static seed content
function mapSeedProjectToRow(p: (typeof seedProjects)[number]): Project {
  return {
    id: p.id,
    slug: p.slug,
    title_ar: p.title_ar,
    title_en: p.title_en ?? null,
    category: p.category,
    client: p.client ?? null,
    year: p.year ?? null,
    summary_ar: p.summary_ar ?? null,
    cover_image: p.cover_image,
    gallery: p.gallery,
    deliverables: p.deliverables,
    behance_url: p.behance_url ?? null,
    featured: p.featured,
    published: p.published,
    sort_order: p.sort_order,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function mapSeedServiceToRow(s: (typeof seedServices)[number]): Service {
  return {
    id: s.id,
    title_ar: s.title_ar,
    description: s.description,
    icon: s.icon,
    price_from: s.price_from,
    features: s.features,
    sort_order: s.sort_order,
    active: s.active,
  };
}

function mapSeedPackageToRow(p: (typeof seedPackages)[number]): Package {
  return {
    id: p.id,
    name_ar: p.name_ar,
    description: p.description,
    price: p.price,
    old_price: p.old_price,
    features: p.features,
    is_featured: p.is_featured,
    sort_order: p.sort_order,
    active: p.active,
  };
}

export async function getProjects() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    if (data && data.length > 0) return data as Project[];
  } catch {
    // fall through to seed
  }
  return (seedProjects.filter((p) => p.published) ?? []).map(mapSeedProjectToRow);
}

export async function getFeaturedProjects() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(3);
    if (error) throw error;
    if (data && data.length > 0) return data as Project[];
  } catch {
    // fall through to seed
  }
  return (seedProjects.filter((p) => p.featured && p.published) ?? []).map(
    mapSeedProjectToRow
  );
}

export async function getProjectBySlug(slug: string) {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (error) throw error;
    if (data) return data as Project;
  } catch {
    // fall through to seed
  }
  const seed = seedProjects.find((p) => p.slug === slug && p.published);
  return seed ? mapSeedProjectToRow(seed) : null;
}

export async function getServices() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    if (data && data.length > 0) return data as Service[];
  } catch {
    // fall through to seed
  }
  return (seedServices.filter((s) => s.active) ?? []).map(mapSeedServiceToRow);
}

export async function getPackages() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    if (data && data.length > 0) return data as Package[];
  } catch {
    // fall through to seed
  }
  return (seedPackages.filter((p) => p.active) ?? []).map(mapSeedPackageToRow);
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();
    if (error) throw error;
    if (data) return data as SiteSettings;
  } catch {
    // fall through to defaults
  }
  return {
    id: 1,
    whatsapp: "+201016042072",
    email: null,
    facebook_url: null,
    instagram_url: null,
    behance_url: null,
    pinterest_url: null,
    hero_title_ar: null,
    hero_lead_ar: null,
    is_available: true,
  };
}
