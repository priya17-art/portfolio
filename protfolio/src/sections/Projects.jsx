import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Full Stack", "Frontend", "Design"];

  const projects = [
    {
      title: "Sweet Cupcake Shop Website",
      description: "An interactive, fully responsive e-commerce interface for a bakery. Includes a dynamic shopping cart, search filters, and smooth sliding animations.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "Context API"],
      category: "Frontend",
      liveUrl: "https://example.com",
      gitUrl: "https://github.com",
      gradient: "from-pink-500 via-rose-400 to-amber-300",
    },
    {
      title: "Jewellery Shop Website",
      description: "A premium jewelry showcase website with user authentication, database integration for inventory management, and an administration panel.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      category: "Full Stack",
      liveUrl: "https://example.com",
      gitUrl: "https://github.com",
      gradient: "from-amber-400 via-yellow-500 to-indigo-700",
    },
    {
      title: "NP Hotel Online Booking Website",
      description: "A complete hospitality platform allowing customers to check room availability, book stays, manage accounts, and make secure digital check-ins.",
      tech: ["React", "Express", "Node.js", "MongoDB", "JWT", "Stripe"],
      category: "Full Stack",
      liveUrl: "https://example.com",
      gitUrl: "https://github.com",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    },
    {
      title: "Creative Logo Designing Website",
      description: "A showcase portfolio for custom vector graphic designs. Users can review design packages, request custom orders, and download SVG vectors.",
      tech: ["HTML5", "CSS3", "JavaScript", "Figma", "SVG Vector"],
      category: "Design",
      liveUrl: "https://example.com",
      gitUrl: "https://github.com",
      gradient: "from-purple-500 via-fuchsia-400 to-cyan-400",
    },
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(proj => proj.category === filter);

  return (
    <section 
      id="projects" 
      className="py-24 px-6 md:px-12 bg-slate-900/40 border-t border-slate-200/5 dark:border-white/5 relative overflow-hidden"
    >
      {/* Glow backgrounds */}
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-neonCyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="font-space text-xs font-bold uppercase tracking-widest text-neonCyan mb-3 inline-flex items-center gap-2">
            <FolderGit2 size={14} /> Projects
          </span>
          <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
            My Creative <span className="text-gradient bg-gradient-to-r from-neonCyan to-neonBlue text-glow-cyan">Creations</span>
          </h2>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-5 py-2.5 rounded-full font-space text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? "text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5"
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-neonPurple to-neonCyan rounded-full -z-10 shadow-md shadow-neonPurple/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={project.title}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white dark:bg-darkCard border border-slate-200 dark:border-darkBorder shadow-lg overflow-hidden glass-card transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Banner Area */}
                <div className={`h-48 sm:h-56 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                  {/* Decorative digital overlays */}
                  <div className="absolute inset-0 bg-slate-950/20 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  
                  {/* Abstract glowing circle */}
                  <div className="w-32 h-32 rounded-full bg-white/10 blur-xl group-hover:scale-125 transition-transform duration-500" />
                  
                  {/* Floating category tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    {project.category}
                  </span>

                  {/* Icon overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer"
                      title="GitHub Repository"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-space text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-neonCyan dark:group-hover:text-neonCyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 group-hover:border-neonCyan/30 group-hover:text-neonCyan transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Mobile visible action links (falls back from hover screen) */}
                    <div className="flex items-center gap-4 border-t border-slate-200/50 dark:border-white/5 pt-4 md:hidden">
                      <a
                        href={project.gitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-neonCyan"
                      >
                        <Github size={14} /> GitHub
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-neonCyan"
                      >
                        <ExternalLink size={14} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
