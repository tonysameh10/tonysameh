import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { waLink } from "@/lib/utils";

function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 8.5h6.5a2 2 0 0 1 0 4H2z" />
      <path d="M2 12.5H9a2 2 0 0 1 0 4H2z" />
      <path d="M15 9.5H21" />
      <circle cx="18" cy="14" r="1.8" />
      <path d="M16.2 12.2 17.7 14m0-1.8L16.2 14" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.23-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.5v7h3Z" />
    </svg>
  );
}

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
            <div className="space-y-2.5">
              <p className="flex items-center gap-2 text-body">
                <MapPin size={16} className="text-brand shrink-0" />
                {dictionary.brand.location}
              </p>
              <p className="flex items-center gap-2 text-body">
                <MessageCircle size={16} className="text-brand shrink-0" />
                <a
                  href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand hover:underline"
                  dir="ltr"
                >
                  {dictionary.brand.whatsapp}
                </a>
              </p>
              <p className="flex items-center gap-2 text-body break-all" dir="ltr">
                <Mail size={16} className="text-brand shrink-0" />
                <a href={`mailto:${dictionary.brand.email}`} className="hover:text-brand hover:underline">
                  {dictionary.brand.email}
                </a>
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={dictionary.brand.behance}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-body hover:border-brand hover:text-brand transition-colors"
              >
                <BehanceIcon />
              </a>
              <a
                href={dictionary.brand.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-body hover:border-brand hover:text-brand transition-colors"
              >
                <FacebookIcon />
              </a>
            </div>
            <p className="text-body mt-2">{dictionary.brand.hours}</p>
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
