'use client'
import { TextLoop } from '@/components/ui/text-loop'
import { Activity } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-900 pt-6 pb-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase font-mono tracking-widest text-zinc-600">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
             <Activity className="h-3 w-3 text-green-500 animate-pulse" />
             <span>System_Operational</span>
           </div>
           <span>//</span>
           <a href="https://github.com/iamzubin" target="_blank" className="hover:text-zinc-300 transition-colors">
             © 2026 Zubin_Choudhary
           </a>
        </div>

        <div className="flex items-center gap-4">
           <TextLoop>
             <span>Latency: 24ms</span>
             <span>Region: ASIA-SOUTH-1</span>
             <span>Protocol: HTTPS/TLS_1.3</span>
             <span>Uptime: 99.9%</span>
           </TextLoop>
           <span>//</span>
           <span>v2.0.4-LTS</span>
        </div>
      </div>
    </footer>
  )
}
