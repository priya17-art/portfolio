import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(onComplete, 600); // Trigger completion after exit animation
          }, 400);
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100svh", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03001e] text-white"
        >
          {/* Futuristic grid background in loader */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          
          <div className="relative flex flex-col items-center max-w-md px-6 text-center z-10">
            {/* Pulsing glow ring */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                borderColor: ["rgba(168, 85, 247, 0.4)", "rgba(6, 182, 212, 0.8)", "rgba(168, 85, 247, 0.4)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full border border-dashed flex items-center justify-center mb-8"
            >
              <span className="text-xl font-mono text-neonCyan font-bold">{count}%</span>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-space text-2xl font-bold tracking-widest text-gradient bg-gradient-to-r from-neonPurple via-neonPink to-neonCyan uppercase">
                S. Kavi Priya
              </h1>
              <p className="text-gray-400 font-mono text-xs mt-2 tracking-wider">
                DATA SCIENCE & FULL STACK PORTFOLIO
              </p>
            </motion.div>

            {/* Bottom progress bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-12">
              <motion.div
                className="h-full bg-gradient-to-r from-neonPurple via-neonPink to-neonCyan"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px] text-gray-500 font-mono mt-4 tracking-widest uppercase"
            >
              Initializing Core Modules...
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
