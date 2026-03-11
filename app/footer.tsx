'use client'
import { cn } from '@/lib/utils'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-3.5 w-3.5" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-3.5 w-3.5" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-3.5 w-3.5" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-8 w-24 bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
  }

  return (
    <div className="flex p-1 bg-white dark:bg-dark-card border-[1.5px] border-[#1a1a1a] dark:border-zinc-800 shadow-sm">
      {THEMES_OPTIONS.map((option) => {
        const isActive = theme === option.id
        return (
          <button
            key={option.id}
            className={cn(
              "flex h-7 w-7 items-center justify-center transition-all duration-300",
              isActive 
                ? "bg-fumayo-yellow text-black border border-[#1a1a1a]" 
                : "text-zinc-400 hover:text-black dark:hover:text-white"
            )}
            type="button"
            aria-label={`Switch to ${option.label} theme`}
            onClick={() => setTheme(option.id)}
          >
            {option.icon}
          </button>
        )
      })}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="py-32 mt-48 border-t-[1.5px] border-[#1a1a1a]/10 dark:border-zinc-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="space-y-8 max-w-sm">
          <Link href="/" className="text-3xl font-serif italic tracking-tight">iamzubin.in</Link>
          <p className="font-gaegu text-xl leading-relaxed opacity-60">
            A portfolio documenting the discovery of new tools, interfaces, and experiments in the digital realm.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6">
          <nav className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
            <Link href="#projects" className="hover:opacity-100">Work</Link>
            <Link href="#experience" className="hover:opacity-100">Timeline</Link>
            <Link href="https://github.com/iamzubin" target="_blank" className="hover:opacity-100">GitHub</Link>
            <Link href="https://x.com/iamzub_in" target="_blank" className="hover:opacity-100">Twitter</Link>
          </nav>
          
          <div className="flex items-center gap-12">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
              © 2026 — Zubin Sharma
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}
