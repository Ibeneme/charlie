import { useEffect, useState } from "react";
import { Check, Mail } from "lucide-react";

const toc = [
  { id: "who-we-are", title: "Who We Are" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "data-storage", title: "Data storage" },
  { id: "data-sharing", title: "Data Sharing" },
  { id: "cookies", title: "Cookies" },
  { id: "your-rights", title: "Your Rights" },
  { id: "data-security", title: "Data security" },
  { id: "third-party-links", title: "Third-Party Links" },
  { id: "updates", title: "Updates To This Policy" },
  { id: "contact", title: "Contact Us" },
];

const collected = [
  {
    method: "Contact Form",
    what: "Name, email address, phone number, message content (sent via email)",
  },
  { method: "Email", what: "When you email us directly" },
  {
    method: "Web Analytics",
    what: "IP address, browser type, pages visited (via google analytics or similar)",
  },
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

export default function PrivacyPolicy() {
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
            Privacy{" "}
            <span className="legal-serif font-normal italic text-lime-400">
              Policy
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

        {/* Policy */}
        <article className="lg:col-span-8 max-w-2xl space-y-10">
          <Section id="who-we-are" number={1} title="Who We Are">
            <p>
              PortDigitalBoost is a digital solutions agency based in Nigeria.
              This Privacy Policy explains how we handle information when you
              visit our page or contact us.
            </p>
          </Section>

          <Section
            id="information-we-collect"
            number={2}
            title="Information We Collect"
          >
            <p>
              Because we do not have a backend database, we collect information
              when you actively provide it.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-950">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Method
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      What We Collect
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {collected.map((row) => (
                    <tr key={row.method} className="align-top">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-5 py-4 font-medium text-slate-900"
                      >
                        {row.method}
                      </th>
                      <td className="px-5 py-4 text-slate-600">{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section
            id="how-we-use"
            number={3}
            title="How We Use Your Information"
          >
            <CheckList
              items={[
                "To respond to your enquiries",
                "To provide the services you requested",
                "To improve our landing page and user experience",
                "To send updates or promotional offers (only with your consent)",
              ]}
            />
          </Section>

          <Section id="data-storage" number={4} title="Data storage">
            <p>
              Since we do not have a database, your data is not stored in our
              website. Contact form submission are sent directly to
              hello@portdigitalboost.com and stored in our email system (Zoho
              Mail). We do not store your data elsewhere unless you become a
              client.
            </p>
          </Section>

          <Section id="data-sharing" number={5} title="Data Sharing">
            <p>We do not sell or rent your personal data.</p>
            <p className="font-medium text-slate-900">We may share with:</p>
            <CheckList
              items={[
                "Trusted service providers (hosting, email platform, analytics) under confidentiality",
                "Legal authorities if required by law",
              ]}
            />
          </Section>

          <Section id="cookies" number={6} title="Cookies">
            <p>
              Our landing page may use minimal cookies for analytics. You can
              disable cookies in your browser settings.
            </p>
          </Section>

          <Section id="your-rights" number={7} title="Your Rights">
            <p>
              Under the Nigerian Data Protection Act (NDPA) 2023, you have the
              right to:
            </p>
            <CheckList
              items={[
                "Access your personal data we hold",
                "Request correction or deletion",
                "Withdraw consent at anytime",
                "Lodge a complaint with the Nigerian Data Protection Commission",
              ]}
            />
          </Section>

          <Section id="data-security" number={8} title="Data security">
            <p>
              We use reasonable measures to protect your information, including
              secure mail hosting and limited access to your data.
            </p>
          </Section>

          <Section id="third-party-links" number={9} title="Third-Party Links">
            <p>
              Our landing page may contain links to external sites. We are not
              responsible for their privacy practices.
            </p>
          </Section>

          <Section id="updates" number={10} title="Updates To This Policy">
            <p>
              We may update this policy occasionally. The latest version will
              always be posted here with effective date.
            </p>
          </Section>

          <Section id="contact" number={11} title="Contact Us">
            <div className="rounded-3xl bg-[#111625] p-6 sm:p-8 text-white">
              <p className="text-slate-300">
                For any privacy questions, email us at
              </p>
              <a
                href="mailto:hello@portdigitalboost.com"
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                hello@portdigitalboost.com
              </a>
            </div>
            <p className="text-sm text-slate-500">Effective Date: July 2026</p>
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
