export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-foreground/10">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-semibold text-2xl tracking-tighter">
          <a href="/" className="hover:opacity-70 transition-opacity">
            Zubin.
          </a>
        </div>
        
        <nav className="flex items-center gap-8">
          <a href="/#services" className="text-lg hover:italic transition-all hidden sm:block">
            Services
          </a>
          <a href="/#work" className="text-lg hover:italic transition-all hidden sm:block">
            Work
          </a>
          <a 
            href="https://cal.com/iamzubin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg font-medium border border-foreground px-6 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  )
}
