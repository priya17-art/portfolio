import { motion } from "framer-motion";
import { Award, Star, ShieldCheck, Briefcase, Zap, CheckCircle } from "lucide-react";

export default function Achievements() {
  const stats = [
    { value: "15+", label: "Projects Completed", color: "text-neonCyan", glow: "shadow-neonCyan/10" },
    { value: "1000+", label: "Hours of Coding", color: "text-neonPurple", glow: "shadow-neonPurple/10" },
    { value: "12+", label: "Certifications", color: "text-neonPink", glow: "shadow-neonPink/10" },
    { value: "2+", label: "Internships", color: "text-neonBlue", glow: "shadow-neonBlue/10" },
  ];

  const certificates = [
    {
      title: "Data Science Specialization",
      issuer: "Coursera / IBM",
      date: "2024",
      skills: ["Data Analysis", "Python", "Data Visualization", "SQL"],
    },
    {
      title: "Full Stack Web Development",
      issuer: "Udemy Academy",
      date: "2024",
      skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    },
    {
      title: "Python Programming Foundation",
      issuer: "American College (Academic Excellence)",
      date: "2023",
      skills: ["Core Python", "OOPs", "File Handling", "Libraries"],
    },
  ];

  const internships = [
    {
      role: "Data Science Intern",
      company: "TechnoHacks EduTech",
      period: "2 months (Virtual)",
      desc: "Analyzed dataset trends, trained prediction models using Scikit-Learn, and generated visual reports using Pandas & Matplotlib.",
      badge: "Python & ML",
    },
    {
      role: "Web Development Intern",
      company: "CodSoft Agency",
      period: "1 month (Virtual)",
      desc: "Developed responsive landing pages, configured interactive UI elements in JavaScript, and integrated local storage for web apps.",
      badge: "React & JS",
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
    <section 
      id="achievements" 
      className="py-24 px-6 md:px-12 bg-slate-900/40 border-t border-slate-200/5 dark:border-white/5 relative overflow-hidden"
    >
      {/* Visual glow backgrounds */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-neonPurple/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-neonCyan/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-space text-xs font-bold uppercase tracking-widest text-neonCyan mb-3 inline-flex items-center gap-2">
            <Award size={14} /> Achievements
          </span>
          <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
            Milestones & <span className="text-gradient bg-gradient-to-r from-neonCyan to-neonPurple text-glow-purple">Credentials</span>
          </h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              key={idx}
              className={`p-6 rounded-2xl bg-white dark:bg-darkCard border border-slate-200 dark:border-darkBorder text-center shadow-lg glass-card flex flex-col justify-center items-center ${stat.glow}`}
            >
              <h3 className={`font-space text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Certifications */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="font-space text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <ShieldCheck size={22} className="text-neonCyan" /> Verified Certifications
            </h3>

            {certificates.map((cert, idx) => (
              <motion.div
                variants={cardVariants}
                whileHover={{ x: 6 }}
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-slate-200 dark:border-darkBorder shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4 glass-card"
              >
                <div className="w-10 h-10 rounded-xl bg-neonCyan/10 border border-neonCyan/30 flex items-center justify-center text-neonCyan flex-shrink-0">
                  <Award size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1 flex-wrap gap-1">
                    <h4 className="font-space text-base font-bold text-slate-800 dark:text-white group-hover:text-neonCyan">
                      {cert.title}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {cert.date}
                    </span>
                  </div>
                  
                  <div className="text-xs font-semibold text-neonPurple mb-3">
                    {cert.issuer}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((s) => (
                      <span key={s} className="text-[10px] font-mono bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-slate-500 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Internship Badges */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="font-space text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Briefcase size={22} className="text-neonPurple" /> Work Experience & Badges
            </h3>

            {internships.map((intern, idx) => (
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -4 }}
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-slate-200 dark:border-darkBorder shadow-md hover:shadow-lg transition-all duration-300 glass-card relative overflow-hidden"
              >
                {/* Visual badge top right */}
                <span className="absolute top-4 right-4 text-[9px] font-mono font-bold uppercase tracking-wider bg-neonPurple/10 text-neonPurple border border-neonPurple/30 px-2.5 py-0.5 rounded-full">
                  {intern.badge}
                </span>

                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-neonPurple/10 border border-neonPurple/30 flex items-center justify-center text-neonPurple">
                    <Star size={16} />
                  </div>
                  <div>
                    <h4 className="font-space text-base font-bold text-slate-800 dark:text-white leading-tight">
                      {intern.role}
                    </h4>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {intern.company} &bull; <span className="text-[10px]">{intern.period}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed pl-1">
                  {intern.desc}
                </p>

                {/* Micro checklist badge */}
                <div className="flex items-center gap-1.5 mt-4 text-[10px] font-mono text-neonCyan font-bold">
                  <CheckCircle size={12} /> VERIFIED INTERNSHIP SUBMISSION
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
