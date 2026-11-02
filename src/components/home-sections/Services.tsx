import { ArrowUpRight, Check } from "lucide-react";
import { useRef } from "react";

interface ServicesProps {
  onOpenModal: (e: React.MouseEvent) => void;
}

const services = [
  {
    title: "SEO",
    tagline: "Rank higher, faster.",
    items: [
      "Audit",
      "Local SEO",
      "On-page SEO",
      "Content strategy",
      "Link building",
    ],
    cta: "Get free SEO audit",
  },
  {
    title: "Web & Mobile Apps",
    tagline: "Build smarter, scale faster.",
    items: ["Mobile apps", "Web apps"],
    cta: "Book a dev consultation",
  },
  {
    title: "Custom Software",
    tagline: "Tools shaped around your business.",
    items: ["Custom software", "API integration", "IT consulting"],
    cta: "Book a dev consultation",
  },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ServiceCard({
  service,
  index,
  featured,
  onOpenModal,
}: {
  service: (typeof services)[0];
  index: number;
  featured: boolean;
  onOpenModal: (e: React.MouseEvent) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const number = String(index + 1).padStart(2, "0");

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion()) return;
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const shell = featured
    ? "lg:col-span-5 lg:row-span-2 bg-slate-950 border-slate-800 text-white p-8 sm:p-10"
    : "lg:col-span-7 bg-slate-50/60 border-slate-200/80 text-slate-950 p-6 sm:p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]";

  const header = (
    <div>
      <div className="flex items-start justify-between gap-4">
        <h3
          className={`font-bold tracking-tight ${
            featured
              ? "text-3xl sm:text-4xl"
              : "text-xl text-slate-950 transition-colors duration-300 group-hover:text-lime-900"
          }`}
        >
          {service.title}
        </h3>
        {!featured && (
          <span className="pt-1 text-sm tabular-nums text-slate-400">{number}</span>
        )}
      </div>
      <p className={`mt-1 text-sm font-medium ${featured ? "text-slate-400" : "text-slate-500"}`}>
        {service.tagline}
      </p>
    </div>
  );

  const list = (
    <ul
      className={
        featured
          ? "mt-10 space-y-4"
          : "grid content-start gap-3 sm:grid-cols-2 md:flex-1"
      }
    >
      {service.items.map((item, itemIdx) => (
        <li
          key={item}
          style={{ animationDelay: `${500 + index * 150 + itemIdx * 60}ms` }}
          className={`services-check flex items-center gap-3 font-medium ${
            featured
              ? "border-b border-white/10 pb-4 text-base text-slate-200 last:border-0"
              : "text-sm text-slate-700"
          }`}
        >
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
              featured ? "bg-lime-400/15 text-lime-300" : "bg-lime-100 text-lime-700"
            }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );

  const cta = (
    <button
      onClick={onOpenModal}
      className={`group/btn inline-flex cursor-pointer items-center gap-2 self-start text-sm font-semibold ${
        featured ? "mt-auto pt-10 text-white" : "mt-8 text-slate-950 md:mt-auto md:pt-8"
      }`}
    >
      <span
        className={`relative pb-0.5 underline decoration-2 underline-offset-4 transition-colors duration-300 ${
          featured
            ? "decoration-lime-400 group-hover/btn:text-lime-300"
            : "decoration-lime-400 group-hover/btn:text-lime-800 group-hover/btn:decoration-lime-600"
        }`}
      >
        {service.cta}
      </span>
      <span
        className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 group-hover/btn:scale-110 ${
          featured
            ? "bg-lime-400 text-slate-950 group-hover/btn:bg-white"
            : "bg-slate-900 text-lime-400 group-hover/btn:bg-lime-400 group-hover/btn:text-slate-950"
        }`}
      >
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </button>
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      style={{ animationDelay: `${300 + index * 150}ms` }}
      className={`services-rise group relative overflow-hidden rounded-3xl border transition-all duration-500 ease-out hover:-translate-y-1.5 ${shell}`}
    >
      {/* Spotlight that follows the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(190,242,100,${
            featured ? 0.16 : 0.25
          }), transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-px w-full ${featured ? "bg-slate-800" : "bg-slate-200"}`}
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 z-20 h-[3px] w-0 bg-lime-400 transition-all duration-500 ease-out group-hover:w-full"
      />

      {/* Oversized index on the featured card */}
      {featured && (
        <span
          aria-hidden="true"
          className="services-serif pointer-events-none absolute -bottom-10 -right-2 select-none text-[11rem] leading-none text-white/[0.05]"
        >
          {number}
        </span>
      )}

      {featured ? (
        <div className="relative z-20 flex h-full flex-col">
          {header}
          {list}
          {cta}
        </div>
      ) : (
        <div className="relative z-20 flex h-full flex-col gap-8 md:flex-row md:justify-between md:gap-12">
          <div className="flex flex-col md:max-w-xs md:flex-1">
            {header}
            {cta}
          </div>
          {list}
        </div>
      )}
    </div>
  );
}

export default function Services({ onOpenModal }: ServicesProps) {
  return (
    <section
      id="services"
      className="services relative overflow-hidden bg-white text-slate-950"
    >
      <style>{css}</style>

      {/* Soft gradient wash at the base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96 opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 15% 100%, rgba(190,242,100,0.45), transparent 70%), radial-gradient(55% 90% at 55% 110%, rgba(125,211,252,0.25), transparent 70%), radial-gradient(50% 90% at 95% 100%, rgba(253,224,71,0.25), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 md:px-12 md:pb-32 md:pt-28">
        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 className="services-rise text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:col-span-7 lg:text-6xl">
            Two core strengths.{" "}
            <span className="services-serif font-normal italic text-lime-600 sm:text-slate-950">
              One unified mission.
            </span>
          </h2>

          <p
            className="services-rise max-w-sm text-base leading-snug text-slate-600 sm:text-lg lg:col-span-4 lg:col-start-9"
            style={{ animationDelay: "150ms" }}
          >
            Get your business found, then build what it needs to keep growing.
          </p>
        </div>

        {/* Bento: one tall featured card beside two wide ones */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 lg:grid-cols-12 lg:gap-6">
          {services.map((s, index) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={index}
              featured={index === 0}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');

.services .services-serif {
  font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  font-size: 1.08em;
  letter-spacing: -0.01em;
}

@keyframes services-rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes services-check {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

.services .services-rise {
  animation: services-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.services .services-check {
  animation: services-check 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

@media (prefers-reduced-motion: reduce) {
  .services *, .services *::before, .services *::after {
    animation: none !important;
    transition: none !important;
  }
}
`;