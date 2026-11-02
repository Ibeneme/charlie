import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

const socials = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg
        className="w-3.5 h-3.5 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        className="w-4 h-4 fill-none stroke-current stroke-[2]"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        className="w-4 h-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com",
    icon: (
      <svg
        className="w-4 h-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        className="w-3.5 h-3.5 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const serviceLinks = [
  { label: "SEO & Local Search", to: "/#services" },
  { label: "Software Development", to: "/#services" },
];

const quickLinks = [
  { label: "Blog", to: "/blog" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/#services" },
  { label: "About Us", to: "/about" },
];

const linkClass =
  "inline-block text-sm text-slate-300 transition-all duration-300 hover:text-lime-400 hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 rounded-sm";

// Flips to true the first time the element scrolls into view.
function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Footer() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <footer
      ref={ref}
      data-in={inView}
      className="footer relative overflow-hidden bg-[#0b0f19] text-white font-sans"
    >
      <style>{css}</style>

      {/* Lime hairline along the top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/70 to-transparent"
      />

      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 md:pt-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="PortDigitalBoost Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="text-xl font-bold tracking-tight">
                Port<span className="text-slate-300">digital</span>
                <span className="text-lime-400">boost</span>
              </span>
            </Link>

            <p className="max-w-sm text-base leading-relaxed text-slate-300">
              SEO and software development for businesses ready to be found and
              grow.
            </p>

            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-white transition-all duration-300 hover:-translate-y-1 hover:border-lime-400 hover:bg-lime-400 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-sm font-semibold text-white">Services</h4>
            <ul className="mt-5 space-y-3.5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white">Quick links</h4>
            <ul className="mt-5 space-y-3.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400/15 text-lime-400">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <a
                  href="mailto:Hello@Portdigitalboost.com"
                  className="break-all pt-0.5 transition-colors hover:text-lime-400"
                >
                  Hello@Portdigitalboost.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400/15 text-lime-400">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <a
                  href="tel:+2348089557692"
                  className="pt-0.5 transition-colors hover:text-lime-400"
                >
                  +234 8089557692
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400/15 text-lime-400">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="pt-0.5">Port Harcourt, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} PortDigitalBoost. All rights
            reserved
          </p>

          <div className="flex items-center gap-6">
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 cursor-pointer"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Oversized wordmark, cropped and faded at the bottom */}
        <div
          aria-hidden="true"
          className=" mb-24 select-none overflow-hidden text-center"
        >
          <div
            className=" whitespace-nowrap font-extrabold leading-[0.8] tracking-tighter"
            style={{ fontSize: "min(9.6vw, 8rem)" }}
          >
            <span className="text-white/90">Port</span>
            <span className="text-slate-500">digital</span>
            <span className="text-lime-400">boost</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const css = `
.footer .footer-mark {
  height: min(6.4vw, 5.4rem);
  -webkit-mask-image: linear-gradient(to bottom, #000 25%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 25%, transparent 100%);
}
.footer .footer-mark-text {
  transform: translateY(40%);
  opacity: 0;
  transition: transform 1.2s cubic-bezier(.2,.7,.2,1), opacity 1.2s ease-out;
}
.footer[data-in="true"] .footer-mark-text {
  transform: translateY(0);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .footer .footer-mark-text { opacity: 1; transform: none; transition: none; }
}
`;
