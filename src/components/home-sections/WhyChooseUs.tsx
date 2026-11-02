import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    title: "Local search, actually local",
    body: "We optimize for how people in Nigeria search - not generic playbooks built for other markets.",
    span: "md:col-span-1",
  },
  {
    title: "One team, not two vendors",
    body: "SEO strategy and development work under one roof, so your rankings and your website move forward together - not on two separate timelines.",
    span: "md:col-span-2",
    featured: true,
  },
  {
    title: "Transparent reporting",
    body: "Track your ranking progress and application status yourself - no chasing us for updates.",
    span: "md:col-span-2",
  },
  {
    title: "Built to scale with you",
    body: "Start with an SEO audit, add development or compliance services later - no need to switch providers as you grow.",
    span: "md:col-span-1",
  },
  {
    title: "Fair, upfront pricing",
    body: 'No hidden fees or government filings, no vague "custom quote" for every SEO plan.',
    span: "md:col-span-1",
  },
  {
    title: "Real people, real support",
    body: "A dedicated strategist who knows your business, not a rotating support queue.",
    span: "md:col-span-2",
  },
];

const statBorders = [
  "border-r border-b md:border-b-0",
  "border-b md:border-b-0 md:border-r",
  "border-r",
  "",
];

const stats = [
  { to: 143, decimals: 0, suffix: "+", label: "Businesses served" },
  {
    to: 312,
    decimals: 0,
    suffix: "%",
    label: "Average organic traffic growth",
  },
  {
    to: 14,
    decimals: 0,
    suffix: " days",
    label: "Average website launch turnaround",
  },
  { to: 4.6, decimals: 1, suffix: "/5", label: "Average client rating" },
];

/* ---------- helpers ---------- */

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Flips to true the first time the element scrolls into view.
function useInView<T extends HTMLElement>(threshold = 0.15) {
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
      className={`px-4 py-8 sm:px-8 text-center border-slate-700/60 ${border}`}
    >
      <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-lime-400 tabular-nums">
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-xs sm:text-sm text-slate-400 leading-snug">
        {label}
      </div>
    </div>
  );
}

// Card with a cursor-following glow and a lift on hover.
function GlowCard({
  featured = false,
  children,
}: {
  featured?: boolean;
  children: React.ReactNode;
}) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className={`group relative h-full overflow-hidden rounded-3xl p-6 sm:p-8 transition-transform duration-500 ease-out hover:-translate-y-1.5 ${
        featured
          ? "bg-lime-400 text-slate-950"
          : "bg-[#1a2032] border border-slate-700/60 text-white"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), ${
            featured ? "rgba(255,255,255,0.35)" : "rgba(163,230,53,0.16)"
          }, transparent 60%)`,
        }}
      />
      <div className="relative h-full flex flex-col">{children}</div>
    </div>
  );
}

/* ---------- component ---------- */

