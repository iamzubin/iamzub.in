'use client'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import { Spotlight } from '@/components/ui/spotlight'
import { XIcon, Terminal, Activity, Cpu, Shield, Globe, Mail, Code } from 'lucide-react'
import { motion } from 'motion/react'
import { Fragment, useState, useEffect } from 'react'
import { CompactConnectForm } from './components/ui/compact-connect-form'
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
  hidden: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
}

function TechnicalHeader({ title, label }: { title: string; label?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-3 py-1.5">
      <div className="flex items-center gap-2">
        <Terminal className="h-3.5 w-3.5 text-zinc-500" />
        <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">{title}</span>
      </div>
      {label && (
        <span className="text-[10px] text-zinc-500 font-mono italic">[{label}]</span>
      )}
    </div>
  )
}

function Module({ children, title, label, className = "" }: { children: React.ReactNode; title: string; label?: string; className?: string }) {
  return (
    <motion.div
      variants={VARIANTS_SECTION}
      className={`technical-border overflow-hidden bg-zinc-950/20 backdrop-blur-sm ${className}`}
    >
      <TechnicalHeader title={title} label={label} />
      <div className="p-4">{children}</div>
    </motion.div>
  )
}

function StatusIndicator({ label, value, color = "text-green-500" }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between text-[10px] font-mono border-b border-zinc-800/50 py-1 last:border-0">
      <span className="text-zinc-500">{label}</span>
      <span className={color}>{value}</span>
    </div>
  )
}

function ProjectMedia({ src }: { src: string }) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.indexOf('cloudinary') !== -1;
  const isImage = src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png') || src.endsWith('.gif') || src.endsWith('.webp');

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="aspect-video w-full cursor-zoom-in rounded-sm object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        ) : isImage ? (
          <img
            src={src}
            alt="Project screenshot"
            className="aspect-video w-full cursor-zoom-in rounded-sm object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="aspect-video w-full rounded-sm bg-zinc-900 flex items-center justify-center">
            <Activity className="h-6 w-6 text-zinc-700 animate-pulse" />
          </div>
        )}
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-none bg-zinc-950 p-1 ring-1 ring-zinc-800">
          {isVideo ? (
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="aspect-video h-[50vh] w-full md:h-[70vh]"
            />
          ) : isImage ? (
            <img
              src={src}
              alt="Project screenshot"
              className="aspect-video h-[50vh] w-full object-contain md:h-[70vh]"
            />
          ) : (
            <div className="aspect-video h-[50vh] w-full bg-zinc-900 flex items-center justify-center md:h-[70vh]">
              No media available
            </div>
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-none bg-zinc-900 border border-zinc-800 p-2"
        >
          <XIcon className="h-5 w-5 text-zinc-300" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default function Personal() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.main
      className="grid grid-cols-1 md:grid-cols-12 gap-4 font-mono pb-20"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* SCANLINES OVERLAY */}
      <div className="scanlines opacity-[0.03] pointer-events-none" />

      {/* TOP HEADER MODULE */}
      <Module title="SYSTEM_STATUS" className="md:col-span-12" label="v2.0.4b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="hidden sm:grid grid-cols-3 grid-rows-3 gap-0.5 w-9 h-9 opacity-80">
              {[...Array(9)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-full h-full ${[0, 1, 2, 4, 6, 8].includes(i) ? 'bg-zinc-100' : 'bg-transparent'} ${[1, 4, 7].includes(i) ? 'animate-pulse' : ''}`}
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <div className="space-y-1">
              <motion.h1 
                className="text-xl font-bold tracking-tighter uppercase text-zinc-100"
                animate={{
                  textShadow: [
                    "0px 0px 0px rgba(0,255,0,0)",
                    "2px 0px 0px rgba(0,255,0,0.5)",
                    "-2px 0px 0px rgba(255,0,0,0.5)",
                    "0px 0px 0px rgba(0,255,0,0)"
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  times: [0, 0.02, 0.04, 0.06]
                }}
              >
                Zubin Choudhary <span className="text-zinc-500 font-normal">/ Software Engineer</span>
              </motion.h1>
              <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
                Freelance Full-Stack Developer — Specializing in robust web apps, smart contracts, and custom internal tools. Bridge between logic and aesthetics.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-1 min-w-[150px]">
            <StatusIndicator label="LOCATION" value="IN_PUN" />
            <StatusIndicator label="TIME" value={time} />
            <StatusIndicator label="STATUS" value="AVAIL_FOR_HIRE" color="text-yellow-500 animate-pulse" />
            <StatusIndicator label="UPLINK" value="ENCRYPTED" />
          </div>
        </div>
      </Module>

      {/* LEFT COLUMN */}
      <div className="md:col-span-4 space-y-4">
        <Module title="EXPERIENCE_LOG">
          <div className="space-y-4">
            {WORK_EXPERIENCE.map((job) => (
              <a
                key={job.id}
                href={job.link}
                target="_blank"
                className="group block relative p-3 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xs font-bold text-zinc-200 uppercase group-hover:text-green-500 transition-colors">{job.title}</h4>
                  <span className="text-[9px] text-zinc-600">{job.start} - {job.end}</span>
                </div>
                <p className="text-[11px] text-zinc-500">{job.company}</p>
                <div className="absolute top-0 right-0 w-1 h-0 bg-green-500 group-hover:h-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </Module>

        <Module title="SYSTEM_CAPS">
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Code, label: "React/Next.js" },
              { icon: Shield, label: "Solidity/EVM" },
              { icon: Globe, label: "Node.js/Go" },
              { icon: Cpu, label: "TypeScript" },
            ].map((cap, i) => (
              <div key={i} className="flex items-center gap-2 p-2 border border-zinc-900 bg-zinc-900/20">
                <cap.icon className="h-3 w-3 text-zinc-600" />
                <span className="text-[10px] text-zinc-400 uppercase tracking-tight">{cap.label}</span>
              </div>
            ))}
          </div>
        </Module>

        <Module title="UPLINK_CHANNELS">
          <div className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.link}
                target="_blank"
                className="text-[10px] uppercase font-bold px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-500 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Module>
      </div>

      {/* RIGHT COLUMN */}
      <div className="md:col-span-8 space-y-4">
        <Module title="PROJECT_REGISTRY" label="ACTIVE_DEPLOYMENTS">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group flex flex-col border border-zinc-800/50 bg-zinc-900/10 hover:border-zinc-700 transition-colors">
                <div className="relative aspect-video overflow-hidden border-b border-zinc-800">
                  <ProjectMedia src={project.media} />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 border border-zinc-800 text-[8px] text-zinc-500 uppercase tracking-widest backdrop-blur-md">
                    SRC_{project.mediaType}
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <a
                    href={project.link}
                    target={project.linkTab ? "_blank" : "_self"}
                    className="text-xs font-bold text-zinc-200 uppercase flex items-center justify-between group-hover:text-green-500 transition-colors"
                  >
                    {project.name}
                    <Activity className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Module>

        <Module title="TERMINAL_MSG" label="CONNECT">
          <div className="space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed border-l-2 border-zinc-800 pl-3 py-1">
              Initiate contact for collaborative engineering, system architecture, or full-stack dApp development.
              Awaiting transmission...
            </p>
            <div className="bg-zinc-950 p-2 border border-zinc-900">
               <CompactConnectForm />
            </div>
          </div>
        </Module>
      </div>

      <div className="md:col-span-12">
        <div className="halftone h-12 w-full opacity-[0.05] mt-10" />
      </div>
    </motion.main>
  )
}
