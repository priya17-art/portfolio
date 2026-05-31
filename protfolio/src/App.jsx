import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
    FiGithub, FiExternalLink, FiMail, FiPhone, FiMapPin, FiArrowUp,
    FiSun, FiMoon, FiMenu, FiX, FiDownload, FiStar, FiAward, FiCode,
    FiLayout, FiShoppingBag, FiCamera, FiZap, FiUsers, FiTrendingUp,
    FiLinkedin, FiTwitter, FiInstagram, FiSend, FiCheckCircle
} from "react-icons/fi";
import {
    SiReact, SiJavascript, SiTypescript, SiNodedotjs, SiMongodb,
    SiTailwindcss, SiFigma, SiPython, SiFirebase, SiGit,
    SiNextdotjs, SiGraphql, SiPostgresql, SiAffinityphoto
} from "react-icons/si";
import profileImg from "./assets/profile.jpg";

function ParticleUniverse({ theme }) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        const particles = Array.from({ length: 120 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.8 + 0.3,
            opacity: Math.random() * 0.6 + 0.1,
            color: ["#C9A84C", "#9B4DFF", "#00E5FF", "#FF3D7F"][Math.floor(Math.random() * 4)],
        }));
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
                ctx.fill();
                particles.slice(i + 1, i + 5).forEach(p2 => {
                    const dx = p.x - p2.x, dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            animRef.current = requestAnimationFrame(draw);
        };
        draw();
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
        window.addEventListener("resize", resize);
        return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
    }, [theme]);
    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const trailX = useSpring(cursorX, { stiffness: 80, damping: 20 });
    const trailY = useSpring(cursorY, { stiffness: 80, damping: 20 });
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
        const over = (e) => setHovered(!!e.target.closest("a,button,[data-cursor]"));
        const down = () => setClicked(true);
        const up = () => setClicked(false);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
        };
    }, []);
    return (
        <>
            <motion.div className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}>
                <motion.div animate={{ scale: hovered ? 2.5 : clicked ? 0.8 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-8 h-8 rounded-full border border-[#C9A84C] opacity-80" />
            </motion.div>
            <motion.div className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            </motion.div>
        </>
    );
}

function LoadingScreen({ onDone }) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(timer); setTimeout(onDone, 400); return 100; }
                return Math.min(p + Math.random() * 12, 100);
            });
        }, 80);
        return () => clearInterval(timer);
    }, [onDone]);
    return (
        <motion.div exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A0A0F]">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center relative z-10">
                <div className="font-display text-8xl font-light mb-2 tracking-widest" style={{ background: "linear-gradient(135deg, #F0D080, #C9A84C, #8A6C2A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KP</div>
                <div className="font-mono text-xs text-[#A8B0C0] tracking-[0.4em] mb-12 uppercase">Kavi Priya · Portfolio</div>
                <div className="w-64 h-px bg-[#1E1E2E] relative overflow-hidden mx-auto rounded-full">
                    <motion.div className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: "linear-gradient(90deg, #C9A84C, #F0D080)" }}
                        initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
                </div>
                <div className="font-mono text-xs text-[#C9A84C] mt-3 tracking-widest">{Math.round(progress)}%</div>
            </motion.div>
            <motion.div className="absolute bottom-8 font-mono text-xs text-[#5A5A7A] tracking-[0.4em]"
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
                ◆ CRAFTING EXCELLENCE ◆
            </motion.div>
        </motion.div>
    );
}

function SectionLabel({ label }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C9A84C] opacity-60" />
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-[#C9A84C]">{label}</span>
            <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.6), transparent)" }} />
        </motion.div>
    );
}

function MagneticBtn({ children, href, primary, onClick }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 20 });
    const sy = useSpring(y, { stiffness: 200, damping: 20 });
    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    const base = "px-7 py-3.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-200 inline-block";
    const Tag = href ? "a" : "button";
    return (
        <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className="inline-block">
            <Tag href={href} onClick={onClick}
                className={base + (primary ? " bg-[#C9A84C] text-[#0A0A0F] font-semibold hover:bg-[#F0D080]" : " glass font-medium hover:border-[#C9A84C]")}
                style={primary ? {} : { color: "var(--text)", border: "1px solid var(--border)" }}>
                {children}
            </Tag>
        </motion.div>
    );
}

