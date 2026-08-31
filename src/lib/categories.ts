import { dictionary } from "@/lib/dictionary";

export const projectCategories = ["cover", "booklet", "profile", "book"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const categoryLabels: Record<ProjectCategory, string> = {
  cover: dictionary.categories.cover,
  booklet: dictionary.categories.booklet,
  profile: dictionary.categories.profile,
  book: dictionary.categories.book,
};

export const categoryOptions = projectCategories.map((c) => ({
  value: c,
  label: categoryLabels[c],
}));
