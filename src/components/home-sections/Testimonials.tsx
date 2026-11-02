import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Partnering with PortDigitalBoost completely transformed our online presence. They successfully optimized our local search strategy, elevating us from page 3 straight to the #1 position for competitive hospitality keywords in Port Harcourt. Verified customer bookings scaled by 35% within just two months.",
    author: "Chinedu O.",
    role: "General Manager, Luxury Hospitality Group",
    value: "+35%",
    label: "Direct bookings",
  },
//   {
//     quote:
//       "As a scaling restaurant business, visibility on Google Maps and organic search is everything. Their technical SEO framework and local search optimization tripled our incoming customer inquiries. Easily the highest ROI digital investment we've ever made.",
//     author: "Emeka K.",
//     role: "Managing Director, Culinary Ventures",
//     value: "3x",
//     label: "Inbound calls",
//   },
  {
    quote:
      "What sets them apart is their unique combination of expert SEO strategy and full-stack software development. They didn't just fix our search rankings—they architected high-performance digital tools that streamlined our entire corporate workflow.",
    author: "Ibrahim A. S.",
    role: "Operations Lead, Energy & Oil Servicing Firm",
    value: "Custom",
    label: "Workflow integration",
  },
  {
    quote:
      "They break down complex search engine algorithms into clear, actionable steps with zero corporate fluff. Their team delivered measurable ranking improvements right on schedule. True professionals who understand the Nigerian market.",
    author: "Dr. Zainab B.",
    role: "Director, Specialist Medical Clinic",
    value: "Top 3",
    label: "Local ranking",
  },
];

// Soft pastel avatars and bubbles, tied to the lime / sky / amber palette used elsewhere on the site.
const avatarTones = ["bg-lime-200", "bg-sky-200", "bg-amber-200", "bg-emerald-200"];

const bubbles = [
  { size: "h-44 w-44 sm:h-56 sm:w-56", bg: "bg-lime-200", value: "text-slate-950", label: "text-slate-700", shift: "" },
  { size: "h-36 w-36 sm:h-44 sm:w-44", bg: "bg-sky-100", value: "text-slate-950", label: "text-slate-600", shift: "md:translate-y-8" },
  { size: "h-40 w-40 sm:h-52 sm:w-52", bg: "bg-slate-950", value: "text-lime-400", label: "text-slate-300", shift: "" },
  { size: "h-36 w-36 sm:h-44 sm:w-44", bg: "bg-amber-100", value: "text-slate-950", label: "text-slate-600", shift: "md:translate-y-8" },
];

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export default function ClientSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = (i: number) => setIndex((i + total) % total);

  // Auto-advance every 7 seconds. Pauses while someone is hovering or focused,
  // and stays off entirely for people who prefer reduced motion.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), 7000);
    return () => clearInterval(timer);
  }, [paused, index, total]);

  return (
    <section className="animate-section relative overflow-hidden bg-white px-4 py-20 text-slate-950 sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Testimonial cards: the active one grows wider */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="flex flex-col gap-4 lg:flex-row lg:items-stretch"
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            {testimonials.map((t, i) => {
              const active = i === index;
              return (
                <article
                  key={t.author}
                  className={`relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 p-6 transition-all duration-500 ease-out sm:p-7 ${
                    active ? "flex lg:flex-[1.8]" : "hidden lg:flex lg:flex-1"
                  }`}
                >
                  {/* Blurred colour wash on the active card */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "radial-gradient(60% 70% at 12% 8%, rgba(190,242,100,0.55), transparent 70%), radial-gradient(50% 60% at 88% 18%, rgba(125,211,252,0.4), transparent 70%), radial-gradient(60% 60% at 60% 105%, rgba(253,224,71,0.35), transparent 70%)",
                      filter: "blur(18px)",
                    }}
                  />

                  <div className="relative z-10 flex min-h-[300px] w-full flex-col justify-between gap-8">
                    <div>
                      <p
                        className={
                          active
                            ? "inline-flex rounded-full bg-lime-400/30 px-3 py-1 text-xs font-semibold text-lime-900"
                            : "text-xs text-slate-500"
                        }
                      >
                        {t.value} {t.label.toLowerCase()}
                      </p>
                      <blockquote
                        className={`mt-5 ${
                          active
                            ? "text-lg font-medium leading-snug text-slate-950 sm:text-xl"
                            : "line-clamp-6 text-base leading-snug text-slate-700"
                        }`}
                      >
                        “{t.quote}”
                      </blockquote>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-slate-900 ${
                            avatarTones[i % avatarTones.length]
                          }`}
                          aria-hidden="true"
                        >
                          {initials(t.author)}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-slate-950">{t.author}</h3>
                          <p className="text-xs leading-snug text-slate-500">{t.role}</p>
                        </div>
                      </div>
                      <Quote
                        aria-hidden="true"
                        className={`h-7 w-7 shrink-0 rotate-180 fill-current transition-colors duration-500 ${
                          active ? "text-lime-600" : "text-slate-900"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Whole inactive card is clickable */}
                  {!active && (
                    <button
                      onClick={() => go(i)}
                      aria-label={`Show testimonial from ${t.author}`}
                      className="absolute inset-0 z-20 cursor-pointer rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500"
                    />
                  )}
                </article>
              );
            })}
          </div>

          {/* Pager with progress bar */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:border-lime-500 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex w-32 flex-col items-center gap-2" aria-live="polite">
              <p className="text-sm tabular-nums text-slate-950">
                {index + 1} <span className="text-slate-400">/ {total}</span>
              </p>
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-lime-500 transition-all duration-500 ease-out"
                  style={{ width: `${((index + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:border-lime-500 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Statement */}
        <div className="mx-auto mt-20 max-w-3xl text-center md:mt-28">
          <h2 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Trusted by industry leaders who demand{" "}
            <span className="text-lime-600">measurable impact</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-slate-600 sm:text-base">
            Discover how our unified SEO and software engineering framework drives sustainable
            growth for businesses across Nigeria.
          </p>
        </div>

        {/* Results as bubbles. Tap one to jump to that client's story. */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 pb-8 sm:gap-6 md:mt-20">
          {testimonials.map((t, i) => {
            const b = bubbles[i % bubbles.length];
            const active = i === index;
            return (
              <button
                key={t.author}
                onClick={() => go(i)}
                aria-pressed={active}
                aria-label={`${t.value} ${t.label}, from ${t.author}`}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-full px-6 text-center transition-all duration-500 ease-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500 ${b.size} ${b.bg} ${b.shift} ${
                  active ? "ring-2 ring-lime-500 ring-offset-4 ring-offset-white" : ""
                }`}
              >
                <span className={`text-3xl font-bold tracking-tight sm:text-4xl ${b.value}`}>{t.value}</span>
                <span className={`mt-1 text-xs leading-snug sm:text-sm ${b.label}`}>{t.label}</span>
              </button>
            );
          })}

          <a
            href="#services"
            className="flex h-28 w-28 items-center justify-center gap-1.5 rounded-full bg-slate-100 px-4 text-center text-xs font-semibold text-slate-950 transition-colors hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500 sm:h-32 sm:w-32 sm:text-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />
            View all services
          </a>
        </div>
      </div>
    </section>
  );
}