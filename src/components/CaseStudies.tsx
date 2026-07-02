import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'

const studies = [
  {
    title: "Holdem",
    category: "Tauri Desktop App",
    description: "A high-performance desktop utility for smoother file workflows. Built with Rust and Tauri, replacing the heavy Electron alternative. Grown as an open-source product with 130+ GitHub stars.",
    image: "https://iamzub.in/assets/holdem.gif",
    link: "/case-studies/holdem",
    externalLink: "https://holdem.iamzub.in",
    externalLinkText: "Download",
    metrics: ["130+ GitHub Stars", "Rust Backend", "Native OS Integration"]
  },
  {
    title: "Burner Wallet",
    category: "Web3 Hardware Integration",
    description: "A web interface for Burner NFC hardware wallets. Features tap-to-sign transactions, WalletConnect integration, and abstracts away seed phrases for consumer-grade UX.",
    image: "https://iamzub.in/assets/ffreed-image.jpg",
    link: "/case-studies/ffreed",
    metrics: ["NFC Integration", "WalletConnect", "Seedless Auth"]
  },
  {
    title: "StockDesk",
    category: "Internal Tooling",
    description: "An internal product for a furniture retailer that simplified live stock checks and booking workflows, reducing operational friction on the warehouse floor.",
    image: "https://iamzub.in/assets/F3/ScreenShot4.png",
    link: "/case-studies/stock-desk",
    metrics: ["Live Inventory", "Workflow Automation", "Retail Ops"]
  },
  {
    title: "StemPlayer",
    category: "WebAssembly Audio",
    description: "A browser-based audio stem player allowing users to manipulate individual tracks in real-time. Leverages WebAudio API and complex memory management for FFmpeg WASM processing.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop",
    link: "https://stem-player-ecru.vercel.app/",
    metrics: ["FFmpeg WASM", "Memory Management", "WebAudio API"]
  }
]

export function CaseStudies() {
  return (
    <section id="work" className="space-y-16">
      <div className="space-y-6">
        <h2 className="text-5xl md:text-6xl tracking-tighter text-foreground border-b-2 border-foreground inline-block pb-2">Selected Work.</h2>
        <p className="text-2xl text-foreground/80 max-w-3xl leading-relaxed">Proof of work across desktop architecture, Web3 integrations, and complex internal systems.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-l border-foreground/20">
        {studies.map((study, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col border-b border-r border-foreground/20 p-8 hover:bg-foreground/5 transition-colors"
          >
            <div className="relative border-2 border-foreground overflow-hidden mb-8 w-full aspect-[4/3]">
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 mix-blend-multiply dark:mix-blend-screen"
              />
            </div>
            
            <div className="space-y-6 flex-1 flex flex-col">
              <div className="flex items-end justify-between border-b border-foreground/20 pb-4">
                <h3 className="text-4xl tracking-tighter text-foreground">{study.title}</h3>
                <span className="text-lg italic text-foreground/60">{study.category}</span>
              </div>
              <p className="text-xl text-foreground/80 leading-relaxed flex-1">{study.description}</p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {study.metrics.map((metric, j) => (
                  <span key={j} className="text-sm uppercase tracking-widest text-foreground/60 border border-foreground/20 px-3 py-1">
                    {metric}
                  </span>
                ))}
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-6">
                {study.link.startsWith('http') ? (
                  <a href={study.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg uppercase tracking-widest border-b-2 border-foreground hover:italic transition-all pb-1">
                    View Live <FaGithub size={16} className="ml-2" />
                  </a>
                ) : (
                  <Link to={study.link} className="inline-flex items-center gap-2 text-lg uppercase tracking-widest border-b-2 border-foreground hover:italic transition-all pb-1">
                    Read Case Study
                  </Link>
                )}
                
                {study.externalLink && (
                  <a href={study.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg uppercase tracking-widest border-b-2 border-foreground hover:italic transition-all pb-1">
                    {study.externalLinkText || "Visit"}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
