import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Clock } from "lucide-react";

interface PricingProps {
  onOpenModal: (e: React.MouseEvent) => void;
}

type Currency = "NGN" | "USD";

const plans = [
  {
    name: "SEO Starter",
    price: { NGN: "₦250,000", USD: "$800" },
    intro: "What's included",
    features: [
      "Google Business Profile",
      "Local keyword targeting",
      "Monthly performance tracking",
    ],
    cta: "Choose Starter",
    popular: false,
  },
  {
    name: "SEO Growth",
    price: { NGN: "₦400,000", USD: "$1,200" },
    intro: "Everything in Starter plus…",
    features: [
      "Ongoing content & on-page SEO",
      "Competitor tracking",
      "Monthly detailed SEO report",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "SEO Pro",
    price: { NGN: "₦700,000", USD: "$1,500" },
    intro: "Everything in Growth plus…",
    features: ["Multi-location SEO", "Link building", "Dedicated strategist"],
    cta: "Choose Pro",
    popular: false,
  },
];

const posts = [
  {
    category: "Case study",
    title:
      "How a Port Harcourt auto shop went from page 5 to the top 3 on Google in 90 days.",
    date: "July 10, 2026",
    read: "4 min read",
    featured: true,
  },
  {
    category: "Local SEO",
    title: "Why your business isn't showing up on Google Maps",
    date: "July 8, 2026",
    read: "5 min read",
  },
  {
    category: "Web development",
    title: "Does your website actually help your SEO, or quietly hurt it?",
    date: "July 5, 2026",
    read: "3 min read",
  },
];

// Flips to true the first time the section scrolls into view.
function useInView<T extends HTMLElement>(threshold = 0.05) {
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

export default function PricingAndInsights({ onOpenModal }: PricingProps) {
  const [currency, setCurrency] = useState<Currency>("NGN");
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      data-in={inView}
      className="pricing-insights animate-section relative overflow-hidden bg-white text-slate-950"
    >
      <style>{css}</style>

      {/* Soft unified background gradient washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96"
        style={{
          background:
            "radial-gradient(55% 100% at 10% 0%, rgba(190,242,100,0.50), transparent 70%), radial-gradient(50% 90% at 55% 0%, rgba(125,211,252,0.28), transparent 70%), radial-gradient(45% 90% at 95% 0%, rgba(253,224,71,0.30), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32rem]"
        style={{
          background:
            "radial-gradient(60% 100% at 15% 100%, rgba(190,242,100,0.40), transparent 70%), radial-gradient(55% 90% at 55% 100%, rgba(125,211,252,0.25), transparent 70%), radial-gradient(50% 90% at 95% 100%, rgba(253,224,71,0.30), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28">
        {/* ================= PRICING SECTION ================= */}
        <div>
          {/* Header */}
          <h2 className="section-rise text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] max-w-2xl">
            Bundles for every stage of business
          </h2>

          {/* Currency switcher */}
          <div
            role="group"
            aria-label="Currency"
            className="section-rise mt-8 inline-flex rounded-xl border border-slate-200 bg-white p-1 text-sm font-medium"
            style={{ transitionDelay: "100ms" }}
          >
            {(
              [
                ["NGN", "Local (₦)"],
                ["USD", "International ($)"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setCurrency(value)}
                aria-pressed={currency === value}
                className={`rounded-lg px-4 py-2 transition-colors duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 ${
                  currency === value
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Plans */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 items-stretch">
            {plans.map((plan, i) => {
              const dark = plan.popular;
              return (
                <div
                  key={plan.name}
                  className={`section-rise ${dark ? "md:-my-3" : ""}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <article
                    className={`h-full flex flex-col rounded-2xl border transition-transform duration-500 ease-out hover:-translate-y-1 ${
                      dark
                        ? "bg-[#111625] border-[#111625] text-white shadow-xl shadow-slate-900/20"
                        : "bg-white border-slate-200 text-slate-950"
                    }`}
                  >
                    {/* Top */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center justify-between gap-3">
                        <h3
                          className={`text-lg font-semibold ${
                            dark ? "text-lime-400" : ""
                          }`}
                        >
                          {plan.name}
                        </h3>
                        {dark && (
                          <span className="rounded-full bg-lime-400 px-2.5 py-1 text-xs font-semibold text-slate-950">
                            Most chosen
                          </span>
                        )}
                      </div>

                      <div className="mt-5 flex items-end gap-2.5">
                        <span
                          key={currency}
                          className="pricing-swap text-4xl sm:text-5xl font-bold tracking-tight tabular-nums"
                        >
                          {plan.price[currency]}
                        </span>
                        <span
                          className={`pb-1.5 text-xs leading-tight ${
                            dark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          starting from
                          <br />
                          per month
                        </span>
                      </div>

                      <button
                        onClick={onOpenModal}
                        className={`mt-7 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                          dark
                            ? "bg-lime-400 text-slate-950 hover:bg-lime-300 focus-visible:outline-lime-300"
                            : "bg-slate-950 text-white hover:bg-slate-800 focus-visible:outline-slate-950"
                        }`}
                      >
                        {plan.cta}
                      </button>
                    </div>

                    {/* Features */}
                    <div
                      className={`flex-1 border-t p-6 sm:p-7 ${
                        dark ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <p className="text-xs font-bold tracking-wide uppercase">
                        Features
                      </p>
                      <p
                        className={`mt-1 text-sm ${
                          dark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {plan.intro}
                      </p>

                      <ul className="mt-5 space-y-3.5">
                        {plan.features.map((f) => (
                          <li
                            key={f}
                            className={`flex items-center gap-3 text-sm ${
                              dark ? "text-slate-200" : "text-slate-700"
                            }`}
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400">
                              <Check
                                className="h-3 w-3 text-slate-950"
                                strokeWidth={3.5}
                                aria-hidden="true"
                              />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <p
            className="section-rise mt-12 text-sm text-slate-500 max-w-2xl"
            style={{ transitionDelay: "300ms" }}
          >
            Note: Prices shown are for small businesses (clinics, shops,
            restaurants). Hotels, real estate and other higher-competition
            businesses start at higher rates due to additional optimization
            needs.
          </p>

          {/* Custom dev callout */}
          <div
            className="section-rise mt-8 rounded-3xl bg-[#111625] text-white p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8"
            style={{ transitionDelay: "350ms" }}
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-xl bg-lime-400 p-2.5 text-slate-950">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">
                  These prices cover SEO only
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                  The plans above are for SEO and local search work - they do
                  not include custom software or web development, which is
                  scoped and priced separately based on the project.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                  If you need a website, web app, or custom software built,
                  reach out directly and we'll put together a quote based on
                  what you're looking to build.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-stretch gap-3 md:items-start">
              <span className="text-sm font-semibold">
                Need something custom built?
              </span>
              <button
                onClick={onOpenModal}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 cursor-pointer"
              >
                Book a Dev Consultation
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <p
            className="section-rise mt-6 text-xs text-slate-400"
            style={{ transitionDelay: "400ms" }}
          >
            Promotional payments accepted via Alice, Stripe or Paystack. Billed
            monthly, cancel anytime.
          </p>
        </div>

        {/* ================= BLOG SECTION ================= */}
        <div className="mt-28 md:mt-36">
          <div className="section-rise flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
              Latest insights
            </h2>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-950 underline decoration-lime-500 decoration-2 underline-offset-4 transition-colors hover:text-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500"
            >
              View all posts
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <div
                key={post.title}
                className="section-rise"
                style={{ transitionDelay: `${450 + i * 110}ms` }}
              >
                <article
                  className={`h-full flex flex-col justify-between rounded-3xl p-6 sm:p-8 min-h-[18rem] transition-transform duration-500 ease-out hover:-translate-y-1.5 ${
                    post.featured
                      ? "bg-[#111625] text-white shadow-xl shadow-slate-900/15"
                      : "bg-white border border-slate-200 text-slate-950"
                  }`}
                >
                  <div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        post.featured
                          ? "bg-lime-400 text-slate-950"
                          : "bg-lime-100 text-lime-900"
                      }`}
                    >
                      {post.category}
                    </span>
                    <h3 className="mt-8 text-lg sm:text-xl font-bold leading-snug tracking-tight">
                      {post.title}
                    </h3>
                  </div>

                  <div
                    className={`mt-8 flex items-center justify-between border-t pt-4 text-xs ${
                      post.featured
                        ? "border-slate-700 text-slate-400"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    <span>{post.date}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.read}
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
@keyframes pricing-swap { from { opacity: 0; transform: translateY(8px); } }

.pricing-insights .pricing-swap { animation: pricing-swap 0.35s ease-out; }

.pricing-insights .section-rise {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1);
}
.pricing-insights[data-in="true"] .section-rise {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .pricing-insights .section-rise { opacity: 1; transform: none; transition: none; }
  .pricing-insights .pricing-swap { animation: none; }
  .pricing-insights article { transition: none; }
}
`;
