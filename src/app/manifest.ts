import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const name = "Tony Sameh — تصميم وإخراج المطبوعات";
  return {
    name,
    short_name: "Tony Sameh",
    description:
      "تصميم وإخراج الهوية البصرية والبروفايلات والكتالوجات والكتب والمطبوعات — بحيث الملف يطلع جاهز للمطبعة من أول مرة.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#8d5a2b",
    lang: "ar",
    dir: "rtl",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/icons/icon-96.png", sizes: "96x96", type: "image/png", purpose: "monochrome" },
    ],
  };
}