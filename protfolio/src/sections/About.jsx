import { motion } from "framer-motion";
import { GraduationCap, MapPin, Award, BookOpen, Layers } from "lucide-react";

export default function About() {
  const education = [
    {
      degree: "B.Sc Data Science",
      institution: "American College",
      location: "Madurai, Tamil Nadu, India",
      period: "2023 - Present",
      description: "Focusing on statistical modeling, database systems, Python programming, and data mining techniques.",
      current: true,
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "State Board School",
      location: "Tamil Nadu, India",
      period: "Completed 2023",
      description: "Focused on Computer Science, Mathematics, Physics, and Chemistry.",
      current: false,
    },
  ];

  const skillBars = [
    { name: "Full Stack Web Dev", percent: 85, color: "from-neonPurple to-neonPink" },
    { name: "Data Science & Analysis", percent: 80, color: "from-neonCyan to-neonBlue" },
    { name: "Machine Learning (ML)", percent: 75, color: "from-neonPink to-neonBlue" },
    { name: "UI/UX & Graphics Design", percent: 78, color: "from-neonCyan to-neonPurple" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section 
      id="about" 
      className="py-24 px-6 md:px-12 bg-slate-900/40 border-t border-slate-200/5 dark:border-white/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-neonPink/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-space text-xs font-bold uppercase tracking-widest text-neonCyan mb-3 inline-flex items-center gap-2">
            <Layers size={14} /> About Me
          </span>
          <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
            Discover My <span className="text-gradient bg-gradient-to-r from-neonPurple to-neonCyan text-glow-cyan">Background</span>
          </h2>
        </div>

        {/* Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column: Biography & Technical progress */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-darkCard border border-slate-200 dark:border-darkBorder shadow-lg glass-card flex flex-col justify-between"
          >
            <div>
              <h3 className="font-space text-2xl font-bold text-slate-800 dark:text-white mb-4">
                Biography
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                I am Kavi Priya, currently pursuing my B.Sc in Data Science at **American College** in Madurai, Tamil Nadu. My passion lies in extracting insights from complex datasets and building highly functional web applications.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                By combining full-stack development skills with statistical modeling, I build intelligent interfaces and data-driven systems. I enjoy creating visually beautiful user interfaces and leveraging databases to back them.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-600 dark:text-slate-300 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                  <MapPin size={13} className="text-neonPink" /> Tamil Nadu, India
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                  <BookOpen size={13} className="text-neonCyan" /> American College
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                  <Award size={13} className="text-neonPurple" /> Data Science Student
                </div>
              </div>
            </div>

            {/* Competency Bars */}
            <div className="space-y-5">
              <h4 className="font-space text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Core Competencies
              </h4>
              {skillBars.map((bar, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                    <span>{bar.name}</span>
                    <span>{bar.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${bar.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Education Timeline */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-darkCard border border-slate-200 dark:border-darkBorder shadow-lg glass-card"
          >
            <h3 className="font-space text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
              <GraduationCap size={24} className="text-neonPurple" /> Education Journey
            </h3>
            
            <div className="relative border-l border-slate-200 dark:border-white/10 pl-6 ml-2 space-y-10">
              {education.map((edu, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <span className={`absolute -left-[31px] top-1.5 w-[11px] h-[11px] rounded-full ${
                    edu.current 
                      ? "bg-neonCyan ring-4 ring-neonCyan/20 shadow-md shadow-neonCyan" 
                      : "bg-slate-400 dark:bg-white/20"
                  }`} />

                  {/* Period tag */}
                  <div className="inline-block text-[11px] font-bold font-mono px-2 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 mb-2">
                    {edu.period}
                  </div>

                  {/* Title & Organization */}
                  <h4 className="font-space text-lg font-bold text-slate-800 dark:text-white leading-tight">
                    {edu.degree}
                  </h4>
                  <div className="text-xs font-semibold text-neonPurple mb-3">
                    {edu.institution} &bull; <span className="text-slate-500">{edu.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
