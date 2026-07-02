import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="flex flex-col items-start gap-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-lg tracking-tight uppercase border-b border-foreground/30 pb-2 inline-block"
      >
        Full-Stack Architect & Web3 Specialist
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter text-foreground max-w-4xl"
      >
        I solve the engineering problems that break startup timelines.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl md:text-3xl text-foreground/80 max-w-3xl leading-snug mt-6"
      >
        I specialize in hardening AI-scaffolded apps for production, migrating bloated Electron desktops to Tauri, and building native Web3 infrastructure on Farcaster.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center gap-6 mt-8"
      >
        <a 
          href="https://cal.com/iamzubin" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-xl transition-colors hover:bg-foreground/90 hover:scale-105 duration-200"
        >
          Book a scoping call
          <ArrowRight size={20} />
        </a>
      </motion.div>
    </section>
  )
}
