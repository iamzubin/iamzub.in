import { motion } from 'framer-motion'

const writings = [
  {
    title: "Browser-side Audio & Memory Management",
    date: "2026",
    description: "Messing around with audio files and managing memory in the browser while running FFmpeg via WebAssembly. Deep dive into handling large buffers without crashing the tab.",
    link: "https://github.com/iamzubin/StemPlayer"
  },
  {
    title: "From Electron to Tauri: Shrinking Bundles by 96%",
    date: "2026",
    description: "A technical breakdown of migrating desktop architecture to Rust to solve laptop battery drain and memory hogs.",
    link: "#"
  }
]

export function Writing() {
  return (
    <section id="writing" className="space-y-16">
      <div className="space-y-6">
        <h2 className="text-5xl md:text-6xl tracking-tighter text-foreground border-b-2 border-foreground inline-block pb-2">
          Engineering Logs.
        </h2>
      </div>

      <div className="border-y-2 border-foreground divide-y-2 divide-foreground/20">
        {writings.map((post, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group block py-12 hover:bg-foreground/5 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 px-4">
              <div className="space-y-4 max-w-4xl">
                <div className="flex items-center gap-4">
                  <span className="text-lg italic text-foreground/50">{post.date}</span>
                  <h3 className="text-3xl md:text-4xl tracking-tight text-foreground group-hover:italic transition-all">{post.title}</h3>
                </div>
                <p className="text-xl text-foreground/70 leading-relaxed md:ml-16">{post.description}</p>
              </div>
              
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex text-lg uppercase tracking-widest border-b-2 border-foreground pb-1 whitespace-nowrap"
              >
                Read Post
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
