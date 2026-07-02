import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

// We will import MDX files directly or use a dynamic approach.
// For now, let's create placeholders for the MDX components.
import Holdem from './pages/case-studies/holdem.mdx'
import Ffreed from './pages/case-studies/ffreed.mdx'
import StockDesk from './pages/case-studies/stock-desk.mdx'

export default function App() {
  return (
    <div className="relative flex flex-col min-h-screen z-10">
      <Header />
      
      <main className="flex-1 w-full pt-32 pb-16">
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
