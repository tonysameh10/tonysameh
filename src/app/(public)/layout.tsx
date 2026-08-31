import { Nav } from "@/components/public/Nav";
import { Footer } from "@/components/public/Footer";
import { WhatsAppFloat } from "@/components/public/WhatsAppFloat";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
