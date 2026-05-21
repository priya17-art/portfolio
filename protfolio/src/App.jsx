import { useState, useEffect, useRef } from "react";
import abarnaImg from "./assets/hero.png";

import {
    Menu, X, Moon, Sun, Github, Linkedin, Twitter, Mail,
    Phone, MapPin, ExternalLink, Download, Code2, Palette,
    Server, Smartphone, Database, Globe, Star, ArrowRight,
    Zap, Coffee, Award, Users, Briefcase, ChevronDown, Quote,
    CheckCircle2, Sparkles
} from "lucide-react";

const TYPED = ["Full Stack Developer", "UI/UX Designer", "React Specialist", "Creative Coder"];

const SKILLS = [
    { name: "React / Next.js", level: 92, color: "#22d3ee" },
    { name: "TypeScript", level: 88, color: "#a78bfa" },
    { name: "Node.js / Express", level: 85, color: "#22d3ee" },
    { name: "UI/UX & Figma", level: 82, color: "#fb7185" },
    { name: "Python / Django", level: 76, color: "#a78bfa" },
    { name: "DevOps / Docker", level: 71, color: "#fb7185" },
];

const PROJECTS = [
    {
        title: "NexaCloud Dashboard",
        desc: "Real-time SaaS analytics with dynamic charts, user management, and role-based access control serving 50K+ users.",
        tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
        color: "#22d3ee", letter: "N",
    },
    {
        title: "Luminary E-Commerce",
        desc: "Full-featured store with AI-powered recommendations, Stripe payments, and live inventory management system.",
        tags: ["Next.js", "Stripe", "MongoDB", "Redis"],
        color: "#a78bfa", letter: "L",
    },
    {
        title: "QuantumChat",
        desc: "End-to-end encrypted real-time messaging with file sharing, voice notes, and peer-to-peer video calling.",
        tags: ["React", "Socket.io", "WebRTC", "Firebase"],
        color: "#fb7185", letter: "Q",
    },
    {
        title: "AetherUI Library",
        desc: "Open-source design system with 60+ accessible, animated components used by 800+ developers worldwide.",
        tags: ["React", "Storybook", "Radix UI", "Tailwind"],
        color: "#22d3ee", letter: "A",
    },
];

const SERVICES = [
    { Icon: Code2, title: "Web Development", desc: "High-performance web apps with modern frameworks, clean architecture, and pixel-perfect execution.", color: "#22d3ee" },
    { Icon: Palette, title: "UI/UX Design", desc: "Intuitive, beautiful interfaces grounded in user research, accessibility, and design systems thinking.", color: "#a78bfa" },
    { Icon: Server, title: "Backend Engineering", desc: "Scalable REST & GraphQL APIs, database design, and cloud infrastructure built for the long haul.", color: "#fb7185" },
    { Icon: Smartphone, title: "Mobile Development", desc: "Cross-platform apps with React Native that feel native, perform fast, and delight your users.", color: "#22d3ee" },
    { Icon: Database, title: "Database Architecture", desc: "Efficient, secure data models for complex domains — from schema design to query optimization.", color: "#a78bfa" },
    { Icon: Globe, title: "Performance & SEO", desc: "Sub-second load times, Core Web Vitals, and technical SEO that drives real organic growth.", color: "#fb7185" },
];

const EXPERIENCE = [
    { role: "Senior Frontend Engineer", company: "TechNova Inc.", period: "2022 – Present", desc: "Led UI architecture for flagship SaaS product with 50K+ users. Reduced JS bundle by 40% and improved LCP by 60%." },
    { role: "Full Stack Developer", company: "PixelForge Studio", period: "2020 – 2022", desc: "Built end-to-end features across 12+ client projects in fintech, healthcare, and e-commerce verticals." },
    { role: "React Developer", company: "StartupLab", period: "2019 – 2020", desc: "Developed company MVP solo in 3 months; the product went on to raise $2M in seed funding." },
    { role: "Frontend Developer Intern", company: "WebCraft Agency", period: "2018 – 2019", desc: "Delivered responsive landing pages and contributed to a design system used across 30+ client projects." },
];

