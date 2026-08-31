import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "من فضلك اكتب اسمك" }),
  phone: z
    .string()
    .min(10, { message: "رقم الموبايل مش صحيح" })
    .regex(/^[0-9+ ]+$/, { message: "رقم الموبايل مش صحيح" }),
  service_type: z.string().optional(),
  message: z.string().min(10, { message: "اكتب رسالتك (على الأقل 10 حروف)" }),
  file_url: z
    .string()
    .url({ message: "الرابط مش صحيح — حطه بصيغة https://" })
    .optional()
    .or(z.literal("")),
});

export type ContactForm = z.infer<typeof contactSchema>;

export const projectSchema = z.object({
  title_ar: z.string().min(2, "اكتب اسم المشروع"),
  slug: z.string().min(2, "اكتب slug"),
  category: z.enum(["cover", "booklet", "profile", "book"]),
  client: z.string().optional(),
  year: z.number().int().min(2000).optional(),
  summary_ar: z.string().optional(),
  cover_image: z.string().min(2, "ارفّع صورة غلاف"),
  gallery: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  behance_url: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

export const loginSchema = z.object({
  email: z.string().email("الإيميل مش صحيح"),
  password: z.string().min(6, "كلمة السر على الأقل 6 حروف"),
});
