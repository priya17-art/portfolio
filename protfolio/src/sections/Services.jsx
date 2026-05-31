import { motion } from "framer-motion";
import { Code, Layout, PenTool, Layers, Compass } from "lucide-react";

export default function Services() {
  const services = [
    {
      Icon: Code,
      title: "Web Development",
      description: "Building responsive, modern, and high-performance web applications using robust technologies like React, Node.js, and Express.",
      color: "text-neonPurple border-neonPurple/20 hover:border-neonPurple/50",
      glowColor: "rgba(168, 85, 247, ",
    },
    {
      Icon: Layout,
      title: "Frontend Design",
      description: "Creating beautiful, responsive page structures with modern CSS, Tailwind, CSS variables, and fluid transitions that capture attention.",
      color: "text-neonCyan border-neonCyan/20 hover:border-neonCyan/50",
      glowColor: "rgba(6, 182, 212, ",
    },
    {
      Icon: PenTool,
      title: "Logo Designing",
      description: "Drafting creative, unique, and professional vector brand logos that fit companies' values and leave a memorable impression.",
      color: "text-neonPink border-neonPink/20 hover:border-neonPink/50",
      glowColor: "rgba(236, 72, 153, ",
    },
    {
      Icon: Layers,
      title: "UI/UX Design",
      description: "Researching user pathways, mapping wireframes, and prototyping sleek interfaces in Figma grounded in design-system frameworks.",
      color: "text-neonBlue border-neonBlue/20 hover:border-neonBlue/50",
      glowColor: "rgba(59, 130, 246, ",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="services" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background glowing blob */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-neonPink/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-space text-xs font-bold uppercase tracking-widest text-neonPurple mb-3 inline-flex items-center gap-2">
            <Compass size={14} /> Services
          </span>
          <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
            What I <span className="text-gradient bg-gradient-to-r from-neonPurple to-neonPink text-glow-purple">Provide</span>
          </h2>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((srv, idx) => {
            const Icon = srv.Icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ 
                  y: -6,
                  boxShadow: `0 15px 30px ${srv.glowColor}0.15)`,
                }}
                className={`group p-6 rounded-2xl bg-white dark:bg-darkCard border ${srv.color} shadow-lg transition-all duration-300 flex flex-col justify-between glass-card relative overflow-hidden`}
              >
                {/* Visual back glow */}
                <div 
                  className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300"
                  style={{ backgroundColor: srv.glowColor + "1)" }}
                />

                <div>
                  {/* Icon container */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${srv.glowColor}0.1)`, 
                      color: srv.glowColor + "1)" 
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Title */}
                  <h3 className="font-space text-lg font-bold text-slate-800 dark:text-white mb-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Arrow detail */}
                <span 
                  className="text-xs font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1 cursor-pointer"
                  style={{ color: srv.glowColor + "1)" }}
                >
                  Learn More &rarr;
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
