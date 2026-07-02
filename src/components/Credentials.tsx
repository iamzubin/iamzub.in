import { motion } from 'framer-motion'

const credentials = [
  {
    title: "Google Summer of Code Alumni",
    description: "Contributed to Fedora/Red Hat tools and API migrations."
  },
  {
    title: "Microsoft Imagine Cup Finalist",
    description: "2020 Asia Regional Finalist with Team TAZS."
  },
  {
    title: "10+ Hackathon Wins",
    description: "Consistent high-performer including ETHGlobal victories."
  }
]

export function Credentials() {
  return (
    <section className="py-16 border-y-2 border-foreground">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-foreground/20">
        {credentials.map((cred, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="pt-6 md:pt-0 md:px-8 first:pt-0 first:md:pl-0 last:md:pr-0"
          >
            <h4 className="text-2xl tracking-tight text-foreground">{cred.title}</h4>
            <p className="text-lg text-foreground/70 mt-3">{cred.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
