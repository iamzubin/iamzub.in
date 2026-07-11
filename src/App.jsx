import { useState, useCallback, useEffect, useRef } from 'react'
import EyesSVG from './assets/eyes.svg?react'
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
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [drawerOpen, closeDrawer])

  useScrollAnimations(mainRef, floatingBtnRef, lastSectionRef)

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
          <div className="fixed-bubbles absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="bubble bubble--floating top-[15%] left-[15%] rotate-[-5deg]">Hey there!</div>
            <div className="floating-svg absolute top-[10%] -right-[40%] rotate-[-2deg] w-[clamp(80px,15vw,150px)] bg-transparent">
              <EyesSVG className="w-full h-auto" />
            </div>
            <div className="floating-svg absolute top-[10%] right-[100px] w-[clamp(60px,12vw,120px)] bg-transparent animate-bounce-tilt origin-bottom">
              <ThumbsUpSVG className="w-full h-auto" />
            </div>
          </div>
          <div className="hero__content-wrapper">
            <h1 className="hero__name">I'm Zubin.</h1>
          </div>
          <div className="hero__arrow absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">▼</div>
        </section>

        {/* Section 2 — Tagline */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <div className="bubble bubble--floating -top-[50%] -right-[5%] rotate-[6deg]">rare, I know</div>
            <div className="floating-svg absolute -top-[50%] left-[0%] rotate-[-2deg] w-[clamp(80px,15vw,150px)] bg-transparent">
              <WinkEyesSVG className="w-full h-auto" />
            </div>
            <h1 className="hero__name hero__name--tertiary hero__name--mixed"><span className="accent">Developer.</span> The kind<br />who actually finishes things.</h1>
          </div>
        </section>

        {/* Section 3 — Full stack */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">I work across the <span className="accent">full stack</span> <br/>whatever your product needs.</h1>
          </div>
        </section>

        {/* Section 4 — Floating chip cloud */}
        <section className="scroll-section chip-cloud-section relative">
          <div className="floating-svg absolute top-[10%] right-[100px] w-[clamp(60px,12vw,120px)] bg-transparent animate-bounce-tilt origin-bottom">
            <PointerSVG className="w-full h-auto" />
          </div>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="bubble bubble--chip top-[15%] left-[18%] -rotate-6">dApps</div>
            <div className="bubble bubble--chip top-[20%] right-[25%] rotate-3">dashboards</div>
            <div className="bubble bubble--chip top-[45%] left-[25%] -rotate-3">internal tools</div>
            <div className="bubble bubble--chip top-[55%] left-[50%] -translate-x-1/2 rotate-6">APIs</div>
            <div className="bubble bubble--chip top-[40%] right-[15%] rotate-2">Web3</div>
            <div className="bubble bubble--chip bottom-[20%] left-[15%] -rotate-3">automations</div>
            <div className="bubble bubble--chip bottom-[25%] right-[28%] rotate-1">landing pages</div>
          </div>
        </section>

        {/* Section 5 — Values */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <div className="floating-svg absolute -top-[30%] -left-[5%] rotate-[-2deg] w-[clamp(80px,15vw,150px)] bg-transparent">
              <EyesSVG className="w-full h-auto" />
            </div>
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">Clean code, good UX,<br /><span className="accent">zero drama.</span></h1>
          </div>
        </section>

        {/* Section 6 — Footer / CTA */}
        <section className="scroll-section scroll-section--footer" ref={lastSectionRef}>
          <div className="hero__content-wrapper justify-center items-center gap-12">
            <div className="floating-btn-placeholder" />
            <button
              ref={floatingBtnRef}
              onClick={openDrawer}
              className="floating-btn cursor-pointer z-10"
              aria-label="Let's talk"
            >
              <CallMeSVG className="animate-periodic-shake w-[clamp(8rem,15vw,12rem)] h-[clamp(8rem,15vw,12rem)] fill-transparent stroke-[var(--color-primary)] stroke-[1.5px]" />
            </button>
            <div className="final-subtext">
              <span className="final-subtext__heading">Let's talk.</span>
              <div className="final-subtext__links">
                <a href="https://twitter.com/zubin" target="_blank" rel="noopener noreferrer">Twitter → @ZUBIN</a>
                <a href="https://linkedin.com/in/zubin" target="_blank" rel="noopener noreferrer">LinkedIn → IN/ZUBIN</a>
                <a href="mailto:hello@zubin.dev">Email → HELLO@ZUBIN.DEV</a>
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