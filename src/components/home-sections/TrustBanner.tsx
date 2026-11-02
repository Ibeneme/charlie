import { Asterisk } from "lucide-react";

const cities = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Enugu",
  "International",
];

// Repeat the list so one group is always wider than the screen.
const group = [...cities, ...cities];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="trust-group flex shrink-0 items-center"
    >
      {group.map((city, i) => (
        <li key={`${city}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-8 sm:px-12 text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight text-slate-950">
            {city}
          </span>
          <Asterisk
            className="trust-spin h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-slate-950"
            strokeWidth={3}
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );
}

export default function TrustBanner() {
  return (
    <section
      aria-label="Trusted by businesses in Lagos, Abuja, Port Harcourt, Kano, Enugu and internationally"
      className="trust relative overflow-hidden bg-lime-400 py-5 sm:py-6 font-sans"
    >
      <style>{css}</style>

      <div className="trust-track flex w-max">
        <Group />
        <Group hidden />
      </div>

      {/* Soft edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-lime-400 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-lime-400 to-transparent"
      />
    </section>
  );
}

const css = `
@keyframes trust-scroll { to { transform: translateX(-50%); } }
@keyframes trust-spin   { to { transform: rotate(360deg); } }

.trust .trust-track { animation: trust-scroll 32s linear infinite; }
.trust:hover .trust-track { animation-play-state: paused; }
.trust .trust-spin  { animation: trust-spin 6s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .trust .trust-track, .trust .trust-spin { animation: none; }
  .trust .trust-track { overflow-x: auto; }
}
`;
