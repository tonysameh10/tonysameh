import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tony Sameh — تصميم وإخراج المطبوعات",
    template: "%s | Tony Sameh",
  },
  description:
    "تصميم وإخراج الملازم والأغلفة والمطبوعات — بحيث الملف تقبله المطبعة من أول مرة.",
  openGraph: {
    title: "Tony Sameh — تصميم وإخراج المطبوعات",
    description:
      "تصميم وإخراج الملازم والأغلفة والمطبوعات — بحيث الملف تقبله المطبعة من أول مرة.",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