const TESTIMONIALS = [
    { name: "Sarah Chen", role: "CTO at TechNova", text: "Alex is one of the most talented engineers I've ever worked with. Delivers pixel-perfect UI with exceptional backend performance — a true 10x engineer.", av: "SC", c: "#22d3ee" },
    { name: "Marcus Williams", role: "Product Lead at PixelForge", text: "Incredible ability to translate complex requirements into elegant, maintainable solutions. A full-stack maestro who genuinely cares about user experience.", av: "MW", c: "#a78bfa" },
    { name: "Priya Sharma", role: "Founder at StartupLab", text: "Alex built our entire MVP solo in under 3 months. Clean code, proactive communication, and a stunning final product. We wouldn't have raised without him.", av: "PS", c: "#fb7185" },
];

const NAV_LINKS = ["About", "Skills", "Services", "Projects", "Experience", "Contact"];

const CSS = (dark, accent, purple, coral, bg, surface, border, text, muted) => `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{background:${bg};color:${text};font-family:'Plus Jakarta Sans',system-ui,sans-serif;overflow-x:hidden;transition:background .35s,color .35s}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-track{background:${bg}}
  ::-webkit-scrollbar-thumb{background:${accent};border-radius:2px}
  @keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(4deg)}}
  @keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(-4deg)}}
  @keyframes floatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}
  @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes spinRingR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
  @keyframes blink{50%{opacity:0}}
  @keyframes shiftGrad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeLeft{from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:translateX(0)}}
  @keyframes fadeRight{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}}
  @keyframes pulseGlow{0%,100%{box-shadow:0 0 20px ${accent}40}50%{box-shadow:0 0 48px ${accent}80,0 0 90px ${accent}30}}
  @keyframes gridMove{from{background-position:0 0}to{background-position:60px 60px}}
  .grad-text{background:linear-gradient(135deg,${accent} 0%,${purple} 50%,${coral} 100%);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shiftGrad 5s ease infinite}
  .glass{background:${dark ? "rgba(15,20,40,0.72)" : "rgba(248,250,255,0.82)"};backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid ${border}}
  .card{background:${surface};border:1px solid ${border};border-radius:20px;padding:28px;transition:all .3s cubic-bezier(.4,0,.2,1)}
  .card:hover{border-color:${accent}50;transform:translateY(-6px);box-shadow:0 24px 48px ${accent}12}
  .btn-p{background:linear-gradient(135deg,${accent},${purple});color:${dark ? "#050a14" : "#fff"};border:none;padding:14px 30px;border-radius:50px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .3s;animation:pulseGlow 3s ease-in-out infinite;letter-spacing:.3px}
  .btn-p:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 20px 44px ${accent}50}
  .btn-o{background:transparent;color:${text};border:1px solid ${border};padding:13px 28px;border-radius:50px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .3s}
  .btn-o:hover{border-color:${accent};color:${accent};transform:translateY(-3px);box-shadow:0 10px 30px ${accent}25}
  .nav-link{color:${muted};font-size:14px;font-weight:500;cursor:pointer;transition:color .2s;position:relative;padding:4px 0;letter-spacing:.3px}
  .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:${accent};transition:width .3s;border-radius:2px}
  .nav-link:hover::after{width:100%}
  .nav-link:hover{color:${text}}
  .sec-label{font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:${accent};margin-bottom:14px;display:flex;align-items:center;gap:8px}
  .sec-label::before{content:'';display:block;width:24px;height:1.5px;background:${accent};border-radius:1px}
  .sec-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(30px,5vw,50px);font-weight:700;line-height:1.1;color:${text};margin-bottom:20px}
  .skill-bar{background:${border};border-radius:99px;height:5px;overflow:hidden;margin-top:8px}
  .skill-fill{height:100%;border-radius:99px;transition:width 1.6s cubic-bezier(.4,0,.2,1)}
  .tag{display:inline-flex;padding:5px 13px;border-radius:99px;font-size:12px;font-weight:600;border:1px solid ${border};color:${muted};background:${surface};letter-spacing:.3px}
  .input{width:100%;background:${surface};border:1px solid ${border};border-radius:14px;padding:14px 18px;color:${text};font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;outline:none;transition:border-color .2s,box-shadow .2s}
  .input:focus{border-color:${accent};box-shadow:0 0 0 4px ${accent}18}
  .input::placeholder{color:${muted}}
  .cursor{display:inline-block;width:2px;height:.9em;background:${accent};margin-left:2px;vertical-align:-.05em;animation:blink 1s step-end infinite;border-radius:1px}
  .tl-dot::before{content:'';position:absolute;left:-33px;top:7px;width:11px;height:11px;border-radius:50%;background:${accent};box-shadow:0 0 14px ${accent}}
  .tl-dot::after{content:'';position:absolute;left:-28px;top:18px;width:1px;height:calc(100% + 36px);background:linear-gradient(to bottom,${accent}60,transparent)}
  .soc-btn{width:44px;height:44px;border-radius:12px;background:${surface};border:1px solid ${border};display:flex;align-items:center;justify-content:center;color:${muted};text-decoration:none;transition:all .2s;cursor:pointer}
  .soc-btn:hover{border-color:${accent};color:${accent};transform:translateY(-3px)}
  .stat-card{background:${surface};border:1px solid ${border};border-radius:18px;padding:24px;text-align:center;transition:all .3s}
  .stat-card:hover{border-color:${accent}50;transform:translateY(-4px)}
  .proj-card{background:${surface};border:1px solid ${border};border-radius:20px;overflow:hidden;transition:all .3s;position:relative}
  .proj-card:hover{transform:translateY(-7px);box-shadow:0 28px 56px rgba(0,0,0,.25)}
  .float-ic{position:absolute;border-radius:14px;display:flex;align-items:center;justify-content:center}
  @media(max-width:768px){
    .hero-row{flex-direction:column-reverse!important;gap:48px!important}
    .two-col{grid-template-columns:1fr!important}
    .hide-mob{display:none!important}
    .mob-ham{display:flex!important}
    .ring-wrap{width:200px!important;height:200px!important}
    .ring-inner{width:182px!important;height:182px!important;font-size:56px!important}
    .proj-grid{grid-template-columns:1fr!important}
    .srv-grid{grid-template-columns:1fr!important}
  }
`;

