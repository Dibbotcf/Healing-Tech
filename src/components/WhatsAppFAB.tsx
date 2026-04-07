import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/8801675292991"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#00AB4E] hover:bg-green-600 text-white rounded-full flex items-center justify-center  z-50 transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
