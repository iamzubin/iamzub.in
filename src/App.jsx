import { useState, useCallback, useEffect, useRef } from 'react'
import EyesSVG from './assets/eyes.svg?react'
import WorreidEyes from './assets/worriedeyes.svg?react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import Drawer from './components/Drawer'
import DrawerTrigger from './components/DrawerTrigger'
import FloatingButton from './components/FloatingButton'
import Lenis from 'lenis'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const EASE = 'power4.inOut'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isAnimating = useRef(false)
  const mainRef = useRef(null)

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

  // Floating animations for bubbles removed.

  useEffect(() => {
    // Lenis Smooth Scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawerOpen) closeDrawer()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [drawerOpen])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup progress bar
      gsap.to('.scroll-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.main-view',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      })

      // Drawer trigger animations
      gsap.to('.drawer-trigger', {
        scrollTrigger: {
          trigger: '.hero',
          start: 'bottom top',
          toggleActions: 'play none none reverse'
        },
        background: 'var(--color-primary)'
      })

      // Floating Bubbles Continuous Animation
      gsap.utils.toArray('.bubble--floating').forEach(bubble => {
        gsap.to(bubble, {
          y: "random(-30, 30)",
          x: "random(-30, 30)",
          rotation: "random(-10, 10)",
          duration: "random(3, 5)",
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatRefresh: true
        })
      })

      const sections = gsap.utils.toArray('.scroll-section')

      sections.forEach((section, i) => {
        const textEl = section.querySelector('.hero__name')

        // Setup ScrollTrigger config
        const stConfig = {
          trigger: textEl || section,
          start: 'top 60%',
          end: 'bottom 25%',
          toggleActions: 'play reverse play reverse'
        }

        // Section 8: Button & Footer text
        if (i === 7) {
          const btn = section.querySelector('.bubble')
          if (btn) {
            gsap.from(btn, {
              opacity: 0,
              scale: 0.8,
              y: 50,
              duration: 0.6,
              ease: "back.out(1.5)",
              scrollTrigger: stConfig
            })
          }
          const subText = section.querySelector('.final-subtext')
          if (subText) {
            gsap.from(subText, {
              opacity: 0,
              y: 20,
              duration: 0.8,
              delay: 0.3,
              scrollTrigger: stConfig
            })
          }
          return
        }

        if (!textEl) return

        // Chemtest style text animation for all sections
        const split = new SplitType(textEl, { types: 'lines, words' })
        gsap.set(split.lines, { overflow: 'hidden', paddingBottom: '0.1em' })

        gsap.from(split.words, {
          opacity: 0,
          y: '100%',
          rotationZ: 10,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
          delay: i === 0 ? 0.2 : 0,
          scrollTrigger: i === 0 ? null : stConfig
        })
      })

      // Snap scroll to sections
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.1, max: 0.33 },
          ease: "power3.out"
        }
      })

    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div
        className="scroll-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'var(--color-primary)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          zIndex: 9999
        }}
      />

      <main className="main-view" ref={mainRef}>
        <div className="bg-canvas">
          <div className="bg-blob--hero" />
          <div className="bg-blob--blue" />
          <div className="bg-blob--sunset" />
        </div>
        <div className="shader-overlay" />

        {/* Section 1 */}
        <section className="scroll-section hero" style={{ position: 'relative' }}>
          {/* Floating Bubbles (Only on first section) */}
          <div className="fixed-bubbles" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
            <div className="bubble bubble--floating" style={{ top: '15%', left: '15%', transform: 'rotate(-5deg)' }}>Runway is burning</div>
            <div className="bubble bubble--floating" style={{ top: '75%', right: '15%', transform: 'rotate(8deg)' }}>Skip the interviews</div>
            <div className="" style={{ position: 'absolute', top: '45%', left: '-10%', transform: 'rotate(-2deg)', width: '150px', background: 'none' }}>
              <EyesSVG style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>

          <div className="hero__content-wrapper">
            <h1 className="hero__name">Shipping  an  MVP<br />is  easy.</h1>
          </div>
          <div className="hero__arrow" aria-hidden="true">▼</div>
        </section>

        {/* Section 2 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <div className="bubble--floating" style={{ position: 'absolute', top: '45%', left: '10%', transform: 'rotate(-2deg)', width: '150px', background: 'none' }}>
              <WorreidEyes style={{ width: '100%', height: 'auto' }} />
            </div>
            <h1 className="hero__name hero__name--tertiary">Scaling  it  is  where<br />teams  break.</h1>
          </div>
        </section>

        {/* Section 3 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary">AI-generated  code<br />collapses  under  load.</h1>
          </div>
        </section>

        {/* Section 4 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary">Desktop  apps  drain<br />system  memory.</h1>
          </div>
        </section>

        {/* Section 5 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary">I  fix  the  architecture<br />underneath.</h1>
          </div>
        </section>

        {/* Section 6 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--secondary">I  am  Zubin.</h1>
          </div>
        </section>

        {/* Section 7 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary">Contract  Product<br />Engineer.</h1>
          </div>
        </section>

        {/* Section 8 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper" style={{ justifyContent: 'center', position: 'relative' }}>
            <div
              className="bubble bubble--3"
              style={{ background: 'var(--color-primary)', color: 'var(--color-white)', cursor: 'pointer', fontSize: 'clamp(2rem, 5vw, 4rem)', padding: '2rem 4rem', transform: 'none' }}
              onClick={openDrawer}
            >
              Book a Scoping Call
            </div>

            <div className="final-subtext" style={{ position: 'absolute', bottom: '-20vh', color: 'var(--color-white)', fontSize: '0.8rem', lineHeight: '1.6', fontWeight: '500', opacity: 0.9 }}>
              At any time, you can reach out :<br />
              on Twitter : <strong style={{ color: 'var(--color-primary)' }}>@ZUBIN</strong><br />
              on LinkedIn : <strong style={{ color: 'var(--color-primary)' }}>IN/ZUBIN</strong><br />
              on Email : <strong style={{ color: 'var(--color-primary)' }}>HELLO@ZUBIN.DEV</strong>
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
      <FloatingButton />
    </>
  )
}
