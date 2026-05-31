import { motion } from "framer-motion";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaFigma 
} from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { Brain, Database, Cpu, Sparkles } from "lucide-react";

export default function Skills() {
  const skills = [
    { name: "HTML", Icon: FaHtml5, color: "#e34f26", category: "Frontend" },
    { name: "CSS", Icon: FaCss3Alt, color: "#1572b6", category: "Frontend" },
    { name: "JavaScript", Icon: FaJs, color: "#f7df1e", category: "Frontend" },
    { name: "React", Icon: FaReact, color: "#61dafb", category: "Frontend" },
    { name: "Node.js", Icon: FaNodeJs, color: "#339933", category: "Backend" },
    { name: "MongoDB", Icon: SiMongodb, color: "#47a248", category: "Database" },
    { name: "Python", Icon: FaPython, color: "#3776ab", category: "Programming" },
    { name: "Data Science", Icon: Database, color: "#06b6d4", category: "Data Science" },
    { name: "Machine Learning", Icon: Brain, color: "#a855f7", category: "Data Science" },
    { name: "UI/UX Design", Icon: FaFigma, color: "#ec4899", category: "Design" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background glowing blob */}
      <div className="absolute top-[30%] left-[-5%] w-[350px] h-[350px] bg-neonPurple/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-space text-xs font-bold uppercase tracking-widest text-neonPink mb-3 inline-flex items-center gap-2">
            <Cpu size={14} /> Skills
          </span>
          <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
            My Technical <span className="text-gradient bg-gradient-to-r from-neonPink to-neonPurple text-glow-purple">Arsenal</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {skills.map((skill, idx) => {
            const Icon = skill.Icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  borderColor: skill.color,
                  boxShadow: `0 10px 25px ${skill.color}20`,
                }}
                className="relative group p-6 rounded-2xl bg-white dark:bg-darkCard border border-slate-200 dark:border-darkBorder shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center cursor-default glass-card"
              >
                {/* Brand color back-shadow on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: skill.color }}
                />

                {/* Animated category tag */}
                <span className="absolute top-3 right-3 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
                  {skill.category}
                </span>

                {/* Icon Wrapper */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${skill.color}15`, 
                    color: skill.color,
                    boxShadow: `inset 0 0 10px ${skill.color}10` 
                  }}
                >
                  <Icon size={32} />
                </div>

                {/* Skill Name */}
                <h3 className="font-space text-base font-bold text-slate-800 dark:text-white group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {skill.name}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Decorative micro-note */}
        <div className="flex items-center justify-center gap-2 mt-12 text-xs font-mono text-slate-500">
          <Sparkles size={12} className="text-neonCyan" /> Hover to explore technologies
        </div>
      </div>
    </section>
  );
}
