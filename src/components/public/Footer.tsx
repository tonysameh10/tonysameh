import Link from "next/link";
import Image from "next/image";
import { dictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { waLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-surface-2 border-t border-line">
      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="relative w-9 h-6">
                <Image
                  src="/images/logo.png"
                  alt="Tony Sameh logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </span>
              <span className="text-xl font-bold text-ink">
                {dictionary.brand.name}
                <span className="text-accent">.</span>
              </span>
            </div>
            <p className="text-body">{dictionary.footer.tagline}</p>
            <p className="text-muted text-sm">{dictionary.brand.signature}</p>
          </div>

          <div>
            <h3 className="font-bold text-ink mb-4">روابط سريعة</h3>
            <nav className="flex flex-col gap-3" aria-label="Footer">
              <Link href="/" className="text-body hover:text-brand transition-colors">
                {dictionary.nav.home}
              </Link>
              <Link href="/about" className="text-body hover:text-brand transition-colors">
                {dictionary.nav.about}
              </Link>
              <Link href="/work" className="text-body hover:text-brand transition-colors">
                {dictionary.nav.work}
              </Link>
              <Link
                href="/services"
                className="text-body hover:text-brand transition-colors"
              >
                {dictionary.nav.services}
              </Link>
              <Link
                href="/contact"
                className="text-body hover:text-brand transition-colors"
              >
                {dictionary.nav.contact}
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-ink mb-4">تواصل معايا</h3>
            <p className="text-body">{dictionary.brand.location}</p>
            <p className="text-body mt-2">{dictionary.brand.hours}</p>
            <a
              href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-brand font-semibold hover:underline"
              dir="ltr"
            >
              {dictionary.brand.whatsapp}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted">
          <p>{dictionary.footer.rights}</p>
          <p>{dictionary.footer.made}</p>
        </div>
      </Container>
    </footer>
  );
}
