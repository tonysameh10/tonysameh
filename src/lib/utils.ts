import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  const translitMap: Record<string, string> = {
    أ: "a",
    إ: "a",
    ا: "a",
    آ: "a",
    ب: "b",
    ت: "t",
    ث: "th",
    ج: "j",
    ح: "h",
    خ: "kh",
    د: "d",
    ذ: "dh",
    ر: "r",
    ز: "z",
    س: "s",
    ش: "sh",
    ص: "s",
    ض: "d",
    ط: "t",
    ظ: "z",
    ع: "a",
    غ: "gh",
    ف: "f",
    ق: "q",
    ك: "k",
    ل: "l",
    م: "m",
    ن: "n",
    ه: "h",
    و: "w",
    ؤ: "w",
    ى: "a",
    ي: "y",
    ئ: "y",
    ة: "h",
    " ": "-",
  };

  const transliterated = text
    .split("")
    .map((ch) => translitMap[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return transliterated || `project-${Date.now()}`;
}

export function cleanPhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, "");
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-EG").format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function waLink(
  phone: string,
  message?: string
): string {
  const base = `https://wa.me/${cleanPhone(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
