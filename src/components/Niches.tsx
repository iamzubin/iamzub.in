import { motion } from 'framer-motion'

const niches = [
  {
    id: "vibe-coding",
    title: "Vibe Coding Rescue",
    description: "Hardening AI-scaffolded apps into production-grade Next.js systems.",
    points: [
      "Fixing broken authentication states",
      "Implementing proper Row Level Security",
      "Resolving concurrent user load failures",
      "Refactoring fragile UI to scalable TS"
    ],
    metric: "Turn brittle prototypes into secure platforms."
  },
  {
    id: "tauri",
    title: "Tauri Desktop Arch.",
    description: "Migrating bloated Electron apps to high-performance Rust/Tauri.",
    points: [
      "Replacing heavy Chromium runtimes",
      "Writing safe, concurrent backend logic in Rust",
      "Resolving laptop battery drain",
      "Drastically shrinking installer sizes"
    ],
    metric: "Up to 96% smaller bundles, 80% less RAM."
  },
  {
    id: "web3",
    title: "Farcaster Mini Apps",
    description: "Building native Web3 infrastructure and Mini Apps on Farcaster.",
    points: [
      "Full-screen Mini Apps with SDK",
      "Seamless onboarding via Smart Wallets",
      "Next.js, OnchainKit, Wagmi integrations",
      "High-signal Bountycaster attestations"
    ],
    metric: "Direct distribution to 60K+ active users."
  }
]

export function Niches() {
  return (
    <section id="services" className="space-y-16">
      <div className="space-y-6 max-w-3xl">
        <h2 className="text-5xl md:text-6xl tracking-tighter text-foreground border-b-2 border-foreground inline-block pb-2">Specialized Services.</h2>
        <p className="text-2xl text-foreground/80 leading-relaxed">I don't build generic websites. I partner with teams to execute technically complex migrations and rescues in three core areas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-foreground/20">
        {niches.map((niche, i) => (
          <motion.div 
            key={niche.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-8 border-b border-r border-foreground/20 flex flex-col h-full hover:bg-foreground/5 transition-colors"
          >
            <h3 className="text-3xl tracking-tight text-foreground mb-4">{niche.title}</h3>
            <p className="text-lg text-foreground/70 mb-8 flex-1">{niche.description}</p>
            
            <ul className="space-y-4 mb-10">
              {niche.points.map((point, j) => (
                <li key={j} className="flex items-start gap-3 text-lg text-foreground/90 border-b border-foreground/10 pb-2">
                  <span className="text-foreground/40 mt-1 text-sm">/</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-6 mt-auto">
              <span className="text-lg italic text-foreground tracking-tight">{niche.metric}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
