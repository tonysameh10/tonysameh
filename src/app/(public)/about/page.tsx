import type { Metadata } from "next";
import { About } from "@/components/public/About";

export const metadata: Metadata = {
  title: "من أنا",
  description: "Tony Sameh — مصمم طباعة وهوية بصرية",
};

export default function AboutPage() {
  return <About />;
}