function WhySection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      data-in={inView}
      className="why animate-section relative overflow-hidden bg-[#111625] text-white"
    >
      <style>{css}</style>

      {/* Soft glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <h2 className="why-rise lg:col-span-7 text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.1]">
            Ranking is only useful if the business behind it is{" "}
            <span className="why-serif font-normal italic text-lime-400">
              solid too.
            </span>
          </h2>
          <p
            className="why-rise lg:col-span-4 lg:col-start-9 text-base leading-relaxed text-slate-300 max-w-sm"
            style={{ transitionDelay: "120ms" }}
          >
            We're the only team in Port Harcourt combining SEO strategy with
            development workflow that lets a growing business actually keep up.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`why-rise ${r.span}`}
              style={{ transitionDelay: `${200 + i * 90}ms` }}
            >
              <GlowCard featured={r.featured}>
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                    r.featured
                      ? "bg-slate-950 text-lime-400"
                      : "bg-lime-400/15 text-lime-400"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-lg sm:text-xl font-bold tracking-tight">
                  {r.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed max-w-md ${
                    r.featured ? "text-slate-900/80" : "text-slate-400"
                  }`}
                >
                  {r.body}
                </p>
              </GlowCard>
            </div>
          ))}
        </div>

        {/* Impact numbers */}
        <div
          className="why-rise mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-3xl border border-slate-700/60 bg-[#1a2032]/60"
          style={{ transitionDelay: "300ms" }}
        >
          {stats.map((s, i) => (
            <Stat
              key={s.label}
              {...s}
              active={inView}
              border={statBorders[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */

const steps = [
  {
    title: "Free SEO audit",
    body: "We check how your business currently ranks and where you're losing customers.",
  },
  {
    title: "We optimize",
    body: "Google Business, keywords, content and on-page SEO get built out for your business and city.",
  },
  {
    title: "You start ranking",
    body: "Watch your position climb on Google over the following weeks as the work takes effect.",
  },
  {
    title: "Add development, if needed",
    body: "Want a website or app to support the growth? Bring our dev team anytime.",
    optional: true,
  },
];

function HowItWorks() {
  const { ref, inView } = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      data-in={inView}
      className="how animate-section relative overflow-hidden bg-slate-50 text-slate-950"
    >
      <style>{howCss}</style>

      {/* Soft gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "radial-gradient(55% 100% at 10% 0%, rgba(190,242,100,0.45), transparent 70%), radial-gradient(50% 90% at 90% 0%, rgba(125,211,252,0.30), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28">
        <h2 className="how-rise text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.1] max-w-3xl">
          From paperwork to live online -{" "}
          <span className="how-serif font-normal italic">four steps</span>
        </h2>

        <ol className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={step.title}
                className="how-rise group relative flex gap-5 md:block"
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                {/* Connector: vertical on mobile, horizontal on desktop */}
                {!last && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute left-6 top-14 bottom-[-2rem] w-px bg-slate-300 md:left-[3.75rem] md:right-[-1.25rem] md:top-6 md:bottom-auto md:h-px md:w-auto"
                    />
                    <span
                      aria-hidden="true"
                      className="how-line absolute left-6 top-14 bottom-[-2rem] w-px bg-lime-500 md:left-[3.75rem] md:right-[-1.25rem] md:top-6 md:bottom-auto md:h-px md:w-auto"
                      style={{ transitionDelay: `${500 + i * 350}ms` }}
                    />
                  </>
                )}

                <span
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 group-hover:scale-110 ${
                    step.optional
                      ? "border-2 border-dashed border-slate-400 bg-slate-50 text-slate-700 group-hover:border-lime-500 group-hover:bg-lime-400 group-hover:text-slate-950"
                      : "bg-[#111625] text-lime-400 group-hover:bg-lime-400 group-hover:text-slate-950"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="md:mt-7">
                  <h3 className="text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-xs">
                    {step.body}
                  </p>
                  {step.optional && (
                    <span className="mt-3 inline-block rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                      Optional
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default function WhyChooseUs() {
  return (
    <>
      <WhySection />
      <HowItWorks />
    </>
  );
}

const howCss = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');

.how .how-serif {
  font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  font-size: 1.08em;
  letter-spacing: -0.01em;
}

.how .how-rise {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1);
}
.how[data-in="true"] .how-rise { opacity: 1; transform: none; }

/* Progress line draws itself: top-to-bottom on mobile, left-to-right on desktop */
.how .how-line {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.9s cubic-bezier(.4,0,.2,1);
}
.how[data-in="true"] .how-line { transform: none; }

@media (min-width: 768px) {
  .how .how-line { transform: scaleX(0); transform-origin: left; }
  .how[data-in="true"] .how-line { transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .how .how-rise, .how .how-line { opacity: 1; transform: none !important; transition: none; }
}
`;

/* ---------- styles ---------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');

.why .why-serif {
  font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  font-size: 1.08em;
  letter-spacing: -0.01em;
}

.why .why-rise {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1);
}
.why[data-in="true"] .why-rise {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .why .why-rise { opacity: 1; transform: none; transition: none; }
}
`;