function AnimCounter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        let s = 0;
        const step = target / 60;
        const t = setInterval(() => {
            s += step;
            if (s >= target) { setCount(target); clearInterval(t); }
            else setCount(Math.floor(s));
        }, 25);
        return () => clearInterval(t);
    }, [inView, target]);
    return <span ref={ref}>{count}{suffix}</span>;
}

function Nav({ theme, toggleTheme }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    useEffect(() => scrollY.onChange(v => setScrolled(v > 60)), [scrollY]);
    const links = ["About", "Skills", "Projects", "Achievements", "Services", "Contact"];
    return (
        <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500"
            style={{ background: scrolled ? "var(--nav-bg)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--border)" : "none" }}>
            <a href="#hero" className="font-display text-2xl tracking-widest font-semibold" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C,#8A6C2A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KP</a>
            <div className="hidden md:flex items-center gap-8">
                {links.map(l => (
                    <a key={l} href={`#${l.toLowerCase()}`} className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 hover:text-[#C9A84C]" style={{ color: "var(--text-muted)" }}>{l}</a>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <button onClick={toggleTheme} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-[#C9A84C] transition-colors">
                    {theme === "dark" ? <FiSun size={15} className="text-[#C9A84C]" /> : <FiMoon size={15} className="text-[#C9A84C]" />}
                </button>
                <button onClick={() => setOpen(v => !v)} className="md:hidden w-9 h-9 rounded-full glass flex items-center justify-center" style={{ color: "var(--text)" }}>
                    {open ? <FiX size={16} /> : <FiMenu size={16} />}
                </button>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 glass p-6 flex flex-col gap-4 md:hidden">
                        {links.map(l => (
                            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="font-mono text-sm tracking-widest uppercase hover:text-[#C9A84C] transition-colors" style={{ color: "var(--text-muted)" }}>{l}</a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, -150]);
    const op = useTransform(scrollY, [0, 400], [1, 0]);
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(201,168,76,0.1) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 10%, rgba(155,77,255,0.06) 0%, transparent 60%)" }} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[400, 600, 800].map((size, i) => (
                    <motion.div key={size} className="absolute rounded-full border border-[#C9A84C]"
                        style={{ width: size, height: size, opacity: 0.03 + i * 0.02 }}
                        animate={{ rotate: 360 }} transition={{ duration: 20 + i * 15, repeat: Infinity, ease: "linear" }} />
                ))}
            </div>
            <motion.div style={{ y, opacity: op }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="font-mono text-xs tracking-[0.5em] text-[#C9A84C] mb-8 uppercase">
                    ◆ Full Stack Developer · UI/UX Designer · Chennai ◆
                </motion.div>
                <div className="overflow-hidden mb-2">
                    <motion.h1 initial={{ y: 120 }} animate={{ y: 0 }} transition={{ delay: 0.4, type: "spring", stiffness: 60 }}
                        className="font-display font-light leading-none tracking-tight"
                        style={{ fontSize: "clamp(5rem,15vw,11rem)", background: "linear-gradient(135deg,#F0D080 0%,#C9A84C 50%,#8A6C2A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Kavi
                    </motion.h1>
                </div>
                <div className="overflow-hidden mb-8">
                    <motion.h1 initial={{ y: 120 }} animate={{ y: 0 }} transition={{ delay: 0.55, type: "spring", stiffness: 60 }}
                        className="font-display font-light leading-none tracking-tight"
                        style={{ fontSize: "clamp(5rem,15vw,11rem)", color: "var(--text)" }}>
                        Priya
                    </motion.h1>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                    className="flex flex-wrap justify-center gap-3 mb-10">
                    {["Creative Developer", "Visual Designer", "Problem Solver"].map((w, i) => (
                        <motion.span key={w} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + i * 0.12 }}
                            className="px-4 py-1.5 rounded-full glass font-mono text-xs tracking-widest uppercase"
                            style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>{w}</motion.span>
                    ))}
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                    className="font-display text-lg sm:text-xl italic mb-12 max-w-2xl mx-auto leading-relaxed"
                    style={{ color: "var(--text-muted)" }}>
                    "Crafting digital experiences that live at the intersection of art and technology — where every pixel tells a story."
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
                    className="flex flex-wrap justify-center gap-4">
                    <MagneticBtn href="#projects" primary>View My Work</MagneticBtn>
                    <MagneticBtn href="#contact">Let's Connect</MagneticBtn>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-20 flex justify-center">
                    <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>
                        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
                        <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #C9A84C, transparent)" }} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const stats = [
        { val: 3, suf: "+", label: "Years Experience" },
        { val: 25, suf: "+", label: "Projects Completed" },
        { val: 20, suf: "+", label: "Happy Clients" },
        { val: 99, suf: "%", label: "Satisfaction Rate" },
    ];
    return (
        <section id="about" ref={ref} className="relative py-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <SectionLabel label="About Me" />
                <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
                    <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}
                        className="relative flex justify-center lg:justify-start">
                        <div className="relative w-72 h-96">
                            <div className="absolute inset-0 rounded-3xl overflow-hidden glass">
                                <img src={profileImg} alt="Kavi Priya" className="w-full h-full object-cover" />
                            </div>
                            {[{ icon: <FiCode />, angle: 0, r: 170, color: "#C9A84C" }, { icon: <FiLayout />, angle: 90, r: 170, color: "#9B4DFF" }, { icon: <FiCamera />, angle: 180, r: 170, color: "#00E5FF" }, { icon: <FiZap />, angle: 270, r: 170, color: "#FF3D7F" }].map((b, i) => {
                                const rad = (b.angle * Math.PI) / 180;
                                return (
                                    <motion.div key={i} className="absolute w-11 h-11 rounded-full glass flex items-center justify-center text-lg"
                                        style={{ left: "50%", top: "50%", marginLeft: -22, marginTop: -22, color: b.color, border: `1px solid ${b.color}44`, boxShadow: `0 0 20px ${b.color}30` }}
                                        animate={{ x: Math.cos(rad) * b.r, y: Math.sin(rad) * b.r }}
                                        transition={{ duration: 0 }}>
                                        {b.icon}
                                    </motion.div>
                                );
                            })}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: "0 0 80px rgba(201,168,76,0.12)" }} />
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
                        <h2 className="font-display text-5xl font-light mb-6" style={{ color: "var(--text)" }}>
                            Turning Ideas Into <em className="not-italic" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Digital Reality</em>
                        </h2>
                        <p className="mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            I'm Kavi Priya — a full-stack developer and UI/UX designer passionate about crafting immersive digital experiences. With a blend of engineering precision and artistic sensibility, I build products that don't just work — they <em className="not-italic text-[#C9A84C]">captivate</em>.
                        </p>
                        <p className="mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            From pixel-perfect interfaces to scalable back-end systems, I bring holistic thinking to every project. Based in Chennai, working globally with clients who value craft, quality, and measurable results.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-8">
                            <MagneticBtn href="#contact" primary>Hire Me</MagneticBtn>
                            <MagneticBtn href="#"><span className="flex items-center gap-2"><FiDownload size={13} />Resume</span></MagneticBtn>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((s, i) => (
                                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }}
                                    className="glass rounded-2xl p-4 text-center" style={{ border: "1px solid var(--border)" }}>
                                    <div className="font-display text-3xl font-semibold" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                        <AnimCounter target={s.val} suffix={s.suf} />
                                    </div>
                                    <div className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Skills() {
    const skills = [
        { icon: <SiReact />, name: "React", level: 95, color: "#61DAFB" },
        { icon: <SiJavascript />, name: "JavaScript", level: 92, color: "#F7DF1E" },
        { icon: <SiTypescript />, name: "TypeScript", level: 85, color: "#3178C6" },
        { icon: <SiNodedotjs />, name: "Node.js", level: 88, color: "#339933" },
        { icon: <SiNextdotjs />, name: "Next.js", level: 82, color: "#AAAAAA" },
        { icon: <SiMongodb />, name: "MongoDB", level: 80, color: "#47A248" },
        { icon: <SiPostgresql />, name: "PostgreSQL", level: 75, color: "#4169E1" },
        { icon: <SiTailwindcss />, name: "Tailwind", level: 96, color: "#06B6D4" },
        { icon: <SiFigma />, name: "Figma", level: 90, color: "#F24E1E" },
        { icon: <SiPython />, name: "Python", level: 70, color: "#3776AB" },
        { icon: <SiFirebase />, name: "Firebase", level: 82, color: "#FFCA28" },
        { icon: <SiGit />, name: "Git", level: 90, color: "#F05032" },
        { icon: <SiGraphql />, name: "GraphQL", level: 72, color: "#E535AB" },
        { icon: <SiAffinityphoto />, name: "Affinity Photo", level: 78, color: "#31A8FF" },
    ];
    return (
        <section id="skills" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />
            <div className="max-w-6xl mx-auto relative z-10">
                <SectionLabel label="Skills Galaxy" />
                <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="font-display text-5xl font-light mb-16" style={{ color: "var(--text)" }}>
                    Technologies I <em className="not-italic" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Master</em>
                </motion.h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {skills.map((skill, i) => (
                        <motion.div key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.08, y: -6 }}
                            className="glass rounded-2xl p-5 flex flex-col items-center gap-3 group cursor-pointer relative overflow-hidden"
                            style={{ border: "1px solid var(--border)" }} data-cursor>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle at center, ${skill.color}15, transparent 70%)` }} />
                            <div className="text-3xl transition-transform duration-300 group-hover:scale-125 relative z-10" style={{ color: skill.color }}>{skill.icon}</div>
                            <span className="font-mono text-xs tracking-widest uppercase relative z-10" style={{ color: "var(--text-muted)" }}>{skill.name}</span>
                            <div className="w-full h-1 rounded-full relative z-10" style={{ background: "var(--border)" }}>
                                <motion.div className="h-full rounded-full"
                                    style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
                                    initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: i * 0.05 + 0.3 }} />
                            </div>
                            <span className="font-mono text-[10px] relative z-10" style={{ color: "#C9A84C" }}>{skill.level}%</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, i }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-150, 150], [8, -8]), { stiffness: 200, damping: 30 });
    const ry = useSpring(useTransform(mx, [-150, 150], [-8, 8]), { stiffness: 200, damping: 30 });
    const onMove = (e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
    };
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.15 }}
            style={{ perspective: 1000 }} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
            onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
            <motion.div className="glass rounded-3xl overflow-hidden group h-full" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", border: "1px solid var(--border)" }}>
                <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: project.gradient }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span style={{ fontSize: "4rem" }}>{project.emoji}</span>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full glass font-mono text-[10px] tracking-widest uppercase text-[#C9A84C]">{project.tag}</span>
                    </div>
                    <motion.div className="absolute inset-0 flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }}
                        style={{ background: "rgba(10,10,15,0.75)", backdropFilter: "blur(8px)" }}>
                        <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                            className="w-12 h-12 rounded-full bg-[#C9A84C] text-[#0A0A0F] flex items-center justify-center hover:bg-[#F0D080] transition-colors">
                            <FiGithub size={18} />
                        </a>
                        <a href={project.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                            className="w-12 h-12 rounded-full glass text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C] hover:text-[#0A0A0F] transition-colors"
                            style={{ border: "1px solid #C9A84C" }}>
                            <FiExternalLink size={18} />
                        </a>
                    </motion.div>
                </div>
                <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>{project.title}</h3>
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.tech.map(t => (
                            <span key={t} className="px-2.5 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase"
                                style={{ background: "var(--bg2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>{t}</span>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <a href={project.github} target="_blank" rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs tracking-widest uppercase transition-all hover:border-[#C9A84C] hover:text-[#C9A84C]"
                            style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                            <FiGithub size={13} /> GitHub
                        </a>
                        <a href={project.live} target="_blank" rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs tracking-widest uppercase bg-[#C9A84C] text-[#0A0A0F] hover:bg-[#F0D080] transition-colors font-semibold">
                            <FiExternalLink size={13} /> Live Demo
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function Projects() {
    const projects = [
        { title: "Sweet Cupcake Shop", tag: "E-Commerce", emoji: "🧁", desc: "A delightful artisan bakery platform with real-time order tracking, custom cake builder, loyalty rewards, and seamless Stripe checkout.", tech: ["React", "Node.js", "MongoDB", "Stripe"], gradient: "linear-gradient(135deg, #FF6B9D44 0%, #FFB34766 100%)", github: "https://github.com", live: "https://example.com" },
        { title: "Jewellery Store", tag: "Luxury Retail", emoji: "💎", desc: "Premium jewellery showcase with 360° product viewer, AR try-on simulation, wishlist management, and bespoke consultation booking.", tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"], gradient: "linear-gradient(135deg, #C9A84C33 0%, #9B4DFF33 100%)", github: "https://github.com", live: "https://example.com" },
        { title: "NP Hotel Booking", tag: "Hospitality Tech", emoji: "🏨", desc: "Full-featured hotel reservation system with dynamic pricing, room comparison, virtual tours, multi-currency, and real-time availability.", tech: ["React", "Firebase", "Tailwind", "Node.js"], gradient: "linear-gradient(135deg, #00E5FF33 0%, #0066FF33 100%)", github: "https://github.com", live: "https://example.com" },
        { title: "Creative Logo Platform", tag: "SaaS Design", emoji: "✨", desc: "AI-powered logo design platform with drag-and-drop builder, 500+ icon library, brand kit generation, and team collaboration.", tech: ["React", "Python", "GraphQL", "AWS"], gradient: "linear-gradient(135deg, #FF3D7F33 0%, #FF6B3533 100%)", github: "https://github.com", live: "https://example.com" },
    ];
    return (
        <section id="projects" className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <SectionLabel label="Projects Showcase" />
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
                    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="font-display text-5xl font-light" style={{ color: "var(--text)" }}>
                        Selected <em className="not-italic" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Works</em>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="font-mono text-xs tracking-widest uppercase max-w-xs text-right" style={{ color: "var(--text-muted)" }}>
                        Each project crafted with obsessive attention to detail
                    </motion.p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((p, i) => <ProjectCard key={p.title} project={p} i={i} />)}
                </div>
            </div>
        </section>
    );
}

function Achievements() {
    const timeline = [
        { year: "2024", title: "Senior Full-Stack Developer", org: "TechNova Solutions, Chennai", icon: <FiCode />, color: "#C9A84C" },
        { year: "2023", title: "Awwwards Honorable Mention", org: "International Design Recognition", icon: <FiAward />, color: "#9B4DFF" },
        { year: "2023", title: "UI/UX Lead Designer", org: "CreativeForge Agency", icon: <FiLayout />, color: "#00E5FF" },
        { year: "2022", title: "React Certified Expert", org: "Meta Developer Program", icon: <SiReact />, color: "#61DAFB" },
        { year: "2021", title: "B.E. Computer Science", org: "Anna University, Chennai", icon: <FiStar />, color: "#FF3D7F" },
    ];
    const awards = [
        { icon: <FiAward />, label: "Awwwards HM", year: "2023", color: "#9B4DFF" },
        { icon: <FiStar />, label: "Top Designer", year: "2023", color: "#C9A84C" },
        { icon: <FiTrendingUp />, label: "Best Portfolio", year: "2024", color: "#00E5FF" },
        { icon: <FiUsers />, label: "Client Choice", year: "2024", color: "#FF3D7F" },
    ];
    return (
        <section id="achievements" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(155,77,255,0.05) 0%, transparent 60%)" }} />
            <div className="max-w-6xl mx-auto relative z-10">
                <SectionLabel label="Achievements" />
                <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="font-display text-5xl font-light mb-16" style={{ color: "var(--text)" }}>
                    My <em className="not-italic" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Journey</em> So Far
                </motion.h2>
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="relative">
                        <div className="absolute left-5 top-0 bottom-0 w-px opacity-40" style={{ background: "linear-gradient(to bottom, #C9A84C, #9B4DFF, #00E5FF)" }} />
                        <div className="space-y-6">
                            {timeline.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 }} className="relative pl-14">
                                    <div className="absolute left-0 w-10 h-10 rounded-full glass flex items-center justify-center"
                                        style={{ color: item.color, border: `1px solid ${item.color}44` }}>{item.icon}</div>
                                    <div className="glass rounded-2xl p-5 hover:border-[#C9A84C] transition-colors duration-300" style={{ border: "1px solid var(--border)" }}>
                                        <div className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: item.color }}>{item.year}</div>
                                        <div className="font-semibold mb-1" style={{ color: "var(--text)" }}>{item.title}</div>
                                        <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{item.org}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {awards.map((a, i) => (
                                <motion.div key={a.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05 }}
                                    className="glass rounded-2xl p-6 text-center group cursor-pointer relative overflow-hidden"
                                    style={{ border: "1px solid var(--border)" }} data-cursor>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `radial-gradient(circle, ${a.color}12, transparent 70%)` }} />
                                    <div className="text-2xl mb-2 mx-auto w-fit group-hover:scale-125 transition-transform duration-300 relative z-10" style={{ color: a.color }}>{a.icon}</div>
                                    <div className="font-semibold text-sm mb-1 relative z-10" style={{ color: "var(--text)" }}>{a.label}</div>
                                    <div className="font-mono text-xs relative z-10" style={{ color: a.color }}>{a.year}</div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="glass rounded-3xl p-8 relative overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                            <div className="absolute top-4 left-6 font-display text-6xl text-[#C9A84C] opacity-15 leading-none">"</div>
                            <p className="font-display text-xl italic mb-4 mt-4 relative z-10 leading-relaxed" style={{ color: "var(--text)" }}>
                                Kavi's work is in a class of its own. She transformed our entire digital presence — the results were beyond what we imagined.
                            </p>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A0A0F] font-bold font-display text-lg">A</div>
                                <div>
                                    <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>Arun Sharma</div>
                                    <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>CEO, NP Hotels</div>
                                </div>
                                <div className="ml-auto flex gap-0.5">{[...Array(5)].map((_, i) => <FiStar key={i} size={12} style={{ color: "#C9A84C", fill: "#C9A84C" }} />)}</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Services() {
    const services = [
        { icon: <FiLayout />, title: "UI/UX Design", desc: "Pixel-perfect interfaces crafted with Figma. From wireframes to high-fidelity prototypes that users love.", price: "From ₹25K", color: "#9B4DFF" },
        { icon: <FiCode />, title: "Full Stack Dev", desc: "Scalable web apps built with React, Node.js, and modern databases. Clean code, clean architecture.", price: "From ₹40K", color: "#C9A84C" },
        { icon: <FiShoppingBag />, title: "E-Commerce", desc: "High-converting online stores with seamless UX, payment integration, and inventory management.", price: "From ₹35K", color: "#00E5FF" },
        { icon: <FiCamera />, title: "Brand Identity", desc: "Logo design, visual identity systems, and brand guidelines that make lasting first impressions.", price: "From ₹15K", color: "#FF3D7F" },
        { icon: <FiZap />, title: "Motion Design", desc: "Cinematic Framer Motion animations and micro-interactions that bring interfaces to life.", price: "From ₹20K", color: "#47FF8B" },
        { icon: <FiTrendingUp />, title: "UX Consulting", desc: "UX audits, performance optimization, and technical consulting to elevate existing products.", price: "From ₹10K", color: "#FF8B47" },
    ];
    return (
        <section id="services" className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <SectionLabel label="Services" />
                <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="font-display text-5xl font-light mb-16" style={{ color: "var(--text)" }}>
                    What I <em className="not-italic" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Offer</em>
                </motion.h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <motion.div key={s.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }} whileHover={{ y: -8, scale: 1.02 }}
                            className="glass rounded-3xl p-7 group relative overflow-hidden cursor-pointer"
                            style={{ border: "1px solid var(--border)" }} data-cursor>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `radial-gradient(ellipse at top left, ${s.color}12, transparent 70%)` }} />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5 transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}40` }}>{s.icon}</div>
                                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>{s.title}</h3>
                                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-sm font-semibold" style={{ color: s.color }}>{s.price}</span>
                                    <FiArrowUp className="rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: s.color }} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const submit = () => {
        if (!form.name || !form.email || !form.message) return;
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: "", email: "", message: "" });
    };
    const inputCls = "w-full px-5 py-4 rounded-2xl font-mono text-sm outline-none transition-colors duration-200 resize-none";
    const inputStyle = { background: "var(--bg2)", color: "var(--text)", border: "1px solid var(--border)" };
    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
            <div className="max-w-5xl mx-auto relative z-10">
                <SectionLabel label="Contact" />
                <div className="grid lg:grid-cols-2 gap-16 mt-16">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="font-display text-5xl font-light mb-6" style={{ color: "var(--text)" }}>
                            Let's Create <em className="not-italic" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Together</em>
                        </h2>
                        <p className="leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
                            Have a project in mind? I'd love to hear about it. From a simple landing page to a complex SaaS platform — let's turn your vision into reality.
                        </p>
                        <div className="space-y-4 mb-10">
                            {[{ icon: <FiMail />, label: "kavipriya@gmail.com" }, { icon: <FiPhone />, label: "+91 98765 43210" }, { icon: <FiMapPin />, label: "Chennai, Tamil Nadu, India" }].map(({ icon, label }) => (
                                <div key={label} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#C9A84C]">{icon}</div>
                                    <span className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>{label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            {[{ icon: <FiGithub />, href: "https://github.com" }, { icon: <FiLinkedin />, href: "#" }, { icon: <FiTwitter />, href: "#" }, { icon: <FiInstagram />, href: "#" }].map(({ icon, href }, i) => (
                                <a key={i} href={href} target="_blank" rel="noreferrer"
                                    className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all duration-200"
                                    style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>{icon}</a>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <div className="glass rounded-3xl p-8 relative overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                            <div className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input name="name" value={form.name} onChange={handle} placeholder="Your Name" className={inputCls} style={inputStyle} />
                                    <input name="email" value={form.email} onChange={handle} placeholder="Email Address" className={inputCls} style={inputStyle} />
                                </div>
                                <textarea name="message" value={form.message} onChange={handle} placeholder="Tell me about your project..." rows={5} className={inputCls} style={inputStyle} />
                                <AnimatePresence mode="wait">
                                    {sent ? (
                                        <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#C9A84C] text-[#0A0A0F] font-mono text-sm font-semibold tracking-widest">
                                            <FiCheckCircle /> Message Sent! I'll respond shortly.
                                        </motion.div>
                                    ) : (
                                        <motion.div key="btn" className="flex justify-end">
                                            <MagneticBtn onClick={submit} primary>
                                                <span className="flex items-center gap-2"><FiSend size={13} />Send Message</span>
                                            </MagneticBtn>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-12 px-6" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-display text-2xl tracking-widest font-semibold" style={{ background: "linear-gradient(135deg,#F0D080,#C9A84C,#8A6C2A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kavi Priya</div>
                <p className="font-mono text-xs tracking-widest text-center" style={{ color: "var(--text-muted)" }}>© 2025 · Crafted with ♥ in Chennai, India</p>
                <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}><span style={{ color: "#C9A84C" }}>◆</span> Available for Freelance</div>
            </div>
        </footer>
    );
}

function BackToTop() {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(false);
    useEffect(() => scrollY.onChange(v => setVisible(v > 400)), [scrollY]);
    return (
        <AnimatePresence>
            {visible && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0F] transition-all duration-300"
                    style={{ border: "1px solid var(--border)", boxShadow: "0 0 30px rgba(201,168,76,0.2)" }}>
                    <FiArrowUp size={18} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
            style={{ scaleX: scrollYProgress, background: "linear-gradient(90deg, #C9A84C, #9B4DFF, #00E5FF, #FF3D7F)" }} />
    );
}

export default function App() {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState("dark");
    const toggleTheme = useCallback(() => setTheme(t => t === "dark" ? "light" : "dark"), []);
    useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

    return (
        <>
            <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>
            {!loading && (
                <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
                    <ParticleUniverse theme={theme} />
                    <CustomCursor />
                    <ScrollProgress />
                    <Nav theme={theme} toggleTheme={toggleTheme} />
                    <main>
                        <Hero />
                        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "0 3rem" }} />
                        <About />
                        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "0 3rem" }} />
                        <Skills />
                        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "0 3rem" }} />
                        <Projects />
                        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "0 3rem" }} />
                        <Achievements />
                        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "0 3rem" }} />
                        <Services />
                        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "0 3rem" }} />
                        <Contact />
                    </main>
                    <Footer />
                    <BackToTop />
                </div>
            )}
        </>
    );
}