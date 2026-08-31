import { dictionary } from "@/lib/dictionary";
import { waLink } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل واتساب"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-wa p-3.5 text-white shadow-warm transition-transform hover:scale-110 active:scale-95"
    >
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1 0.6 4.2 1.6 6L4 29l8.2-1.6c1.8 0.9 3.8 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-0.5-5-1.4l-0.4-0.2-4.9 1 1-4.7-0.3-0.4c-1-1.5-1.5-3.3-1.5-5.1C5.1 9.7 9.9 5 16 5c6.1 0 11 4.9 11 11 0 6-4.9 10.8-11 10.8zm6-8.1c-0.3-0.2-2-1-2.3-1.1-0.3-0.1-0.5-0.2-0.7 0.2-0.2 0.3-0.8 1.1-1 1.3-0.2 0.2-0.4 0.2-0.7 0.1-0.3-0.2-1.4-0.5-2.6-1.6-1-0.9-1.6-1.9-1.8-2.2-0.2-0.3 0-0.5 0.1-0.6 0.1-0.1 0.3-0.3 0.4-0.5 0.1-0.2 0.2-0.3 0.3-0.5 0.1-0.2 0-0.4 0-0.5-0.1-0.2-0.7-1.7-1-2.3-0.2-0.6-0.5-0.5-0.7-0.5h-0.6c-0.2 0-0.5 0.1-0.8 0.4-0.3 0.3-1 1-1 2.4s1 2.8 1.2 3c0.1 0.2 2 3.1 4.9 4.3 0.7 0.3 1.2 0.5 1.6 0.6 0.7 0.2 1.3 0.2 1.8 0.1 0.6-0.1 1.7-0.7 2-1.4 0.2-0.7 0.2-1.3 0.1-1.4 0-0.1-0.2-0.3-0.5-0.4z" />
      </svg>
    </a>
  );
}
