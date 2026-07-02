import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { PaperLayer } from './PaperLayer'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="p-4 sm:p-6 mt-16">
      <PaperLayer seedOffset={20} className="w-[95%] max-w-7xl mx-auto">
        <div className="px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t-2 border-foreground/10 sm:border-none">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-3xl tracking-tighter font-medium">Zubin.</span>
            <span className="text-foreground/60 text-lg italic">© {currentYear} All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="https://github.com/iamzubin" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-50 transition-opacity">
              <span className="sr-only">GitHub</span>
              <FaGithub size={28} />
            </a>
            <a href="https://twitter.com/iamzub_in" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-50 transition-opacity">
              <span className="sr-only">Twitter</span>
              <FaTwitter size={28} />
            </a>
            <a href="https://linkedin.com/in/iamzubin" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-50 transition-opacity">
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </PaperLayer>
    </footer>
  )
}
