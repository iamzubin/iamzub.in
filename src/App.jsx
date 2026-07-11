import { useState, useCallback, useEffect, useRef } from 'react'
import EyesSVG from './assets/eyes.svg?react'
import WorreidEyes from './assets/worriedeyes.svg?react'
import CallMeSVG from './assets/callme.svg?react'
import ThumbsUpSVG from './assets/thumbsup.svg?react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import SplitType from 'split-type'
import Drawer from './components/Drawer'
import DrawerTrigger from './components/DrawerTrigger'
import Lenis from 'lenis'

// Register plugins
gsap.registerPlugin(ScrollTrigger, Flip)

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

  // Floating animations for bubbles removed.

  useEffect(() => {
    // Lenis Smooth Scroll setup
    const lenis = new Lenis({
      duration: 0.8,
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

        const floatingItems = section.querySelectorAll('.bubble--floating, .floating-svg')
        if (floatingItems.length > 0) {
          gsap.from(floatingItems, {
            opacity: 0,
            scale: 0.5,
            y: 50,
            duration: 0.8,
            ease: "back.out(1.5)",
            stagger: 0.1,
            delay: i === 0 ? 0.4 : 0,
            scrollTrigger: i === 0 ? null : stConfig
          })
        }

        // Text animation on words
        const split = new SplitType(textEl, { types: 'words' })

        gsap.from(split.words, {
          opacity: 0,
          y: 40,
          rotationZ: 10,
          stagger: 0.1,
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
          snapTo: (value, self) => {
            // calculate the exact progress breakpoints for each section
            const totalScroll = self.end - self.start;
            if (totalScroll === 0) return value;
            const breaks = sections.map((s, i) => {
              if (i === sections.length - 1) return 1;
              return Math.min(1, s.offsetTop / totalScroll);
            });
            return gsap.utils.snap(breaks, value);
          },
          duration: { min: 0.05, max: 0.15 },
          ease: "power2.out"
        }
      })

      // Floating button: animate from fixed corner into the footer section using GSAP Flip
      // Per Emil: Flip animation calculates the delta and translates smoothly
      if (floatingBtnRef.current && lastSectionRef.current) {
        ScrollTrigger.create({
          trigger: lastSectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          onEnter: () => {
            const state = Flip.getState(floatingBtnRef.current);
            gsap.set(floatingBtnRef.current, {
              position: 'relative',
              bottom: 'auto',
              right: 'auto',
            });
            Flip.from(state, {
              duration: 0.6,
              ease: 'power3.out',
            });
          },
          onLeaveBack: () => {
            const state = Flip.getState(floatingBtnRef.current);
            gsap.set(floatingBtnRef.current, {
              clearProps: 'position,bottom,right',
            });
            Flip.from(state, {
              duration: 0.6,
              ease: 'power3.out',
            });
          },
        })
      }

    }, mainRef)

    return () => ctx.revert()
  }, [])

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

        {/* Section 1 */}
        <section className="scroll-section hero relative overflow-hidden">
          {/* Floating Bubbles (Only on first section) */}
          <div className="fixed-bubbles absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <div className="bubble bubble--floating top-[15%] left-[15%] rotate-[-5deg]">Hey There!!</div>
            <div className="floating-svg absolute top-[10%] -right-[40%] rotate-[-2deg] w-[clamp(80px,15vw,150px)] bg-transparent">
              <EyesSVG className="w-full h-auto" />
            </div>
            <div className="floating-svg absolute top-[10%] right-[5%] w-[clamp(60px,12vw,120px)] bg-transparent animate-bounce-tilt origin-bottom">
              <ThumbsUpSVG className="w-full h-auto" />
            </div>
          </div>

          <div className="hero__content-wrapper">
            <h1 className="hero__name">I'm  Zubin.</h1>
          </div>
          <div className="hero__arrow absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">▼</div>
        </section>

        {/* Section 2 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
                        <div className="bubble bubble--floating top-[75%] right-[15%] rotate-[8deg]">Skip the interviews</div>

            <div className="floating-svg absolute top-[45%] left-[5%] rotate-[-2deg] w-[clamp(80px,15vw,150px)] bg-transparent">
              <WorreidEyes className="w-full h-auto" />
            </div>
            {/* Pure Cause font, no display accent */}
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">Building  the  MVP  was<br />the  fun  part.</h1>
          </div>
        </section>

        {/* Section 3 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            {/* Highlighted text block */}
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">But  eventually,  the  codebase <br /> starts  to<span className="highlight">crack</span></h1>
          </div>
        </section>

        {/* Section 4 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            {/* Pure Cause font */}
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">AI-generated  apps<br />collapse  under  load.</h1>
          </div>
        </section>

        {/* Section 5 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            {/* Highlighted text block */}
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">Desktop  builds  that<br /><span className="highlight">drain  your  memory.</span></h1>
          </div>
        </section>

        {/* Section 6 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            {/* Pure Cause font */}
            <h1 className="hero__name hero__name--secondary hero__name--mixed">Hiring  a  senior  engineer<br />takes  months.</h1>
          </div>
        </section>

        {/* Section 7 */}
        <section className="scroll-section">
          <div className="hero__content-wrapper">
            <h1 className="hero__name hero__name--tertiary hero__name--mixed">I  step  in  and<br /><span className="accent">fix  it  in  weeks.</span></h1>
          </div>
        </section>

        {/* Section 8 — Footer */}
        <section className="scroll-section scroll-section--footer" ref={lastSectionRef}>
          <div className="hero__content-wrapper justify-center items-center gap-12">
            <div className="floating-btn-placeholder" />
            <button
              ref={floatingBtnRef}
              onClick={openDrawer}
              className="floating-btn cursor-pointer z-10"
              aria-label="Book a Scoping Call"
            >
              <CallMeSVG className="animate-periodic-shake w-[clamp(8rem,15vw,12rem)] h-[clamp(8rem,15vw,12rem)] fill-transparent stroke-[var(--color-primary)] stroke-[1.5px]" />
            </button>
            <div className="final-subtext">
              <span className="final-subtext__heading">Let's  talk.</span>
              <div className="final-subtext__links">
                <a href="https://twitter.com/zubin" target="_blank" rel="noopener noreferrer">Twitter  →  @ZUBIN</a>
                <a href="https://linkedin.com/in/zubin" target="_blank" rel="noopener noreferrer">LinkedIn  →  IN/ZUBIN</a>
                <a href="mailto:hello@zubin.dev">Email  →  HELLO@ZUBIN.DEV</a>
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
