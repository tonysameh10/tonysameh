import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ServiceWorkerRegister } from "@/components/providers/ServiceWorkerRegister";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  applicationName: "Tony Sameh",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-180.png",
  },
  appleWebApp: {
    capable: true,
    title: "Tony Sameh",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Tony Sameh — تصميم وإخراج المطبوعات",
    description:
      "تصميم وإخراج الملازم والأغلفة والمطبوعات — بحيث الملف تقبله المطبعة من أول مرة.",
    type: "website",
    locale: "ar_EG",
    images: ["/images/tony.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#8d5a2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${cairo.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster position="top-center" richColors />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
