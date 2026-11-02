
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";

interface HeroProps {
  onOpenModal: (e: React.MouseEvent) => void;
}

const tags = [
  {
    label: "Technical SEO",
    style: "bg-lime-400 text-slate-950 border-lime-400 -rotate-2",
  },
  {
    label: "Web Development",
    style: "bg-transparent text-white border-slate-500 rotate-1",
  },
  {
    label: "Custom Software",
    style: "bg-lime-400 text-slate-950 border-lime-400 rotate-2",
  },
  {
    label: "SEO Audits",
    style: "bg-transparent text-white border-slate-500 -rotate-1",
  },
  {
    label: "Link Building",
    style: "bg-transparent text-white border-slate-500 rotate-3",
  },
  {
    label: "Content Strategy",
    style: "bg-lime-400 text-slate-950 border-lime-400 -rotate-1",
  },
];

const headlineWords = ["We", "drive", "growth", "to", "your", "business"];


// Card with a cursor-following spotlight and a lift on hover.
function SpotCard({
  className = "",
  delay = 0,
  glow = "rgba(163,230,53,0.16)",
  children,
}: {
  className?: string;
  delay?: number;
  glow?: string;
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
      style={{ animationDelay: `${delay}ms` }}
      className={`hero-rise group relative overflow-hidden rounded-3xl transition-transform duration-500 ease-out hover:-translate-y-1.5 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"
        style={{
          background: `radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), ${glow}, transparent 60%)`,
        }}
      />
      <div className="relative h-full flex flex-col">{children}</div>
    </div>
  );
}

/* ---------- component ---------- */

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="hero relative overflow-hidden bg-[#111625] text-white px-4 sm:px-6 md:px-12 pt-32 pb-16 md:pt-48 md:pb-24">
      <style>{css}</style>

      {/* Drifting background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-orb-a absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-[90%] rounded-full bg-lime-400/15 blur-3xl" />
        <div className="hero-orb-b absolute top-40 left-1/2 h-[26rem] w-[26rem] translate-x-[10%] rounded-full bg-sky-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 50% 0%, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 0%, black 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Centered headline block */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05]">
            {headlineWords.map((w, i) => (
              <span
                key={w + i}
                className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.22em]"
              >
                <span
                  className="hero-word inline-block"
                  style={{ animationDelay: `${150 + i * 90}ms` }}
                >
                  {w}
                </span>
              </span>
            ))}
            <TrendingUp
              className="hero-draw inline-block w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ml-1 align-middle text-lime-400"
              aria-hidden="true"
              style={{ animationDelay: "850ms" }}
            />
          </h1>

          <p
            className="hero-rise mt-6 text-sm sm:text-base leading-relaxed text-slate-300 max-w-md mx-auto"
            style={{ animationDelay: "750ms" }}
          >
            Elevate visibility, engineer software and accelerate growth.
            Strategic SEO meets custom software engineering.
          </p>

          <div
            className="hero-rise mt-8 inline-block relative"
            style={{ animationDelay: "900ms" }}
          >
            <span
              aria-hidden="true"
              className="hero-ring absolute inset-0 rounded-full border border-lime-400/60"
            />
            <button
              onClick={onOpenModal}
              className="group relative overflow-hidden inline-flex items-center gap-3 rounded-full bg-lime-400 pl-6 pr-2 py-2 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_40px_rgba(163,230,53,0.45)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="hero-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-white/40"
              />
              <span className="relative">Request free SEO audit</span>
              <span className="relative w-8 h-8 rounded-full bg-slate-950 text-lime-400 flex items-center justify-center overflow-hidden">
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-5 group-hover:-translate-y-5"
                  aria-hidden="true"
                />
                <ArrowUpRight
                  className="w-4 h-4 absolute -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Bento grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Services */}
          <SpotCard
            delay={1000}
            className="bg-[#1a2032] border border-slate-700/60 p-6 sm:p-7 md:row-span-2"
          >
            <h2 className="text-lg font-semibold">Services</h2>
            <div className="mt-8 flex flex-wrap gap-2.5 content-end flex-1">
              {tags.map((t, i) => (
                <span
                  key={t.label}
                  className={`hero-pop inline-block ${t.style
                    .split(" ")
                    .filter((c) => c.includes("rotate"))
                    .join(" ")}`}
                  style={{ animationDelay: `${1250 + i * 90}ms` }}
                >
                  <span
                    className={`hero-float inline-block rounded-full border px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-transform duration-300 hover:scale-110 ${t.style
                      .split(" ")
                      .filter((c) => !c.includes("rotate"))
                      .join(" ")}`}
                    style={{
                      animationDuration: `${3.6 + (i % 3) * 0.8}s`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    {t.label}
                  </span>
                </span>
              ))}
            </div>
          </SpotCard>

          {/* Combined Image + Top 3 Card */}
          <SpotCard
            delay={1100}
            glow="rgba(163,230,53,0.3)"
            className="bg-[#1a2032] border border-slate-700/60 p-0 overflow-hidden md:row-span-2 flex flex-col"
          >
            <div className="relative h-48 sm:h-56 w-full group/img overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="Data-driven impact dashboard"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2032] via-[#1a2032]/30 to-transparent" />
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-lime-400">
                  Top 3
                </p>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Ranking framework we use to push your pages up the results
                  with data-driven impact.
                </p>
              </div>
            </div>
          </SpotCard>

          {/* Testimonial */}
          <SpotCard
            delay={1200}
            className="bg-[#1a2032] border border-slate-700/60 p-6 sm:p-7 md:row-span-2"
          >
            <Sparkles
              className="hero-spin w-6 h-6 text-lime-400"
              aria-hidden="true"
            />
            <p className="mt-6 text-lg sm:text-xl font-semibold leading-snug">
              The final product exceeded my expectations.
            </p>
            <p className="mt-4 text-lg sm:text-xl font-semibold leading-snug">
              Impressed with the results!
            </p>
            <div className="mt-auto pt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["AO", "CE", "TM"].map((i, idx) => (
                  <span
                    key={i}
                    className="hero-pop w-9 h-9 rounded-full bg-slate-700 border-2 border-[#1a2032] text-[11px] font-semibold flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:z-10"
                    style={{ animationDelay: `${1700 + idx * 120}ms` }}
                  >
                    {i}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400">Client feedback</p>
            </div>
          </SpotCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- animation styles ---------- */

const css = `
@keyframes hero-rise   { from { opacity: 0; transform: translateY(28px); } }
@keyframes hero-word   { from { transform: translateY(115%); } }
@keyframes hero-pop    { from { opacity: 0; transform: scale(0.5); } 60% { transform: scale(1.08); } }
@keyframes hero-float  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes hero-draw   { from { stroke-dashoffset: 40; opacity: 0; } 10% { opacity: 1; } to { stroke-dashoffset: 0; } }
@keyframes hero-shimmer{ 0%, 60% { transform: translateX(0); } 100% { transform: translateX(520%); } }
@keyframes hero-ring   { 0% { transform: scale(1); opacity: 0.7; } 70%,100% { transform: scale(1.35, 1.9); opacity: 0; } }
@keyframes hero-spin   { to { transform: rotate(360deg); } }
@keyframes hero-orb-a  { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px, 30px); } }
@keyframes hero-orb-b  { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px, 20px); } }

.hero .hero-rise  { animation: hero-rise 0.9s cubic-bezier(.2,.7,.2,1) backwards; }
.hero .hero-word  { animation: hero-word 0.9s cubic-bezier(.2,.8,.2,1) backwards; }
.hero .hero-pop   { animation: hero-pop 0.7s cubic-bezier(.3,1.4,.5,1) backwards; }
.hero .hero-float { animation: hero-float 4s ease-in-out infinite; }
.hero .hero-draw path { stroke-dasharray: 40; animation: hero-draw 1.1s ease-out backwards; animation-delay: inherit; }
.hero .hero-shimmer { animation: hero-shimmer 3.8s ease-in-out 2s infinite; }
.hero .hero-ring  { animation: hero-ring 2.8s ease-out 2s infinite; }
.hero .hero-spin  { animation: hero-spin 9s linear infinite; }
.hero .hero-orb-a { animation: hero-orb-a 14s ease-in-out infinite; }
.hero .hero-orb-b { animation: hero-orb-b 18s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .hero *, .hero *::before, .hero *::after { animation: none !important; transition: none !important; }
}
`;
