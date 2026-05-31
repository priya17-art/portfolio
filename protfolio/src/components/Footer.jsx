import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Linkedin, href: "https://linkedin.com", color: "hover:text-neonBlue hover:border-neonBlue/50" },
    { Icon: Github, href: "https://github.com", color: "hover:text-white hover:border-white/50" },
    { Icon: Instagram, href: "https://instagram.com", color: "hover:text-neonPink hover:border-neonPink/50" },
    { Icon: Mail, href: "mailto:kavipriya.ds@gmail.com", color: "hover:text-neonCyan hover:border-neonCyan/50" },
  ];

  const handleScrollTop = (e) => {
    e.preventDefault();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-white/5 py-12 px-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[150px] bg-neonPurple/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-neonPurple to-neonCyan flex items-center justify-center text-white font-space font-bold text-sm">
              K
            </div>
            <span className="font-space font-bold text-lg text-white tracking-wider">
              Kavi<span className="text-neonCyan">Priya</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            B.Sc Data Science & Full Stack Developer
          </p>
        </div>

        {/* Center: Copyright */}
        <div className="text-xs text-slate-500 text-center md:order-last">
          &copy; {currentYear} S. Kavi Priya. All rights reserved. 
          <span className="block mt-1 md:inline md:mt-0 md:ml-1">
            Crafted with <span className="text-neonPink">♥</span> and React.
          </span>
        </div>

        {/* Right: Social Media links */}
        <div className="flex items-center gap-3">
          {socialLinks.map(({ Icon, href, color }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 transition-all bg-white/[0.02] cursor-pointer ${color}`}
            >
              <Icon size={16} />
            </a>
          ))}
          
          <button
            onClick={handleScrollTop}
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-neonCyan hover:border-neonCyan/50 transition-all bg-white/[0.02] cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
