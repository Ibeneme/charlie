import { useState } from "react";
import {
  TrendingUp,
  Monitor,
  MapPin,
  Smartphone,
  Check,
  ArrowRight,
  ArrowUpRight,
  Dumbbell,
} from "lucide-react";

type Category =
  | "All"
  | "SEO"
  | "Web design"
  | "Web Development"
  | "Mobile Apps";

type Tone = "lime" | "navy" | "sky" | "sun";

interface Project {
  id: string;
  category: Category;
  categoryLabel: string;
  subCategory: string;
  client: string;
  title: string;
  description: string;
  outcome: string;
  tone: Tone;
  icon: typeof TrendingUp;
}

interface PortfolioProps {
  onOpenModal?: (e: React.MouseEvent) => void;
}

const PROJECTS: Project[] = [
  {
    id: "greenfield-clinic",
    category: "SEO",
    categoryLabel: "SEO",
    subCategory: "Healthcare",
    client: "Greenfield Clinic",
    title: "Content and technical SEO for a private medical clinic",
    description:
      "On-page fixes, service-page content and local keyword targeting for patient search terms.",
    outcome: "183% increase in organic appointment inquiries",
    tone: "lime",
    icon: TrendingUp,
  },
  {
    id: "riverside-fashion",
    category: "Web Development",
    categoryLabel: "Web development",
    subCategory: "Retail",
    client: "Riverside Fashion House",
    title: "E-commerce built for a growing fashion label",
    description:
      "Full online store with catalog, checkout and SEO-optimized product pages from day one.",
    outcome: "Launched in 3 weeks, ranking within 90 days",
    tone: "navy",
    icon: Monitor,
  },
  {
    id: "suya-spot",
    category: "SEO",
    categoryLabel: "SEO",
    subCategory: "Restaurant",
    client: "Suya Spot PH",
    title: "Local SEO overhaul for a growing restaurant chain",
    description:
      "Google Business optimization and content strategy across 3 locations in Port Harcourt.",
    outcome: "214% increase in map-pack visibility",
    tone: "sky",
    icon: MapPin,
  },
  {
    id: "pickars-logistics",
    category: "Mobile Apps",
    categoryLabel: "Mobile app",
    subCategory: "Package delivery",
    client: "Pickars Logistics",
    title: "Ordering app with live ETA tracking for local deliveries",
    description:
      "Full mobile ordering flow - menu, payment, live delivery tracking and delivery dashboard.",
    outcome: "149% increase in map-pack visibility",
    tone: "sun",
    icon: Smartphone,
  },
];

// Colour treatments for each card header (no shadows, flat colour only).
const tones: Record<
  Tone,
  { bg: string; chip: string; icon: string; ring: string }
> = {
  lime: {
    bg: "bg-lime-400",
    chip: "bg-slate-950/10 text-slate-950",
    icon: "bg-slate-950 text-lime-400",
    ring: "border-slate-950/15",
  },
  navy: {
    bg: "bg-[#111625]",
    chip: "bg-white/10 text-white",
    icon: "bg-lime-400 text-slate-950",
    ring: "border-white/10",
  },
  sky: {
    bg: "bg-sky-200",
    chip: "bg-slate-950/10 text-slate-950",
    icon: "bg-[#111625] text-sky-200",
    ring: "border-slate-950/10",
  },
  sun: {
    bg: "bg-yellow-300",
    chip: "bg-slate-950/10 text-slate-950",
    icon: "bg-slate-950 text-yellow-300",
    ring: "border-slate-950/15",
  },
};

const categories: Category[] = [
  "All",
  "SEO",
  "Web design",
  "Web Development",
  "Mobile Apps",
];

const metrics = [
  { value: "#5", label: "Start rank", accent: false },
  { value: "#3", label: "New rank", accent: true },
  { value: "+312%", label: "Traffic", accent: true },
  { value: "+4.1k", label: "Views", accent: false },
];

const metricBorders = [
  "border-r border-b sm:border-b-0",
  "border-b sm:border-b-0 sm:border-r",
  "border-r",
  "",
];

