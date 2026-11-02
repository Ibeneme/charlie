import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/#services" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Portfolio", path: "/portfolio" },
];

// Replace with your business WhatsApp link
const whatsappUrl = "https://wa.me/2348089557692";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Tighten the bar once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    const onServices =
      location.pathname === "/" && location.hash === "#services";
    if (path === "/#services") return onServices;
    if (path === "/") return location.pathname === "/" && !onServices;
    return location.pathname === path;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    setMobileMenuOpen(false);
    if (path === "/#services") {
      e.preventDefault();
      if (location.pathname === "/") {
        const servicesElement = document.getElementById("services");
        if (servicesElement) {
          servicesElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/#services");
      }
    }
  };

  return (
    <header className="nav fixed inset-x-0 top-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4">
      <style>{css}</style>

      <div className="relative max-w-6xl mx-auto">
        <div
          className={`nav-drop grid md:grid-cols-[1fr_auto_1fr] grid-cols-[1fr_auto] items-center rounded-full border py-2 pl-4 pr-2 sm:pl-5 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "bg-[#111625]/90 border-slate-700/70 shadow-lg shadow-black/25"
              : "bg-[#111625]/70 border-white/10"
          }`}
        >
          {/* Logo and brand name */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 justify-self-start rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400"
          >
            <img
              src="/logo.svg"
              alt="PortDigitalBoost Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Port<span className="text-slate-300">digital</span>
              <span className="text-lime-400">boost</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main"
            className="hidden md:flex items-center gap-1 text-sm font-medium"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 ${
                    active
                      ? "bg-white/10 text-lime-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* WhatsApp button (desktop) */}
          <div className="hidden md:flex justify-self-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
            >
              <MessageCircle
                className="h-4 w-4 fill-slate-950 text-lime-400 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                aria-hidden="true"
              />
              Chat on WhatsApp
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="nav-pop md:hidden absolute left-0 right-0 top-full mt-2 rounded-3xl border border-slate-700/70 bg-[#111625]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-2xl px-4 py-3 text-lg font-semibold transition-colors ${
                      active
                        ? "bg-white/10 text-lime-400"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-lime-300"
            >
              <MessageCircle
                className="h-4 w-4 fill-slate-950 text-lime-400"
                aria-hidden="true"
              />
              Chat on WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

const css = `
@keyframes nav-drop { from { opacity: 0; transform: translateY(-24px); } }
@keyframes nav-pop  { from { opacity: 0; transform: translateY(-8px) scale(0.98); } }

.nav .nav-drop { animation: nav-drop 0.8s cubic-bezier(.2,.8,.2,1) 0.1s backwards; }
.nav .nav-pop  { animation: nav-pop 0.25s ease-out; transform-origin: top; }

@media (prefers-reduced-motion: reduce) {
  .nav .nav-drop, .nav .nav-pop { animation: none; }
}
`;
