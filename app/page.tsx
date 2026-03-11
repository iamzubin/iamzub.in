'use client'
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'
import { motion } from 'motion/react'
import {
  EMAIL,
  PROJECTS,
  SOCIAL_LINKS,
  WORK_EXPERIENCE
} from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
}

function HandDrawnBox({ 
  children, 
  className = "", 
  bgColor = "bg-white",
  accentColor = "bg-fumayo-blue"
}: { 
  children: React.ReactNode, 
  className?: string, 
  bgColor?: string,
  accentColor?: string
}) {
  return (
    <div className={`group relative border-[1.5px] border-[#1a1a1a] dark:border-zinc-800 ${bgColor} dark:bg-dark-card transition-all duration-500 hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,0.05)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.02)] ${className}`}>
      {/* Top Accent Strip */}
      <div className={`h-1.5 w-full ${accentColor} border-b-[1.5px] border-[#1a1a1a] dark:border-zinc-800`} />
      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle, color = "text-fumayo-red" }: { title: string, subtitle?: string, color?: string }) {
  return (
    <div className="space-y-2 mb-16">
      <div className="flex items-center gap-4">
        <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight">{title}</h2>
        <div className="h-px flex-1 bg-[#1a1a1a]/10 dark:bg-zinc-800" />
      </div>
      {subtitle && (
        <p className="font-gaegu text-lg md:text-xl opacity-60 max-w-md">{subtitle}</p>
      )}
    </div>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-48 pb-48 relative"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section
        variants={VARIANTS_SECTION}
        className="relative"
      >
        <div className="relative z-10 space-y-12">
          <div className="space-y-4">
            <p className="font-gaegu text-xl md:text-2xl text-fumayo-red dark:text-red-400 rotate-[-2deg] inline-block mb-4">
              Hello, I'm Zubin Sharma —
            </p>
            <h1 className="text-6xl md:text-[120px] font-serif leading-[0.85] tracking-tighter text-[#1a1a1a] dark:text-white uppercase">
              Digital<br />
              <span className="italic">Discovery</span><br />
              thru Code.
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-12 border-t-[1.5px] border-[#1a1a1a]/10 dark:border-zinc-800">
            <p className="text-xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-400 max-w-2xl leading-tight">
              Software Developer & Designer crafting tools and interfaces for the decentralized web and creative industries.
            </p>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Available — 2026</div>
              <div className="font-serif italic text-2xl md:text-3xl">Hyderabad, IN</div>
            </div>
          </div>
        </div>
        
        {/* Margin Doodle */}
        <div className="absolute top-0 right-[-80px] hidden xl:block opacity-20 pointer-events-none">
          <span className="text-[200px] select-none">🐸</span>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section id="projects" variants={VARIANTS_SECTION}>
        <SectionHeader 
          title="Selected Work" 
          subtitle="A collection of tools and experiments built with focus on clarity and usability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className={`${idx % 2 !== 0 ? 'md:translate-y-24' : ''}`}>
              <HandDrawnBox 
                accentColor={idx % 3 === 0 ? 'bg-fumayo-green' : idx % 3 === 1 ? 'bg-fumayo-blue' : 'bg-fumayo-red'}
                className="h-full flex flex-col"
              >
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-serif italic tracking-tight">{project.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">0{idx + 1}</span>
                  </div>
                  
                  <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900 border-[1.5px] border-[#1a1a1a] dark:border-zinc-800 overflow-hidden shadow-sm">
                    {project.mediaType === 'video' ? (
                      <video 
                        src={project.media} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <img 
                        src={project.media} 
                        alt={project.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                      />
                    )}
                  </div>

                  <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 flex-1">
                    {project.description}
                  </p>

                  <div className="pt-8 mt-auto border-t border-dashed border-[#1a1a1a]/10 dark:border-zinc-800 flex justify-between items-center">
                    <div className="flex gap-4">
                      {['React', 'Web3', 'Design'].map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{tag}</span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      {...(project.linkTab && { target: "_blank" })}
                      className="p-3 rounded-full border-[1.5px] border-[#1a1a1a] dark:border-zinc-800 hover:bg-[#1a1a1a] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                      <ArrowRightIcon className="h-4 w-4 -rotate-45" />
                    </a>
                  </div>
                </div>
              </HandDrawnBox>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section id="experience" variants={VARIANTS_SECTION}>
        <SectionHeader 
          title="Career Path" 
          subtitle="Experience gained through open source, startups, and independent research."
        />

        <div className="border-[1.5px] border-[#1a1a1a] dark:border-zinc-800 bg-white dark:bg-dark-card shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-[1fr_2fr_1.5fr] gap-8 p-6 bg-zinc-50 dark:bg-zinc-900 border-b-[1.5px] border-[#1a1a1a] dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
            <div>Period</div>
            <div>Company / Role</div>
            <div className="text-right">Link</div>
          </div>
          <div className="divide-y-[1.5px] divide-[#1a1a1a]/10 dark:divide-zinc-800">
            {WORK_EXPERIENCE.map((job) => (
              <a 
                key={job.id} 
                href={job.link} 
                target="_blank"
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-4 md:gap-8 p-8 md:p-10 group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors relative"
              >
                <div className="text-xl font-serif italic text-fumayo-blue dark:text-blue-400">
                  {job.start} — {job.end}
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold uppercase tracking-tight group-hover:text-fumayo-red transition-colors">
                    {job.company}
                  </h4>
                  <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium">
                    {job.title}
                  </p>
                </div>
                <div className="flex items-center justify-start md:justify-end gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Reference <ExternalLinkIcon className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section variants={VARIANTS_SECTION} className="relative">
        <HandDrawnBox 
          bgColor="bg-fumayo-yellow dark:bg-yellow-500/10" 
          accentColor="bg-black dark:bg-white"
          className="p-12 md:p-24"
        >
          <div className="flex flex-col md:flex-row gap-24 items-center">
            <div className="flex-1 space-y-8">
              <h3 className="text-5xl md:text-8xl font-serif italic leading-[0.85] tracking-tight">
                Let's make<br />something<br /><span className="text-fumayo-red dark:text-red-400 underline decoration-[3px] underline-offset-[8px]">memorable.</span>
              </h3>
              <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400 max-w-md">
                Always open to new projects, collaborations, and conversations about the future of the web.
              </p>
            </div>
            
            <div className="w-full md:w-auto space-y-12">
              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Direct Contact</div>
                <a href={`mailto:${EMAIL}`} className="text-2xl md:text-4xl font-bold border-b-2 border-[#1a1a1a] dark:border-white hover:text-fumayo-blue transition-colors">
                  {EMAIL}
                </a>
              </div>
              
              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Socials</div>
                <div className="flex flex-wrap gap-x-8 gap-y-4 font-bold uppercase text-xs tracking-widest">
                  {SOCIAL_LINKS.map(link => (
                    <a key={link.label} href={link.link} target="_blank" className="hover:text-fumayo-red transition-colors border-b border-transparent hover:border-fumayo-red">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </HandDrawnBox>
        
        {/* Decorative Doodles */}
        <div className="absolute bottom-[-100px] left-[-40px] opacity-10 pointer-events-none">
          <span className="text-[150px] font-serif italic">§</span>
        </div>
      </motion.section>
    </motion.main>
  )
}
