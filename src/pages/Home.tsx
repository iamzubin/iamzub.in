import { Hero } from '../components/Hero'
import { Niches } from '../components/Niches'
import { CaseStudies } from '../components/CaseStudies'
import { Writing } from '../components/Writing'
import { Credentials } from '../components/Credentials'
import { CTA } from '../components/CTA'

export function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 space-y-40">
      <Hero />
      <Credentials />
      <Niches />
      <CaseStudies />
      <Writing />
      <CTA />
    </div>
  )
}