export default function Portfolio() {
    const [dark, setDark] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [typedIdx, setTypedIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [testIdx, setTestIdx] = useState(0);
    const [skillsVis, setSkillsVis] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", msg: "" });
    const [sent, setSent] = useState(false);
    const skillsRef = useRef(null);

    const accent = "#22d3ee";
    const purple = "#a78bfa";
    const coral = "#fb7185";

    const bg = dark ? "#030b1a" : "#f0f4ff";
    const surface = dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)";
    const border = dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)";
    const text = dark ? "#e2e8f6" : "#0d1117";
    const muted = dark ? "#64748b" : "#6b7280";
    const glass = dark ? "rgba(3,11,26,.82)" : "rgba(240,244,255,.88)";

    // Typing
    useEffect(() => {
        const cur = TYPED[typedIdx];
        const spd = deleting ? 55 : 95;
        const t = setTimeout(() => {
            if (!deleting && charIdx < cur.length) {
                setCharIdx(c => c + 1);
            } else if (!deleting && charIdx === cur.length) {
                setTimeout(() => setDeleting(true), 1600);
            } else if (deleting && charIdx > 0) {
                setCharIdx(c => c - 1);
            } else {
                setDeleting(false);
                setTypedIdx(i => (i + 1) % TYPED.length);
            }
        }, spd);
        return () => clearTimeout(t);
    }, [charIdx, deleting, typedIdx]);

    // Testimonial auto-rotate
    useEffect(() => {
        const t = setInterval(() => setTestIdx(i => (i + 1) % TESTIMONIALS.length), 4200);
        return () => clearInterval(t);
    }, []);

    // Skills observer
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVis(true); }, { threshold: 0.25 });
        if (skillsRef.current) obs.observe(skillsRef.current);
        return () => obs.disconnect();
    }, []);

    const scrollTo = id => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    const handleSend = () => {
        if (form.name && form.email && form.msg) {
            setSent(true);
            setTimeout(() => { setSent(false); setForm({ name: "", email: "", subject: "", msg: "" }); }, 3500);
        }
    };

    return (
        <>
            <style>{CSS(dark, accent, purple, coral, bg, surface, border, text, muted)}</style>

            {/* Fixed BG orbs */}
            <div style={{
                position: "fixed", inset: 0, zIndex: 0, overflow: "hidden",
                backgroundImage: `linear-gradient(${dark ? "rgba(34,211,238,.025)" : "rgba(34,211,238,.05)"} 1px,transparent 1px),linear-gradient(90deg,${dark ? "rgba(34,211,238,.025)" : "rgba(34,211,238,.05)"} 1px,transparent 1px)`,
                backgroundSize: "56px 56px"
            }}>
                <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", width: 700, height: 700, top: -200, left: -200, background: `${accent}12`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", width: 600, height: 600, top: "35%", right: -200, background: `${purple}10`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", width: 450, height: 450, bottom: "5%", left: "15%", background: `${coral}0e`, pointerEvents: "none" }} />
            </div>

            {/* ── NAV ─────────────────────────────────────────────────────────── */}
            <nav className="glass" style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                height: 68, padding: "0 40px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div onClick={() => scrollTo("hero")} style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <span className="grad-text">Abarna</span>
                    <span style={{ color: text }}>.dev</span>
                </div>

                <div className="hide-mob" style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    {NAV_LINKS.map(n => <span key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase())}>{n}</span>)}
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <button onClick={() => setDark(d => !d)} style={{
                        background: surface, border: `1px solid ${border}`,
                        borderRadius: 99, width: 40, height: 40, cursor: "pointer", color: text,
                        display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s",
                    }}>
                        {dark ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button className="btn-p hide-mob" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => scrollTo("contact")}>
                        Hire Me <ArrowRight size={14} />
                    </button>
                    {/* Hamburger */}
                    <button className="mob-ham" onClick={() => setMenuOpen(true)} style={{
                        display: "none", background: surface, border: `1px solid ${border}`,
                        borderRadius: 10, padding: "9px", cursor: "pointer", color: text, alignItems: "center",
                    }}>
                        <Menu size={20} />
                    </button>
                </div>
            </nav>

            {/* ── MOBILE MENU ─────────────────────────────────────────────────── */}
            {menuOpen && (
                <div style={{
                    position: "fixed", inset: 0, zIndex: 200,
                    background: dark ? "rgba(3,11,26,.97)" : "rgba(240,244,255,.97)",
                    backdropFilter: "blur(24px)", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 40,
                }}>
                    <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", cursor: "pointer", color: text }}>
                        <X size={28} />
                    </button>
                    {NAV_LINKS.map(n => (
                        <span key={n} onClick={() => scrollTo(n.toLowerCase())} style={{
                            fontFamily: "'Space Grotesk',sans-serif", fontSize: 36, fontWeight: 700,
                            color: text, cursor: "pointer",
                        }}>{n}</span>
                    ))}
                </div>
            )}

            <div style={{ position: "relative", zIndex: 1 }}>

                {/* ── HERO ─────────────────────────────────────────────────────── */}
                <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "90px 40px 40px" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60, flexWrap: "wrap" }} className="hero-row">

                        {/* Left */}
                        <div style={{ flex: 1, minWidth: 300, animation: "fadeLeft .9s ease both" }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 99,
                                border: `1px solid ${accent}40`, background: `${accent}12`, marginBottom: 28
                            }}>
                                <Zap size={12} color={accent} /><span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: 2 }}>AVAILABLE FOR PROJECTS</span>
                            </div>

                            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(40px,6.5vw,76px)", lineHeight: 1.0, marginBottom: 18, color: text }}>
                                Hi, I'm<br /><span className="grad-text">kavi Priya</span>
                            </h1>

                            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 600, color: muted, marginBottom: 26, height: 40, display: "flex", alignItems: "center" }}>
                                <span style={{ color: accent }}>{TYPED[typedIdx].slice(0, charIdx)}</span>
                                <span className="cursor" />
                            </div>

                            <p style={{ color: muted, fontSize: 16, lineHeight: 1.85, marginBottom: 38, maxWidth: 480 }}>
                                I craft exceptional digital experiences — from pixel-perfect interfaces to robust backend systems. Passionate about clean code, creative design, and meaningful impact.
                            </p>

                            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
                                <button className="btn-p" onClick={() => scrollTo("projects")}>
                                    View My Work <ArrowRight size={16} />
                                </button>
                                <button className="btn-o">
                                    <Download size={16} /> Download CV
                                </button>
                            </div>

                            <div style={{ display: "flex", gap: 12 }}>
                                {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                                    <div key={i} className="soc-btn"><Icon size={18} /></div>
                                ))}
                            </div>
                        </div>

                        {/* Right – Avatar + floating icons */}
                        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeRight .9s ease .15s both" }}>
                            {[
                                { Icon: Code2, top: -24, left: -36, color: accent, an: "floatA 6s ease-in-out infinite" },
                                { Icon: Palette, top: 36, right: -44, color: purple, an: "floatB 7.5s ease-in-out infinite 1s" },
                                { Icon: Server, bottom: 36, left: -50, color: coral, an: "floatC 8s ease-in-out infinite 2s" },
                                { Icon: Sparkles, bottom: -18, right: -28, color: accent, an: "floatA 6.5s ease-in-out infinite .5s" },
                            ].map(({ Icon, top, left, right, bottom, color, an }, i) => (
                                <div key={i} className="float-ic" style={{
                                    top, left, right, bottom, width: 52, height: 52,
                                    background: `${color}18`, border: `1px solid ${color}40`, color,
                                    animation: an, zIndex: 2,
                                }}>
                                    <Icon size={22} />
                                </div>
                            ))}

                            {/* Ring avatar */}
                            <div className="ring-wrap" style={{ width: 300, height: 300, borderRadius: "50%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {/* Outer ring */}
                                <div style={{
                                    position: "absolute", inset: -3, borderRadius: "50%",
                                    background: `conic-gradient(${accent},${purple},${coral},${accent})`,
                                    animation: "spinRing 5s linear infinite"
                                }} />
                                {/* Middle ring */}
                                <div style={{
                                    position: "absolute", inset: -10, borderRadius: "50%",
                                    background: `conic-gradient(${accent}30,${purple}30,${coral}30,${accent}30)`,
                                    animation: "spinRingR 9s linear infinite"
                                }} />
                                {/* Inner circle */}
                                <div className="ring-inner" style={{
                                    width: 282, height: 282, borderRadius: "50%",
                                    background: dark ? "linear-gradient(145deg,#0d1e38,#160d2d)" : "linear-gradient(145deg,#c8d8ff,#e0d0ff)",
                                    position: "relative", zIndex: 1,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    overflow: "hidden"
                                }}>
                                    <img src={abarnaImg} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="kavi priya
                                " />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll cue */}
                    <div onClick={() => scrollTo("about")} style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
                        <span style={{ fontSize: 10, color: muted, letterSpacing: 3, textTransform: "uppercase" }}>Scroll</span>
                        <ChevronDown size={18} color={accent} style={{ animation: "floatC 2s ease-in-out infinite" }} />
                    </div>
                </section>

                {/* ── ABOUT ───────────────────────────────────────────────────── */}
                <section id="about" style={{ background: surface, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto", padding: "100px 40px" }}>
                        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                            <div style={{ animation: "fadeLeft .7s ease both" }}>
                                <div className="sec-label">About Me</div>
                                <h2 className="sec-title">
                                    Building the <span className="grad-text">Digital Future</span><br />One Line at a Time
                                </h2>
                                <p style={{ color: muted, fontSize: 16, lineHeight: 1.85, marginBottom: 18 }}>
                                    I'm a full-stack developer and UI/UX designer with 6+ years of experience crafting high-performance digital products. I specialize in React ecosystems, scalable Node.js backends, and seamless user experiences.
                                </p>
                                <p style={{ color: muted, fontSize: 16, lineHeight: 1.85, marginBottom: 32 }}>
                                    When I'm not shipping code, I'm exploring design systems, contributing to open source, and mentoring the next generation of developers.
                                </p>
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                    {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Figma", "Python", "Docker"].map(t => (
                                        <span key={t} className="tag">{t}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                {[
                                    { Icon: Award, num: "6+", label: "Years Experience", color: accent },
                                    { Icon: Briefcase, num: "80+", label: "Projects Shipped", color: purple },
                                    { Icon: Users, num: "40+", label: "Happy Clients", color: coral },
                                    { Icon: Coffee, num: "∞", label: "Coffees Consumed", color: accent },
                                ].map(({ Icon, num, label, color }, i) => (
                                    <div key={i} className="stat-card">
                                        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color }}>
                                            <Icon size={22} />
                                        </div>
                                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 36, fontWeight: 700, color: text, lineHeight: 1 }}>{num}</div>
                                        <div style={{ color: muted, fontSize: 13, marginTop: 6, fontWeight: 500 }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SKILLS ──────────────────────────────────────────────────── */}
                <section id="skills" ref={skillsRef} style={{ padding: "100px 40px" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: 60 }}>
                            <div className="sec-label" style={{ justifyContent: "center" }}>Technical Skills</div>
                            <h2 className="sec-title">What I <span className="grad-text">Bring to the Table</span></h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 28 }}>
                            {SKILLS.map((s, i) => (
                                <div key={i} style={{ animation: `fadeUp .5s ease ${i * .1}s both` }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: text }}>{s.name}</span>
                                        <span style={{ color: s.color, fontWeight: 700, fontSize: 14 }}>{s.level}%</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div className="skill-fill" style={{
                                            width: skillsVis ? `${s.level}%` : "0%",
                                            background: `linear-gradient(90deg,${s.color},${s.color}70)`,
                                            transitionDelay: `${i * .15}s`,
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SERVICES ────────────────────────────────────────────────── */}
                <section id="services" style={{ background: surface, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "100px 40px" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: 60 }}>
                            <div className="sec-label" style={{ justifyContent: "center" }}>What I Do</div>
                            <h2 className="sec-title">Services I <span className="grad-text">Offer</span></h2>
                            <p style={{ color: muted, fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>From concept to production — end-to-end digital solutions that scale and inspire.</p>
                        </div>
                        <div className="srv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
                            {SERVICES.map(({ Icon, title, desc, color }, i) => (
                                <div key={i} className="card" style={{ cursor: "default", overflow: "hidden", position: "relative" }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = `${color}50`}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                                    <div style={{ width: 54, height: 54, borderRadius: 16, background: `${color}18`, border: `1px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color }}>
                                        <Icon size={24} />
                                    </div>
                                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 10, color: text }}>{title}</h3>
                                    <p style={{ color: muted, fontSize: 14, lineHeight: 1.75 }}>{desc}</p>
                                    <div style={{ position: "absolute", bottom: -28, right: -28, width: 90, height: 90, borderRadius: "50%", background: `${color}0a`, pointerEvents: "none" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PROJECTS ────────────────────────────────────────────────── */}
                <section id="projects" style={{ padding: "100px 40px" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: 60 }}>
                            <div className="sec-label" style={{ justifyContent: "center" }}>Portfolio</div>
                            <h2 className="sec-title">Featured <span className="grad-text">Projects</span></h2>
                            <p style={{ color: muted, fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>A curated selection of work that showcases range across engineering, design, and product thinking.</p>
                        </div>
                        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 26 }}>
                            {PROJECTS.map(({ title, desc, tags, color, letter }, i) => (
                                <div key={i} className="proj-card">
                                    {/* Preview banner */}
                                    <div style={{
                                        height: 176, background: `linear-gradient(135deg,${color}18,${dark ? "#0d1e3840" : "#e8f0ff60"})`,
                                        borderBottom: `1px solid ${color}20`, display: "flex", alignItems: "center", justifyContent: "center",
                                        position: "relative", overflow: "hidden",
                                    }}>
                                        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 72, fontWeight: 700, color: `${color}25` }}>{letter}</span>
                                        <div style={{ position: "absolute", bottom: 12, right: 12 }}>
                                            <button style={{
                                                display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 99,
                                                background: `${color}22`, border: `1px solid ${color}45`, color, fontSize: 12, fontWeight: 700,
                                                cursor: "pointer", transition: "all .2s",
                                            }}
                                                onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = dark ? "#030b1a" : "#fff"; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.color = color; }}
                                            >
                                                <ExternalLink size={12} /> Live Preview
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ padding: 26 }}>
                                        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 10, color: text }}>{title}</h3>
                                        <p style={{ color: muted, fontSize: 14, lineHeight: 1.8, marginBottom: 18 }}>{desc}</p>
                                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                            {tags.map(t => <span key={t} className="tag" style={{ borderColor: `${color}35`, color }}>{t}</span>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── EXPERIENCE ──────────────────────────────────────────────── */}
                <section id="experience" style={{ background: surface, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "100px 40px" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
                            <div>
                                <div className="sec-label">Experience</div>
                                <h2 className="sec-title">My Professional <span className="grad-text">Journey</span></h2>
                                <p style={{ color: muted, fontSize: 16, lineHeight: 1.85, marginBottom: 32 }}>
                                    Six years across startups, agencies, and scaling tech companies — building products that genuinely matter.
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {[
                                        ["React", "#61dafb"], ["TypeScript", "#3178c6"], ["Node.js", "#3c873a"], ["AWS", "#ff9900"],
                                        ["PostgreSQL", "#336791"], ["Figma", "#f24e1e"],
                                    ].map(([name, c]) => (
                                        <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <CheckCircle2 size={16} color={accent} />
                                            <span style={{ color: text, fontSize: 14, fontWeight: 500 }}>{name}</span>
                                            <div style={{ flex: 1, height: 1, background: border }} />
                                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ paddingLeft: 40, borderLeft: `1px solid ${border}` }}>
                                {EXPERIENCE.map(({ role, company, period, desc }, i) => (
                                    <div key={i} className="tl-dot" style={{ position: "relative", marginBottom: i < EXPERIENCE.length - 1 ? 40 : 0 }}>
                                        <div style={{ fontSize: 11, color: accent, fontWeight: 700, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>{period}</div>
                                        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: text, marginBottom: 4 }}>{role}</h3>
                                        <div style={{ color: purple, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{company}</div>
                                        <p style={{ color: muted, fontSize: 14, lineHeight: 1.75 }}>{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
                <section id="testimonials" style={{ padding: "100px 40px", textAlign: "center" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                        <div className="sec-label" style={{ justifyContent: "center" }}>Testimonials</div>
                        <h2 className="sec-title">What <span className="grad-text">People Say</span></h2>

                        <div style={{ maxWidth: 680, margin: "48px auto 0", position: "relative" }}>
                            <div className="card" style={{ padding: "48px 44px", position: "relative", overflow: "hidden" }}>
                                <Quote size={44} color={`${accent}25`} style={{ position: "absolute", top: 24, left: 24 }} />
                                <p style={{ fontSize: 17, lineHeight: 1.85, color: text, marginBottom: 32, fontStyle: "italic" }}>
                                    "{TESTIMONIALS[testIdx].text}"
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                    <div style={{
                                        width: 52, height: 52, borderRadius: "50%",
                                        background: `linear-gradient(135deg,${TESTIMONIALS[testIdx].c},${purple})`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16,
                                        color: dark ? "#030b1a" : "#fff",
                                    }}>
                                        {TESTIMONIALS[testIdx].av}
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: text, fontSize: 16 }}>{TESTIMONIALS[testIdx].name}</div>
                                        <div style={{ color: muted, fontSize: 13 }}>{TESTIMONIALS[testIdx].role}</div>
                                    </div>
                                </div>
                                <div style={{ position: "absolute", bottom: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `${accent}06`, pointerEvents: "none" }} />
                            </div>

                            {/* Dot nav */}
                            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
                                {TESTIMONIALS.map((_, i) => (
                                    <button key={i} onClick={() => setTestIdx(i)} style={{
                                        width: i === testIdx ? 28 : 8, height: 8, borderRadius: 99,
                                        background: i === testIdx ? accent : border, border: "none",
                                        cursor: "pointer", transition: "all .3s", padding: 0,
                                    }} />
                                ))}
                            </div>

                            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 24 }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} color="#f59e0b" fill="#f59e0b" />)}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CONTACT ─────────────────────────────────────────────────── */}
                <section id="contact" style={{ background: surface, borderTop: `1px solid ${border}`, padding: "100px 40px" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
                            <div>
                                <div className="sec-label">Contact</div>
                                <h2 className="sec-title">Let's Build <span className="grad-text">Something Great</span></h2>
                                <p style={{ color: muted, fontSize: 16, lineHeight: 1.85, marginBottom: 40 }}>
                                    Have a project in mind? I'm currently open to new clients and would love to hear what you're building.
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                                    {[
                                        { Icon: Mail, label: "Email", val: "alex@alexdev.io", color: accent },
                                        { Icon: Phone, label: "Phone", val: "+1 (555) 234-5678", color: purple },
                                        { Icon: MapPin, label: "Location", val: "San Francisco, CA", color: coral },
                                    ].map(({ Icon, label, val, color }, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                            <div style={{ width: 50, height: 50, borderRadius: 14, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 12, color: muted, marginBottom: 3, fontWeight: 500, letterSpacing: .5 }}>{label.toUpperCase()}</div>
                                                <div style={{ fontWeight: 600, color: text, fontSize: 15 }}>{val}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card" style={{ padding: 40 }}>
                                {sent ? (
                                    <div style={{ textAlign: "center", padding: "44px 0" }}>
                                        <div style={{ fontSize: 52, marginBottom: 16 }}>🚀</div>
                                        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: text, marginBottom: 8 }}>Message Sent!</h3>
                                        <p style={{ color: muted, fontSize: 15 }}>I'll get back to you within 24 hours.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                            <input className="input" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                                            <input className="input" placeholder="Email Address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                        </div>
                                        <input className="input" placeholder="Subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                                        <textarea className="input" placeholder="Your Message..." rows={5} value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} style={{ resize: "vertical" }} />
                                        <button className="btn-p" onClick={handleSend} style={{ justifyContent: "center", marginTop: 4 }}>
                                            Send Message <ArrowRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ──────────────────────────────────────────────────── */}
                <footer style={{ borderTop: `1px solid ${border}`, padding: "36px 40px" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20 }}>
                            <span className="grad-text">kavi priya</span><span style={{ color: text }}>.dev</span>
                        </div>
                        <div style={{ color: muted, fontSize: 13 }}>© 2025 kavi priya — Crafted with ♥ and ☕</div>
                        <div style={{ display: "flex", gap: 14 }}>
                            {[Github, Linkedin, Twitter].map((Icon, i) => (
                                <div key={i} className="soc-btn"><Icon size={17} /></div>
                            ))}
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}