import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export function WhatsAppFab() {
  return (
    <Link
      href="https://wa.me/233559956394"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-whatsapp p-4 text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-110 hover:shadow-xl md:bottom-8 md:right-8"
    >
      <FaWhatsapp className="h-7 w-7" />
    </Link>
  );
}
