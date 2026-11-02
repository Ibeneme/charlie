import  { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AboutPage from "./pages/about";
import BlogPage from "./pages/blog";
import HomePage from "./pages/home";
import EditorialPortfolioSection from "./pages/portfolio";
import PrivacyPolicy from "./pages/privacy";
import TermsAndConditions from "./pages/terms";
import "./index.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

// ScrollToTop component to reset window scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}



export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="w-full min-h-screen bg-[#fbf9f4] text-slate-900 font-sans flex flex-col justify-between relative">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<EditorialPortfolioSection />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
        {/* <ScrollToTopButton /> */}
      </div>
    </BrowserRouter>
  );
}
