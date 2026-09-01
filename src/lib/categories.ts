import { dictionary } from "@/lib/dictionary";

export const projectCategories = [
  "cover",
  "booklet",
  "profile",
  "book",
  "catalog",
  "identity",
  "print",
  "digital",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const categoryLabels: Record<ProjectCategory, string> = {
  cover: dictionary.categories.cover,
  booklet: dictionary.categories.booklet,
  profile: dictionary.categories.profile,
  book: dictionary.categories.book,
  catalog: dictionary.categories.catalog,
  identity: dictionary.categories.identity,
  print: dictionary.categories.print,
  digital: dictionary.categories.digital,
};

export const categoryOptions = projectCategories.map((c) => ({
  value: c,
  label: categoryLabels[c],
}));
