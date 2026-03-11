'use client'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function Header() {
  return (
    <header className="mb-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
      <div className="flex items-center gap-12">
        {/* Simplified Premium Logo */}
        <Link href="/" className="group relative flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-[#1a1a1a] dark:border-white bg-fumayo-yellow text-[10px] font-bold leading-none transition-transform hover:scale-105">
           <div className="grid grid-cols-2 grid-rows-2 -ml-0.5 group-hover:rotate-12 transition-transform">
              <span className="text-fumayo-red">ZU</span>
              <span className="text-fumayo-blue">B</span>
              <span className="text-fumayo-green">IN</span>
           </div>
           {/* Floating Badge */}
           <div className="absolute -top-2 -right-4 bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-2 py-0.5 rounded-full text-[8px] uppercase tracking-widest font-black">
             Dev
           </div>
        </Link>
        
        <nav className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
          <Link href="#projects" className="hover:text-fumayo-red hover:opacity-100 transition-all">Projects</Link>
          <Link href="#experience" className="hover:text-fumayo-blue hover:opacity-100 transition-all">Experience</Link>
          <Link href="mailto:me@iamzub.in" className="hover:text-fumayo-green hover:opacity-100 transition-all">Contact</Link>
        </nav>
      </div>

      <div className="flex flex-col items-start md:items-end gap-1">
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            Based in India <span className="h-1 w-1 rounded-full bg-fumayo-green animate-pulse" />
         </div>
         <div className="flex gap-4 items-center">
            <a href="https://x.com/iamzub_in" target="_blank" className="text-lg font-serif italic hover:text-fumayo-blue transition-colors flex items-center gap-1">
              @iamzub_in <ArrowUpRight className="h-3 w-3" />
            </a>
         </div>
      </div>
    </header>
  )
}
