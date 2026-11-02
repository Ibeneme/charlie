import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to see results from SEO?",
    answer:
      "Most local businesses start seeing noticeable improvements in their Google rankings and visibility within 60 to 90 days, depending on your current online presence and competition level.",
  },
  {
    question: "Do you offer one-time projects or monthly retainers?",
    answer:
      "We primarily offer monthly retainers for SEO to ensure steady, long-term ranking growth, but we also handle one-time custom software and web development projects.",
  },
  {
    question: "Can you help redesign my website and optimize it for SEO?",
    answer:
      "Yes! Because we combine SEO strategy and software development under one roof, we can redesign your website to look great, load fast, and rank higher on Google simultaneously.",
  },
  {
    question: "Do you guarantee #1 rankings on Google?",
    answer:
      "No reputable agency can ethically guarantee a #1 ranking because Google's algorithm changes constantly. However, we guarantee proven optimization frameworks that significantly boost your visibility and bring you more calls and customers.",
  },
  {
    question: "Do I need to already have a website before working with you?",
    answer:
      "Not at all. If you don't have a website yet, our development team can build one for you from scratch as part of your digital growth plan.",
  },
];

// Flips to true the first time the section scrolls into view.
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

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { ref, inView } = useInView<HTMLElement>();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section
      ref={ref}
      data-in={inView}
      className="faq animate-section relative overflow-hidden bg-[#111625] text-white"
    >
      <style>{css}</style>

      {/* Soft glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: headline */}
        <div className="faq-rise lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Frequently{" "}
            <span className="faq-serif font-normal italic text-lime-400">
              asked questions
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-300 max-w-sm">
            Quick answers about SEO, development and how we work together.
          </p>
        </div>

        {/* Right: accordion */}
        <div className="lg:col-span-7 lg:col-start-6 space-y-3">
          {faqs.map((faq, index) => {
            const open = openFaq === index;
            return (
              <div
                key={faq.question}
                className="faq-rise"
                style={{ transitionDelay: `${120 + index * 80}ms` }}
              >
                <div
                  className={`rounded-2xl border transition-colors duration-300 ${
                    open
                      ? "bg-[#1a2032] border-lime-400/40"
                      : "bg-[#1a2032]/60 border-slate-700/60 hover:border-slate-600"
                  }`}
                >
                  <h3>
                    <button
                      onClick={() => toggleFaq(index)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                      className="flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 sm:px-6 text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                    >
                      <span className="text-base sm:text-lg font-semibold tracking-tight">
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          open
                            ? "rotate-45 bg-lime-400 text-slate-950"
                            : "bg-slate-700/60 text-white"
                        }`}
                      >
                        <Plus
                          className="h-4 w-4"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    data-open={open}
                    className="faq-panel"
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-6 sm:px-6 text-sm sm:text-base leading-relaxed text-slate-300 max-w-2xl">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');

.faq .faq-serif {
  font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  font-size: 1.08em;
  letter-spacing: -0.01em;
}

.faq .faq-rise {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1);
}
.faq[data-in="true"] .faq-rise { opacity: 1; transform: none; }

/* Smooth open/close without measuring heights */
.faq .faq-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(.4,0,.2,1);
}
.faq .faq-panel[data-open="true"] { grid-template-rows: 1fr; }

@media (prefers-reduced-motion: reduce) {
  .faq .faq-rise { opacity: 1; transform: none; transition: none; }
  .faq .faq-panel { transition: none; }
}
`;
