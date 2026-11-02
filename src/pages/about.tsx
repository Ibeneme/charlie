import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Compass, Quote, Star, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  onOpenModal?: (e: React.MouseEvent) => void;
}

const journey = [
  {
    label: "The start",
    title: `A developer who kept getting asked "why isn't my site showing up?"`,
    body: "PortDigitalBoost began as a software development practice - and quickly noticed every client's next question was about visibility, not just design.",
    offset: "md:mt-16",
  },
  {
    label: "The shift",
    title: "SEO became the core, development stayed close behind",
    body: "We built out a dedicated SEO practice, while keeping development in-house, so the two could actually work together instead of being outsourced separately.",
    offset: "md:mt-8",
  },
  {
    label: "Today",
    title: "A Port Harcourt -based team serving businesses locally and beyond",
    body: "We now work with businesses across Nigeria, and internationally, who want one team that handles both getting found and getting built.",
    offset: "md:mt-0",
    highlight: true,
  },
];

const principles = [
  {
    icon: Check,
    title: "Results over reports",
    body: "We measure success in ranking and revenue, not vanity metrics dressed up in a slide deck.",
  },
  {
    icon: Compass,
    title: "Straight timelines",
    body: `No inflated promises about "ranking #1 in a week." We tell you what's realistic, and when.`,
  },
  {
    icon: Star,
    title: "Built for Nigeria and beyond",
    body: "Local search behavior, local payment realities, local infrastructure - we design around how things actually work here.",
  },
  {
    icon: User,
    title: "One point of contact",
    body: "A dedicated strategist who knows your business end-to-end. Not a rotating cast of account managers.",
  },
];

const stats = [
  { to: 143, decimals: 0, suffix: "+", label: "Businesses served" },
  { to: 312, decimals: 0, suffix: "%", label: "Avg. organic traffic growth" },
  { to: 2, decimals: 0, suffix: "", label: "Core services, one team" },
  { to: 4.9, decimals: 1, suffix: "/5", label: "Client satisfaction rating" },
];

const statBorders = [
  "border-r border-b md:border-b-0",
  "border-b md:border-b-0 md:border-r",
  "border-r",
  "",
];

