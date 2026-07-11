import { useState, useCallback, useEffect, useRef } from 'react'
import EyesSVG from './assets/eyes.svg?react'
import EyesDownSVG from './assets/eyesdown.svg?react'
import WinkEyesSVG from './assets/winkeyes.svg?react'
import CallMeSVG from './assets/callme.svg?react'
import ThumbsUpSVG from './assets/thumbsup.svg?react'
import PointerSVG from './assets/pointer.svg?react'
import gsap from 'gsap'
import Drawer from './components/Drawer'
import DrawerTrigger from './components/DrawerTrigger'
import { useScrollAnimations } from './hooks/useScrollAnimations'

const EASE = 'power4.inOut'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isAnimating = useRef(false)
  const mainRef = useRef(null)
  const floatingBtnRef = useRef(null)
  const lastSectionRef = useRef(null)

  const openDrawer = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    const isMobile = window.innerWidth < 768

    gsap.to('.drawer', {
      x: isMobile ? 0 : '2.1rem',
      duration: 1,
      ease: EASE,
      onComplete: () => { isAnimating.current = false },
    })

    if (!isMobile) {
      gsap.to('.drawer-close-btn', {
        x: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 1,
        ease: EASE,
      })
    }
    setDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true

    gsap.to('.drawer', {
      x: '100vw',
      duration: 1,
      ease: EASE,
      onComplete: () => { isAnimating.current = false },
    })

    gsap.to('.drawer-close-btn', {
      x: '-4rem',
      opacity: 0,
      pointerEvents: 'none',
      duration: 1,
      ease: EASE,
    })
    setDrawerOpen(false)
  }, [])

  const toggleDrawer = useCallback(() => {
    if (drawerOpen) closeDrawer()
    else openDrawer()
  }, [drawerOpen, openDrawer, closeDrawer])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawerOpen) closeDrawer()
      if (drawerOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (window.lenis) {
          window.lenis.scrollTo(window.scrollY + window.innerHeight)
        } else {
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (window.lenis) {
          window.lenis.scrollTo(window.scrollY - window.innerHeight)
        } else {
          window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [drawerOpen, closeDrawer])

  useScrollAnimations(mainRef, floatingBtnRef, lastSectionRef, drawerOpen)

  return (
    <>
      <div
        className="scroll-progress-bar fixed top-0 left-0 w-full h-[4px] bg-[var(--color-primary)] origin-left z-[9999]"
        style={{
          transform: 'scaleX(0)'
        }}
      />

      <main className="main-view" ref={mainRef}>
        <div className="bg-canvas">
          <div className="bg-blob--hero" />
          <div className="bg-blob--blue" />
          <div className="bg-blob--sunset" />
        </div>
        <div className="shader-overlay" />

        {/* Section 1 — Hero */}
        <section className="scroll-section hero relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="bubble bubble--floating top-[12%] md:top-[20%] left-[5%] md:left-[20%] rotate-[-5deg]">Hey there!</div>
            <div className="floating-svg absolute top-[15%] md:top-[15%] right-[10%] md:right-[5%] w-[clamp(50px,10vw,100px)] bg-transparent animate-bounce-tilt origin-bottom">
              <ThumbsUpSVG className="w-full h-auto" />
            </div>
          </div>
          <div className="hero__content-wrapper">
            <h1 className="hero__name">I'm Zubin.</h1>
          </div>
          <div className="hero__arrow absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">▼</div>
        </section>

        {/* Section 2 — Tagline */}
        <section className="scroll-section relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="bubble bubble--floating top-[15%] md:top-[20%] right-[5%] md:right-[20%] rotate-[6deg]">rare, I know</div>
            <div className="floating-svg absolute top-[12%] md:top-[25%] left-[5%] md:left-[20%] rotate-[-2deg] w-[clamp(60px,12vw,120px)] bg-transparent">
              <WinkEyesSVG className="w-full h-auto" />
            </div>
          </div>
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary hero__name--mixed"><span className="accent">Developer.</span> The kind<br />who actually finishes things.</h1>
          </div>
        </section>

        {/* Section 3 — Full stack */}
        <section className="scroll-section">
          <div className="floating-svg absolute top-[15%] md:top-[25%] rotate-[-2deg] w-[clamp(60px,12vw,120px)] bg-transparent">
            <EyesDownSVG className="w-full h-auto" />
          </div>
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">I work across the <br/><span className="accent">full stack</span> <br />whatever your product needs.</h1>
          </div>
        </section>

        {/* Section 4 — Floating chip cloud */}
        <section className="scroll-section chip-cloud-section relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="floating-svg absolute top-[5%] md:top-[15%] right-[10%] md:right-[5%] w-[clamp(50px,10vw,100px)] bg-transparent animate-bounce-tilt origin-bottom z-20">
              <PointerSVG className="w-full h-auto" />
            </div>
            <div className="bubble bubble--chip top-[15%] md:top-[20%] left-[5%] md:left-[20%] -rotate-6">dApps</div>
            <div className="bubble bubble--chip top-[28%] md:top-[25%] right-[5%] md:right-[25%] rotate-3">dashboards</div>
            <div className="bubble bubble--chip top-[42%] md:top-[45%] left-[5%] md:left-[25%] -rotate-3">internal tools</div>
            <div className="bubble bubble--chip top-[55%] md:top-[55%] left-[50%] -translate-x-1/2 rotate-6">APIs</div>
            <div className="bubble bubble--chip top-[68%] md:top-[45%] right-[5%] md:right-[20%] rotate-2">Web3</div>
            <div className="bubble bubble--chip bottom-[15%] md:bottom-[25%] left-[5%] md:left-[20%] -rotate-3">automations</div>
            <div className="bubble bubble--chip bottom-[20%] md:bottom-[30%] right-[5%] md:right-[25%] rotate-1">landing pages</div>
          </div>
        </section>

        {/* Section 5 — Values */}
        <section className="scroll-section relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="floating-svg absolute top-[15%] md:top-[25%] left-[10%] md:left-[20%] rotate-[-2deg] w-[clamp(60px,12vw,120px)] bg-transparent">
              <EyesSVG className="w-full h-auto" />
            </div>
          </div>
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">Clean code, good UX,<br /><span className="accent">zero drama.</span></h1>
          </div>
        </section>

        {/* Section 6 — Footer / CTA */}
        <section className="scroll-section scroll-section--footer" ref={lastSectionRef}>
          <div className="hero__content-wrapper justify-center items-center gap-12">
            <div className="floating-btn-placeholder" />
            <a
              ref={floatingBtnRef}
              href="https://cal.com/iamzubin"
              target="_blank"
              rel="noopener noreferrer"
              className="floating-btn cursor-pointer z-10"
              aria-label="Let's talk"
            >
              <CallMeSVG className="animate-periodic-shake w-[clamp(8rem,15vw,12rem)] h-[clamp(8rem,15vw,12rem)]" />
            </a>
            <div className="final-subtext">
              <span className="final-subtext__heading">Let's talk.</span>
              <div className="final-subtext__links">
                <a href="https://x.com/iamzub_in" target="_blank" rel="noopener noreferrer">Twitter → @IAMZUB_IN</a>
                <a href="mailto:me@iamzub.in">Email → ME@IAMZUB.IN</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Drawer isOpen={drawerOpen} />

      <button
        className="drawer-close-btn group"
        onClick={closeDrawer}
        aria-label="Close drawer"
        id="drawer-close-button"
      >
        <span className="drawer-close-btn__label">Nevermind</span>
      </button>

      <DrawerTrigger isOpen={drawerOpen} onClick={toggleDrawer} />
    </>
  )
}