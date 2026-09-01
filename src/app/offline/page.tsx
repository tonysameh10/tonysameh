import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "أنت أوفلاين",
};

export default function OfflinePage() {
  return (
    <Container className="py-24">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-ink">أنت حالياً أوفلاين</h1>
        <p className="mt-4 text-body">
          مفيش اتصال بالإنترنت حالياً. رجّع الاتصال وجرب تاني، أو شوف صفحة رئيسية محفوظة.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-brand px-8 py-3 font-semibold text-white hover:bg-brand-deep transition-colors"
        >
          الصفحة الرئيسية
        </Link>
      </div>
    </Container>
  );
}