/* ---------- helpers ---------- */

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Flips to true the first time the element scrolls into view.
function useInView<T extends HTMLElement>(threshold = 0.3) {
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

function useCountUp(
  to: number,
  active: boolean,
  decimals = 0,
  duration = 1800
) {
  const [value, setValue] = useState(reducedMotion() ? to : 0);

  useEffect(() => {
    if (!active || reducedMotion()) {
      if (reducedMotion()) setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);

  return value.toFixed(decimals);
}

function Stat({
  to,
  decimals,
  suffix,
  label,
  active,
  border,
}: (typeof stats)[number] & { active: boolean; border: string }) {
  const n = useCountUp(to, active, decimals);
  return (
    <div
      className={`px-4 py-10 sm:px-8 text-center border-slate-950/15 ${border}`}
    >
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums">
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-slate-900/80 leading-snug">
        {label}
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function AboutPage({ onOpenModal }: AboutPageProps) {
  const mainRef = useRef<HTMLElement>(null);
  const { ref: statsRef, inView: statsInView } = useInView<HTMLElement>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in sections on scroll
      const sections = gsap.utils.toArray<HTMLElement>(".animate-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, []);

  return (
    <main
      ref={mainRef}
      className="about w-full bg-white text-slate-950 overflow-hidden"
    >
      <style>{css}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111625] text-white px-4 sm:px-6 md:px-12 pt-36 pb-20 md:pt-44 md:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-24 h-96 w-96 rounded-full bg-lime-400/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <p
              className="about-rise inline-flex items-center gap-2 text-sm font-medium text-slate-300"
              style={{ animationDelay: "0ms" }}
            >
              <span
                className="h-2 w-2 rounded-full bg-lime-400"
                aria-hidden="true"
              />
              About PortDigitalBoost
            </p>
            <h1
              className="about-rise mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
              style={{ animationDelay: "100ms" }}
            >
              We help Nigerian businesses get found, then build what it takes to{" "}
              <span className="about-serif font-normal italic text-lime-400">
                keep growing.
              </span>
            </h1>
          </div>

          <p
            className="about-rise lg:col-span-4 text-base leading-relaxed text-slate-300"
            style={{ animationDelay: "250ms" }}
          >
            Founded in Port Harcourt, we combine SEO strategy with software
            development- two skills most agencies split across different
            vendors, we keep under one roof.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="animate-section relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-72"
          style={{
            background:
              "radial-gradient(55% 100% at 10% 0%, rgba(190,242,100,0.40), transparent 70%), radial-gradient(50% 90% at 90% 0%, rgba(125,211,252,0.25), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              Ranking and building shouldn't be{" "}
              <span className="about-serif font-normal italic">
                two separate headaches
              </span>
            </h2>
            <p className="text-base leading-relaxed text-slate-600 max-w-xl">
              Too many small businesses in Nigeria are told to hire one agency
              for SEO and a completely different developer for their website.
              With neither talking to the other, and the business owner stuck in
              the middle.
            </p>
            <p className="text-base leading-relaxed text-slate-600 max-w-xl">
              We started PortDigitalBoost to close that gap: one team that
              understands both sides, so your site is built to rank from day
              one, and your SEO strategy is backed by a site that can actually
              support it.
            </p>
          </div>

          {/* Overlapping circles */}
          <div className="lg:col-span-6">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl bg-[#111625] p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(163,230,53,0.12), transparent 70%)",
                }}
              />
              <div className="relative flex items-center justify-center">
                <div className="about-float-a flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-full border-2 border-lime-400/60 bg-lime-400/15">
                  <span className="-ml-8 text-sm font-semibold text-white">
                    SEO
                  </span>
                </div>
                <div className="about-float-b -ml-14 flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-full border-2 border-sky-400/60 bg-sky-400/15">
                  <span className="ml-8 text-sm font-semibold text-white">
                    BUILD
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="about-pulse absolute h-3 w-3 rounded-full bg-lime-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we got here */}
      <section className="animate-section relative overflow-hidden bg-slate-50">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-2xl">
            From one project to a{" "}
            <span className="about-serif font-normal italic">growing team</span>
          </h2>

          <ol className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {journey.map((step) => (
              <li key={step.label} className={step.offset}>
                <article
                  className={`group h-full rounded-3xl p-6 sm:p-8 transition-transform duration-500 ease-out hover:-translate-y-1.5 ${
                    step.highlight
                      ? "bg-[#111625] text-white shadow-xl shadow-slate-900/15"
                      : "bg-white border border-slate-200 text-slate-950"
                  }`}
                >
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      step.highlight
                        ? "bg-lime-400 text-slate-950"
                        : "bg-lime-100 text-lime-900"
                    }`}
                  >
                    {step.label}
                  </span>
                  <h3 className="mt-6 text-lg sm:text-xl font-bold leading-snug tracking-tight">
                    {step.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      step.highlight ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {step.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we work */}
      <section className="animate-section relative overflow-hidden bg-[#111625] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-2xl">
            The principles{" "}
            <span className="about-serif font-normal italic text-lime-400">
              behind the work
            </span>
          </h2>

          <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {principles.map((p) => (
              <div
                key={p.title}
                className="group rounded-3xl border border-slate-700/60 bg-[#1a2032] p-6 sm:p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-lime-400/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-slate-950 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-lg font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's note */}
      <section className="animate-section relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
          style={{
            background:
              "radial-gradient(60% 100% at 15% 100%, rgba(190,242,100,0.45), transparent 70%), radial-gradient(55% 90% at 85% 110%, rgba(125,211,252,0.30), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Portrait placeholder: swap for a real photo */}
          <div className="md:col-span-5">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#111625]">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 70% at 30% 20%, rgba(163,230,53,0.45), transparent 70%), radial-gradient(60% 60% at 80% 90%, rgba(56,189,248,0.30), transparent 70%)",
                }}
              />
              <span className="about-serif absolute inset-0 flex items-center justify-center text-[9rem] italic text-white/90">
                CA
              </span>
              <span className="absolute bottom-4 left-4 rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-slate-950">
                Founder
              </span>
            </div>
          </div>

          <div className="md:col-span-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-400 text-slate-950">
              <Quote className="h-5 w-5" aria-hidden="true" />
            </span>

            <blockquote className="mt-6 space-y-5">
              <p className="text-xl sm:text-2xl font-medium leading-snug tracking-tight text-slate-950">
                "I started out building software for local businesses in Port
                Harcourt, and kept running into the same wall. Great products
                that nobody could find online. That gap between building
                something good and actually getting it seen is where
                PortDigitalBoost lives."
              </p>
              <p className="text-base leading-relaxed text-slate-600 max-w-xl">
                "We're still small, but that's by design. Every client gets
                direct access to the person actually doing the work, not a sales
                layer between you and results."
              </p>
            </blockquote>

            <div className="mt-8">
              <p className="text-lg font-bold tracking-tight">Charles Assor</p>
              <p className="text-sm text-slate-500">
                Founder, PortDigitalBoost
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section
        ref={statsRef}
        className="animate-section bg-lime-400 text-slate-950"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Stat
              key={s.label}
              {...s}
              active={statsInView}
              border={statBorders[i]}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="animate-section relative overflow-hidden bg-[#111625] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Ready to{" "}
            <span className="about-serif font-normal italic text-lime-400">
              work with us?
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300 max-w-md mx-auto">
            Start with a free SEO audit, or tell us what you're looking to build
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-lime-400 pl-6 pr-2 py-2 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_40px_rgba(163,230,53,0.4)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 cursor-pointer"
            >
              Get my free SEO audit
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-lime-400">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </button>
            <button
              onClick={onOpenModal}
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-lime-400 hover:text-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 cursor-pointer"
            >
              Book a dev consultation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- styles ---------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');

.about .about-serif {
  font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  font-size: 1.08em;
  letter-spacing: -0.01em;
}

@keyframes about-rise  { from { opacity: 0; transform: translateY(28px); } }
@keyframes about-float-a { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes about-float-b { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
@keyframes about-pulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(163,230,53,0.6); } 50% { transform: scale(1.3); box-shadow: 0 0 0 14px rgba(163,230,53,0); } }

.about .about-rise    { animation: about-rise 0.9s cubic-bezier(.2,.7,.2,1) backwards; }
.about .about-float-a { animation: about-float-a 6s ease-in-out infinite; }
.about .about-float-b { animation: about-float-b 7s ease-in-out infinite; }
.about .about-pulse   { animation: about-pulse 2.6s ease-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .about .about-rise, .about .about-float-a, .about .about-float-b, .about .about-pulse { animation: none; }
}
`;
