import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { PaperTexture } from '@paper-design/shaders-react'

// We will import MDX files directly or use a dynamic approach.
// For now, let's create placeholders for the MDX components.
import Holdem from './pages/case-studies/holdem.mdx'
import Ffreed from './pages/case-studies/ffreed.mdx'
import StockDesk from './pages/case-studies/stock-desk.mdx'

import { useTheme } from './components/ThemeProvider'

function PaperBackground() {
  const { isDark } = useTheme()

  // Choose realistic paper colors based on theme to maintain contrast
  const colorBack = isDark ? "#303030" : "#ccc9c9"
  const colorFront = isDark ? "#000000" : "#9fadbc"

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden">
      <PaperTexture
        width="100%"
        height="100%"
        colorBack={colorBack}
        colorFront={colorFront}
        contrast={0.35}
        roughness={0.37}
        fiber={0.02}
        fiberSize={0.008}
        crumples={0}
        crumpleSize={0}
        folds={1}
        foldCount={10}
        drops={0.01}
        fade={0}
        // seed={Math.random() * 1000}
        fit="cover"

      />
    </div>
  )
}

function GlobalSvgFilters() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none">
      <defs>
        <filter id="torn-edge" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.08" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        </filter>
      </defs>
    </svg>
  )
}
export default function App() {
  return (
    <div className="relative flex flex-col min-h-screen z-10">
      <GlobalSvgFilters />
      <PaperBackground />
      <Header />

      <main className="flex-1 w-full pt-32 pb-16 px-4 sm:px-6 mix-blend-multiply dark:mix-blend-normal dark:opacity-[0.85]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/holdem" element={<div className="prose px-6"><Holdem /></div>} />
          <Route path="/case-studies/ffreed" element={<div className="prose px-6"><Ffreed /></div>} />
          <Route path="/case-studies/stock-desk" element={<div className="prose px-6"><StockDesk /></div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
