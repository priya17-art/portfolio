import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Database, Brain, Code, Cpu } from "lucide-react";
import profileImg from "../assets/abarna.jpg";

export default function Hero() {
  const words = ["Data Science Student", "Full Stack Developer", "UI/UX Explorer", "Problem Solver"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      className="min-h-svh w-full flex items-center justify-center pt-24 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        {/* Left Column: Details & Copy */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Header Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neonPurple/10 border border-neonPurple/20 text-neonPurple dark:text-purple-300 font-mono text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-neonPink animate-pulse" />
            Open for Opportunities
          </motion.div>

          {/* Name & Intro */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none"
          >
            Hi, I'm <br className="hidden sm:inline" />
            <span className="text-gradient bg-gradient-to-r from-neonPurple via-neonPink to-neonCyan text-glow-purple">
              S. Kavi Priya
            </span>
          </motion.h1>

          {/* Typing Role Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center mt-4 mb-6 font-space text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300"
          >
            I am a&nbsp;
            <span className="text-neonCyan border-r-2 border-neonCyan animate-pulse pr-1">
              {words[index].substring(0, subIndex)}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-10"
          >
            Pursuing **B.Sc Data Science at American College, Tamil Nadu**. An aspiring data scientist and full stack web developer bridging code and data analytics to design intelligent, modern software.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-space text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-neonPurple to-neonCyan shadow-lg shadow-neonPurple/25 hover:shadow-neonPurple/40 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Contact Me <Mail size={16} />
            </a>
            
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-space text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/10 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Download Resume <Download size={16} />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Interactive Profile Art */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          {/* Floating tech icons around profile */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-darkCard border border-neonPurple/30 flex items-center justify-center text-neonPurple shadow-lg z-20 backdrop-blur-md"
          >
            <Brain size={22} className="text-glow-purple" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 -right-4 w-12 h-12 rounded-xl bg-darkCard border border-neonCyan/30 flex items-center justify-center text-neonCyan shadow-lg z-20 backdrop-blur-md"
          >
            <Database size={22} className="text-glow-cyan" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-6 left-6 w-12 h-12 rounded-xl bg-darkCard border border-neonPink/30 flex items-center justify-center text-neonPink shadow-lg z-20 backdrop-blur-md"
          >
            <Code size={22} />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-20 -right-6 w-10 h-10 rounded-lg bg-darkCard border border-neonBlue/30 flex items-center justify-center text-neonBlue shadow-lg z-20 backdrop-blur-md"
          >
            <Cpu size={18} />
          </motion.div>

          {/* Core Spinning Ring System & Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full flex items-center justify-center"
          >
            {/* Spinning Neon Gradient Border */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow bg-gradient-to-r from-neonPurple via-neonPink to-neonCyan p-[3px] shadow-2xl shadow-neonPurple/20">
              <div className="w-full h-full rounded-full bg-slate-950" />
            </div>

            {/* Counter-spinning Dashed Outer Ring */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-neonCyan/40 animate-spin-reverse" />
            
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-neonPurple/30 to-neonCyan/30 blur-2xl -z-10" />

            {/* Profile Image container */}
            <div className="w-[260px] h-[260px] sm:w-[325px] sm:h-[325px] rounded-full overflow-hidden border border-white/10 bg-slate-900 z-10 flex items-center justify-center">
              <img 
                src={profileImg} 
                alt="S. Kavi Priya profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
