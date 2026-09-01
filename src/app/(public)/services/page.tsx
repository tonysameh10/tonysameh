import type { Metadata } from "next";
import { getServices, getPackages, getSettings } from "@/lib/data";
import { PageHeader } from "@/components/public/PageHeader";
import { ServicesExplorer } from "@/components/public/ServicesExplorer";
import { ServiceComparison } from "@/components/public/ServiceComparison";
import { PackagesShowcase } from "@/components/public/PackagesShowcase";
import { ServicesFaq } from "@/components/public/ServicesFaq";
import { ServicesCta } from "@/components/public/ServicesCta";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "الخدمات والأسعار",
  description: "تفاصيل الخدمات والباقات والأسعار",
};

export default async function ServicesPage() {
  const [services, packages, settings] = await Promise.all([
    getServices(),
    getPackages(),
    getSettings(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="الخدمات"
        title="من الفوضى لملف جاهز للمطبعة"
        subtitle="أربع خدمات أساسية، كل واحدة بنظامها وتفاصيلها — واختر من الباقات الجاهزة لو مش عارف تبدأ منين."
      />

      <ServicesExplorer services={services} showPrices={settings.show_prices} />

      <ServiceComparison />

      <PackagesShowcase packages={packages} showPrices={settings.show_prices} />

      <ServicesFaq />

      <ServicesCta />
    </>
  );
}