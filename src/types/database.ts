export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          title_ar: string;
          title_en: string | null;
          category:
            | "cover"
            | "booklet"
            | "profile"
            | "book"
            | "catalog"
            | "identity"
            | "print"
            | "digital";
          client: string | null;
          year: number | null;
          summary_ar: string | null;
          cover_image: string;
          gallery: string[];
          deliverables: string[];
          behance_url: string | null;
          featured: boolean;
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]> & {
          slug: string;
          title_ar: string;
          cover_image: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
      };
      services: {
        Row: {
          id: string;
          title_ar: string;
          description: string | null;
          icon: string | null;
          price_from: number | null;
          features: string[];
          sort_order: number;
          active: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      };
      packages: {
        Row: {
          id: string;
          name_ar: string;
          description: string | null;
          price: number;
          old_price: number | null;
          features: string[];
          is_featured: boolean;
          sort_order: number;
          active: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["packages"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["packages"]["Row"]>;
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          phone: string;
          service_type: string | null;
          message: string | null;
          file_url: string | null;
          status: "new" | "contacted" | "won" | "lost";
          notes: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["inquiries"]["Row"]> & {
          name: string;
          phone: string;
        };
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Row"]>;
      };
      site_settings: {
        Row: {
          id: number;
          whatsapp: string | null;
          email: string | null;
          facebook_url: string | null;
          instagram_url: string | null;
          behance_url: string | null;
          pinterest_url: string | null;
          hero_title_ar: string | null;
          hero_lead_ar: string | null;
          is_available: boolean;
          show_prices: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
