import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import TrustBanner from "../components/home-sections/TrustBanner";
import Services from "../components/home-sections/Services";
import WhyChooseUs from "../components/home-sections/WhyChooseUs";
import Pricing from "../components/home-sections/Pricing";
import Testimonials from "../components/home-sections/Testimonials";
import FAQ from "../components/home-sections/FAQ";
import ContactModal from "../components/home-sections/ContactModal";
import Hero from "../components/home-sections/Hero";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Handle hash scroll if redirected from another page
    if (window.location.hash === "#services") {
      setTimeout(() => {
        const servicesEl = document.getElementById("services");
        if (servicesEl) {
          servicesEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

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

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <main
      ref={mainRef}
      className="w-full bg-[#fbf9f5] text-slate-900 overflow-hidden relative"
    >
      <Hero onOpenModal={handleOpenModal} />
      <TrustBanner />
      <Services onOpenModal={handleOpenModal} />
      <WhyChooseUs />
      <Testimonials />
      <Pricing onOpenModal={handleOpenModal} />

      <FAQ />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}