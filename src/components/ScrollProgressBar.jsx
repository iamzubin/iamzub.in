import { useState, useEffect } from 'react'

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 100)
      const scrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        const progress = (scrollY / scrollHeight) * 100
        setScrollProgress(progress)
      } else {
        setScrollProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="progress-bar"
      style={{ transform: `translateX(${scrollProgress - 100}%)` }}
      aria-hidden="true"
    />
  )
}