export default function Portfolio({ onOpenModal }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const showFeatured = activeCategory === "All" || activeCategory === "SEO";

  return (
    <div className="port min-h-screen bg-white text-slate-950 font-sans">
      <style>{css}</style>

      {/* Hero + filters */}
      <section className="relative overflow-hidden bg-[#111625] text-white px-4 sm:px-6 md:px-12 pt-36 pb-16 md:pt-44 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 70% at 8% 0%, rgba(163,230,53,0.16), transparent 70%), radial-gradient(40% 60% at 95% 100%, rgba(56,189,248,0.10), transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <p
                className="port-rise inline-flex items-center gap-2 text-sm font-medium text-slate-300"
                style={{ animationDelay: "0ms" }}
              >
                <span
                  className="h-2 w-2 rounded-full bg-lime-400"
                  aria-hidden="true"
                />
                Our work
              </p>
              <h1
                className="port-rise mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
                style={{ animationDelay: "100ms" }}
              >
                Real businesses. Real rankings.{" "}
                <span className="port-serif font-normal italic text-lime-400">
                  Real results.
                </span>
              </h1>
            </div>

            <p
              className="port-rise lg:col-span-4 text-base leading-relaxed text-slate-300"
              style={{ animationDelay: "250ms" }}
            >
              A look at our SEO campaigns success stories and recent projects
              we've built for Nigerian businesses - and the numbers behind them.
            </p>
          </div>

          {/* Filters */}
          <div
            role="group"
            aria-label="Filter projects"
            className="port-rise mt-12 flex flex-wrap gap-2.5"
            style={{ animationDelay: "380ms" }}
          >
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={active}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 ${
                    active
                      ? "border-lime-400 bg-lime-400 text-slate-950"
                      : "border-slate-600 bg-transparent text-slate-200 hover:border-lime-400 hover:text-lime-400"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured + projects */}
      <section className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24 space-y-6 md:space-y-8">
          {/* Featured case study */}
          {showFeatured && (
            <article className="port-rise grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl bg-[#111625] text-white">
              {/* Details */}
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-slate-950">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-slate-950"
                      aria-hidden="true"
                    />
                    Featured case study
                  </span>
                  <h2 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
                    Javin Hotel: Ada-George, Port Harcourt
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-slate-300 max-w-xl">
                    Javin hotel was ranking on page 5 for every relevant local
                    search. We rebuilt their Google Business Profile, targeted
                    hyper-local keywords, and built out service-page content —
                    moving them straight into the top 3 results within three
                    months.
                  </p>
                </div>

                <div>
                  <dl className="grid grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-2xl border border-slate-700/70">
                    {metrics.map((m, i) => (
                      <div
                        key={m.label}
                        className={`px-4 py-5 border-slate-700/70 ${metricBorders[i]}`}
                      >
                        <dd
                          className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                            m.accent ? "text-lime-400" : "text-white"
                          }`}
                        >
                          {m.value}
                        </dd>
                        <dt className="mt-1 text-xs text-slate-400">
                          {m.label}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  <button className="group mt-7 inline-flex items-center gap-3 rounded-full bg-lime-400 pl-6 pr-2 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-lime-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 cursor-pointer">
                    View full case study
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-lime-400">
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="lg:col-span-5 relative flex items-center justify-center bg-[#1a2032] p-6 sm:p-8 min-h-[280px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 70% 30%, rgba(163,230,53,0.14), transparent 70%)",
                  }}
                />
                <div className="relative w-full max-w-sm rounded-2xl border border-slate-600/60 bg-[#111625] p-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Growth velocity</span>
                    <span className="font-semibold text-lime-400">
                      +312% boost
                    </span>
                  </div>

                  <svg
                    className="mt-4 h-auto w-full"
                    viewBox="0 0 400 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Line chart showing ranking growth over 90 days"
                  >
                    <defs>
                      <linearGradient id="portArea" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#A3E635"
                          stopOpacity="0.28"
                        />
                        <stop
                          offset="100%"
                          stopColor="#A3E635"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    {[45, 90, 135].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        x2="400"
                        y1={y}
                        y2={y}
                        stroke="#334155"
                        strokeWidth="1"
                        strokeDasharray="4 6"
                      />
                    ))}
                    <path
                      d="M 10 150 Q 80 140 140 105 T 260 65 L 350 30 L 350 180 L 10 180 Z"
                      fill="url(#portArea)"
                      className="port-area"
                    />
                    <path
                      className="port-line"
                      pathLength={1}
                      d="M 10 150 Q 80 140 140 105 T 260 65 L 350 30"
                      stroke="#A3E635"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="350"
                      cy="30"
                      r="9"
                      fill="#A3E635"
                      className="animate-ping opacity-60 motion-reduce:animate-none"
                    />
                    <circle cx="350" cy="30" r="6" fill="#A3E635" />
                  </svg>

                  <p className="mt-3 border-t border-slate-700/70 pt-3 text-center text-xs text-slate-400">
                    Top 3 map-pack ranking achieved in 90 days
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* Project cards */}
          {filteredProjects.length > 0 ? (
            <div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {filteredProjects.map((project, i) => {
                const t = tones[project.tone];
                const Icon = project.icon;
                return (
                  <article
                    key={project.id}
                    className="port-rise group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-lime-500"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    {/* Header block */}
                    <div
                      className={`relative flex h-48 items-center justify-center overflow-hidden ${t.bg}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -right-10 -top-10 h-44 w-44 rounded-full border-2 ${t.ring}`}
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-16 -left-12 h-52 w-52 rounded-full border-2 ${t.ring}`}
                      />
                      <span
                        className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold ${t.chip}`}
                      >
                        {project.categoryLabel}
                      </span>
                      <span
                        className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${t.icon}`}
                      >
                        <Icon
                          className="h-8 w-8"
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-950">
                          {project.client}
                        </span>
                        <span className="rounded-full bg-lime-100 px-2.5 py-0.5 text-xs font-medium text-lime-900">
                          {project.subCategory}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {project.description}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-5 sm:px-8">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400">
                        <Check
                          className="h-3.5 w-3.5 text-slate-950"
                          strokeWidth={3.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {project.outcome}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold tracking-tight">
                No {activeCategory.toLowerCase()} projects yet
              </p>
              <p className="mt-2 text-sm text-slate-600">
                We're adding new work soon. Try another category to see what
                we've built.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-6 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-slate-950 cursor-pointer"
              >
                Show all projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Clients */}
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
          style={{
            background:
              "radial-gradient(60% 100% at 15% 100%, rgba(190,242,100,0.45), transparent 70%), radial-gradient(55% 90% at 55% 110%, rgba(125,211,252,0.30), transparent 70%), radial-gradient(50% 90% at 95% 100%, rgba(253,224,71,0.30), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight">
            Trusted by{" "}
            <span className="port-serif font-normal italic">
              industry leaders
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="flex items-center justify-center px-6 py-10 border-b sm:border-b-0 sm:border-r border-slate-200 transition-colors hover:bg-lime-50">
              <span className="font-mono text-xl font-black uppercase tracking-tighter text-slate-700">
                Hotel 26
              </span>
            </div>
            <div className="flex items-center justify-center px-6 py-10 border-b sm:border-b-0 sm:border-r border-slate-200 transition-colors hover:bg-lime-50">
              <span className="text-base font-extrabold tracking-tight text-slate-950">
                Pickars Logistics
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5 px-6 py-10 transition-colors hover:bg-lime-50">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111625] text-lime-400">
                <Dumbbell className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-base font-extrabold tracking-tight text-slate-800">
                Greensteel Limited
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#111625] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 70% at 50% 0%, rgba(163,230,53,0.14), transparent 70%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Want{" "}
            <span className="port-serif font-normal italic text-lime-400">
              results like these?
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300 max-w-md mx-auto">
            Start with a free SEO audit, or tell us what you're looking to
            build.
          </p>

          <button
            onClick={onOpenModal}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-lime-400 pl-7 pr-2 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-lime-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 cursor-pointer"
          >
            Get in touch
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-lime-400">
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');

.port .port-serif {
  font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  font-size: 1.08em;
  letter-spacing: -0.01em;
}

@keyframes port-rise { from { opacity: 0; transform: translateY(28px); } }
@keyframes port-draw { from { stroke-dashoffset: 1; } }
@keyframes port-fade { from { opacity: 0; } }

.port .port-rise { animation: port-rise 0.9s cubic-bezier(.2,.7,.2,1) backwards; }
.port .port-line { stroke-dasharray: 1; animation: port-draw 1.8s ease-out 0.5s backwards; }
.port .port-area { animation: port-fade 1.8s ease-out 0.9s backwards; }

@media (prefers-reduced-motion: reduce) {
  .port .port-rise, .port .port-line, .port .port-area { animation: none; }
  .port article { transition: none; }
}
`;
