"use client";

import { useEffect, useState } from "react";
import { Check, Mail } from "lucide-react";

const toc = [
  { id: "introduction", title: "Introduction" },
  { id: "about-us", title: "About Us" },
  { id: "services", title: "Services" },
  { id: "no-guarantee", title: "No Guarantee Clause" },
  { id: "client-responsibilities", title: "Client Responsibilities" },
  { id: "payment-terms", title: "Payment Terms" },
  { id: "confidentiality", title: "Confidentiality" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "ethical-standards", title: "Ethical Standards" },
  { id: "termination", title: "Termination" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "governing-law", title: "Governing Law" },
  { id: "updates", title: "Updates To These Terms" },
];

/* ---------- small building blocks ---------- */

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-slate-200 pt-10 first:border-t-0 first:pt-0"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-100 text-sm font-bold text-lime-900">
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          {title}
        </h2>
      </div>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-slate-700">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400">
            <Check
              className="h-3 w-3 text-slate-950"
              strokeWidth={3.5}
              aria-hidden="true"
            />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- page ---------- */

export default function TermsAndConditions() {
  const [active, setActive] = useState(toc[0].id);

  // Highlight the section currently being read.
  useEffect(() => {
    const els = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null);

    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    e.currentTarget.closest("details")?.removeAttribute("open");
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  return (
    <main className="legal w-full min-h-screen bg-white text-slate-950 font-sans">
      <style>{css}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111625] text-white px-4 sm:px-6 md:px-12 pt-36 pb-14 md:pt-44 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 70% at 8% 0%, rgba(163,230,53,0.16), transparent 70%), radial-gradient(40% 60% at 95% 100%, rgba(56,189,248,0.10), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <p
            className="legal-rise inline-flex items-center gap-2 text-sm font-medium text-slate-300"
            style={{ animationDelay: "0ms" }}
          >
            <span
              className="h-2 w-2 rounded-full bg-lime-400"
              aria-hidden="true"
            />
            PortDigitalBoost
          </p>
          <h1
            className="legal-rise mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            style={{ animationDelay: "100ms" }}
          >
            Terms &{" "}
            <span className="legal-serif font-normal italic text-lime-400">
              Conditions
            </span>
          </h1>
          <p
            className="legal-rise mt-6 inline-block rounded-full border border-slate-600 px-4 py-1.5 text-sm text-slate-300"
            style={{ animationDelay: "220ms" }}
          >
            Effective date: July 2026
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Contents */}
        <aside className="lg:col-span-4">
          {/* Mobile: collapsible */}
          <details className="lg:hidden rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <summary className="cursor-pointer text-sm font-semibold">
              On this page
            </summary>
            <ul className="mt-4 space-y-1">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    onClick={(e) => goTo(e, t.id)}
                    className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-white"
                  >
                    {i + 1}. {t.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {/* Desktop: sticky */}
          <nav aria-label="Contents" className="hidden lg:block sticky top-28">
            <p className="text-sm font-semibold">On this page</p>
            <ul className="mt-4 border-l border-slate-200">
              {toc.map((t, i) => {
                const isActive = active === t.id;
                return (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      onClick={(e) => goTo(e, t.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`-ml-px block border-l-2 py-2 pl-4 text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500 ${
                        isActive
                          ? "border-lime-500 font-semibold text-slate-950"
                          : "border-transparent text-slate-500 hover:text-slate-950"
                      }`}
                    >
                      {i + 1}. {t.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Terms Content */}
        <article className="lg:col-span-8 max-w-2xl space-y-10">
          <Section id="introduction" number={1} title="Introduction">
            <p>
              Welcome to PortDigitalBoost. These terms & conditions govern your
              use of our website and the services we provide. By accessing our
              site or engaging our services, you agree to these terms.
            </p>
          </Section>

          <Section id="about-us" number={2} title="About Us">
            <p>
              PortDigitalBoost is a digital solutions agency offering SEO and
              software development services. We are registered in Nigeria.
            </p>
          </Section>

          <Section id="services" number={3} title="Services">
            <p>We provide:</p>
            <CheckList
              items={[
                "Search Engine Optimization services",
                "Software development services (web apps, mobile apps, custom software)",
                "Consulting and advisory services",
              ]}
            />
          </Section>

          <Section id="no-guarantee" number={4} title="No Guarantee Clause">
            <p className="font-medium text-slate-900">Important:</p>
            <p>
              PortDigitalBoost does not guarantee specific search engine
              rankings, traffic levels, or revenue outcomes. Search engine
              algorithms are proprietary, constantly changing, and controlled by
              third parties. We use professional best practices but cannot
              control or predict search engine behavior.
            </p>
          </Section>

          <Section
            id="client-responsibilities"
            number={5}
            title="Client Responsibilities"
          >
            <p>When you engage our services, you agree to:</p>
            <CheckList
              items={[
                "Provide timely access to your website, analytics, and necessary assets.",
                "Respond to recommendations within a reasonable timeframe.",
                "Ensure you have the right to grant us access to your systems.",
              ]}
            />
          </Section>

          <Section id="payment-terms" number={6} title="Payment Terms">
            <CheckList
              items={[
                "Services are billed monthly in advance unless otherwise agreed.",
                "Invoices are due within [7] days of receipt.",
                "Late payments may incur interest at [5%] per month.",
              ]}
            />
          </Section>

          <Section id="confidentiality" number={7} title="Confidentiality">
            <p>Both parties agree to keep confidential:</p>
            <CheckList
              items={[
                "Business strategies and performance data.",
                "Client financial information.",
                "Internal methods and processes.",
              ]}
            />
          </Section>

          <Section
            id="intellectual-property"
            number={8}
            title="Intellectual Property"
          >
            <p>
              All works delivered to you (reports, strategies, content) remain
              yours upon full payment.
            </p>
            <p>
              We retain the right to reference our work with you in our
              portfolio, subject to confidentiality.
            </p>
          </Section>

          <Section id="ethical-standards" number={9} title="Ethical Standards">
            <p>
              We use only white-hat SEO techniques that comply with
              Google&apos;s guidelines. We do not:
            </p>
            <CheckList
              items={[
                "Purchase links from link farms.",
                "Use doorway pages or cloaking.",
                "Generate spam content at scale.",
              ]}
            />
          </Section>

          <Section id="termination" number={10} title="Termination">
            <CheckList
              items={[
                "Either party may terminate with [30] days written notice.",
                "Upon termination, all completed work paid for remains yours.",
                "Outstanding invoices must be settled before transition.",
              ]}
            />
          </Section>

          <Section
            id="limitation-of-liability"
            number={11}
            title="Limitation of Liability"
          >
            <p>
              To the fullest extent permitted by law, PortDigitalBoost shall not
              be liable for any indirect, incidental, or consequential damages
              arising from the use of our services, including loss of revenue,
              profits, or data.
            </p>
          </Section>

          <Section id="governing-law" number={12} title="Governing Law">
            <p>
              These terms are governed by the laws of the Federal Republic of
              Nigeria. Any disputes shall be resolved in the courts of Rivers
              State.
            </p>
          </Section>

          <Section id="updates" number={13} title="Updates To These Terms">
            <p>
              We may update these terms from time to time. The latest version
              will always be posted on this page with the effective date.
            </p>
            <div className="rounded-3xl bg-[#111625] p-6 sm:p-8 text-white mt-6">
              <p className="text-slate-300">
                For any questions regarding these terms, email us at
              </p>
              <a
                href="mailto:hello@portdigitalboost.com"
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                hello@portdigitalboost.com
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Effective Date: July 2026
            </p>
          </Section>
        </article>
      </div>
    </main>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');

.legal .legal-serif {
  font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  font-size: 1.08em;
  letter-spacing: -0.01em;
}

@keyframes legal-rise { from { opacity: 0; transform: translateY(28px); } }
.legal .legal-rise { animation: legal-rise 0.9s cubic-bezier(.2,.7,.2,1) backwards; }

.legal details summary::-webkit-details-marker { display: none; }

@media (prefers-reduced-motion: reduce) {
  .legal .legal-rise { animation: none; }
  html { scroll-behavior: auto; }
}
`;
