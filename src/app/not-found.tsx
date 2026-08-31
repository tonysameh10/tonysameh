import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <h1 className="text-6xl font-black text-brand">404</h1>
      <h2 className="mt-4 text-2xl font-extrabold text-ink">
        الصفحة دي مش موجودة
      </h2>
      <p className="mt-3 text-body">يمكن اتقلبت الرابط أو الصفحة اتشالت.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-brand px-8 py-3.5 font-semibold text-white transition hover:bg-brand-deep"
      >
        ارجع للرئيسية
      </Link>
    </Container>
  );
}
