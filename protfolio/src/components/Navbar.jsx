import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Background opacity change
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-darkBg/75 dark:bg-darkBg/75 border-b border-white/5 shadow-lg shadow-black/20 glass-card"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-neonPurple via-neonPink to-neonCyan transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-neonPurple to-neonCyan flex items-center justify-center text-white font-space font-bold text-lg shadow-md shadow-neonPurple/20">
            K
          </div>
          <span className="font-space font-bold text-xl tracking-wider text-slate-800 dark:text-white transition-colors">
            Kavi<span className="text-neonCyan group-hover:text-neonPink transition-colors">Priya</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neonCyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-neonCyan dark:hover:text-neonCyan transition-all border border-slate-200/50 dark:border-white/5 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-space text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-neonPurple to-neonCyan shadow-md shadow-neonPurple/25 hover:shadow-neonPurple/40 hover:-translate-y-0.5 transition-all"
          >
            <Sparkles size={12} />
            Hire Me
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200/50 dark:border-white/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-50/95 dark:bg-[#060329]/95 border-b border-slate-200 dark:border-white/5 glass-card"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg font-space font-medium text-slate-700 dark:text-slate-300 hover:text-neonCyan dark:hover:text-neonCyan transition-colors py-1 border-b border-slate-200/40 dark:border-white/5"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="w-full text-center py-3 rounded-xl font-space font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-neonPurple to-neonCyan mt-2"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
