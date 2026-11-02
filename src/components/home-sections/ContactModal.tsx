import { Phone, MessageSquare, X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 text-center space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-2 pt-2">
          <h3 className="text-lg font-bold text-slate-900">
            Let's talk about your growth
          </h3>
          <p className="text-xs text-slate-500">
            Choose how you'd like to connect with our team right now:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* Phone Call Button */}
          <a
            href="tel:+2348089557692"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-xs transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            Phone Call (+234 808 955 7692)
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/2348089557692?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20SEO%20and%20Dev%20services."
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>

        <p className="text-[10px] text-slate-400">
          We respond quickly during business hours.
        </p>
      </div>
    </div>
  );
}