export function CTA() {
  return (
    <section className="py-32 border-y-4 border-foreground">
      <div className="flex flex-col items-center text-center space-y-10">
        <h2 className="text-6xl md:text-8xl font-medium tracking-tighter text-foreground leading-[0.9] max-w-4xl">
          Ready to unblock your roadmap?
        </h2>
        <p className="text-2xl text-foreground/70 max-w-2xl">
          Whether you need to rescue a failing AI prototype, migrate an Electron app, or build on Farcaster, let's scope the work.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
          <a 
            href="https://cal.com/iamzubin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-foreground text-background px-12 py-6 text-2xl tracking-tight transition-transform hover:scale-105 duration-200"
          >
            Book a scoping call
          </a>
          <a 
            href="mailto:me@iamzub.in" 
            className="border-2 border-foreground text-foreground px-12 py-6 text-2xl tracking-tight hover:bg-foreground hover:text-background transition-colors"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  )
}
