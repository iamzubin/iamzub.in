import { useEffect, useRef } from 'react'

let libsPromise

function loadLibs() {
  if (!libsPromise) {
    libsPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/Flip'),
      import('split-type'),
      import('lenis'),
    ]).then(([gsapMod, stMod, flipMod, splitTypeMod, lenisMod]) => {
      const gsap = gsapMod.default
      const ScrollTrigger = stMod.ScrollTrigger
      const Flip = flipMod.Flip
      gsap.registerPlugin(ScrollTrigger, Flip)
      return {
        gsap,
        ScrollTrigger,
        Flip,
        SplitType: splitTypeMod.default,
        Lenis: lenisMod.default,
      }
    })
  }
  return libsPromise
}

export function useScrollAnimations(mainRef, floatingBtnRef, lastSectionRef, drawerOpen) {
  const lenisRef = useRef(null)
  const ctxRef = useRef(null)

  // Lenis Smooth Scroll setup (lazy-loaded)
  useEffect(() => {
    let disposed = false
    let rafId = null
    let tickerFn = null

    loadLibs().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (disposed) return
      const lenis = new Lenis({
        duration: 0.75,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        wheelMultiplier: 1.1,
        mouseMultiplier: 1.1,
        smoothTouch: false,
        touchMultiplier: 2.2,
        infinite: false,
      })

      lenisRef.current = lenis
      window.lenis = lenis

      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      lenis.on('scroll', ScrollTrigger.update)
      tickerFn = (time) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    })

    return () => {
      disposed = true
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (tickerFn && lenisRef.current && window.gsap) {
        window.gsap.ticker.remove(tickerFn)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        delete window.lenis
      }
    }
  }, [])

  // Pause scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    if (!lenisRef.current) return
    if (drawerOpen) {
      lenisRef.current.stop()
    } else {
      lenisRef.current.start()
    }
  }, [drawerOpen])

  // Scroll animations (lazy-loaded)
  useEffect(() => {
    if (!mainRef.current) return

    let disposed = false

    loadLibs().then(({ gsap, ScrollTrigger, Flip, SplitType }) => {
      if (disposed) return
      window.gsap = gsap

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

        // Floating Bubbles & Chips Continuous Animation
        gsap.utils.toArray('.bubble--floating, .bubble--chip').forEach(bubble => {
          gsap.to(bubble, {
            y: () => gsap.utils.random(-window.innerHeight * 0.04, window.innerHeight * 0.04),
            x: () => gsap.utils.random(-window.innerWidth * 0.03, window.innerWidth * 0.03),
            rotation: "random(-10, 10)",
            duration: "random(3, 5)",
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            repeatRefresh: true
          })
        })

        gsap.to('.hero__arrow', {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: '150px top',
            scrub: true
          }
        })

        const sections = gsap.utils.toArray('.scroll-section')

        sections.forEach((section, i) => {
          const textEl = section.querySelector('.hero__name')

          // Setup ScrollTrigger config
          const stConfig = {
            trigger: textEl || section,
            start: i === 0 ? 'top 85%' : 'top 50%',
            end: 'bottom 25%',
            toggleActions: i === 0 ? 'play none none reverse' : 'play reverse play reverse'
          }

          // Section 6: Button & Footer text
          if (i === 5) {
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

          const floatingItems = section.querySelectorAll('.bubble--floating, .floating-svg, .bubble--chip')
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

          if (!textEl) return

          if (i === 0) {
            // Scale-Up Effect for Hero
            gsap.from(textEl, {
              scale: 0,
              opacity: 0,
              duration: 0.2,
              ease: "back.out(1.7)",
              delay: 0.1,
              scrollTrigger: stConfig
            });
          } else if (i === 1 || i === 3) {
            // Popcorn Pop Effect for Sections 2 and 4
            const split = new SplitType(textEl, { types: 'words, chars' });
            gsap.from(split.chars, {
              scale: 0,
              y: 30,
              rotation: () => gsap.utils.random(-20, 20),
              stagger: { each: 0.02, from: "random" },
              duration: 0.2,
              ease: "back.out(2)",
              scrollTrigger: stConfig
            });
          } else {
            // Default word animation for other sections
            const split = new SplitType(textEl, { types: 'words' })
            gsap.from(split.words, {
              opacity: 0,
              y: 40,
              rotationZ: 10,
              stagger: 0.05,
              duration: 0.4,
              ease: "power3.out",
              scrollTrigger: stConfig
            })
          }
        })

        // Snap scroll to sections
        ScrollTrigger.create({
          trigger: mainRef.current,
          start: 'top top',
          end: 'bottom bottom',
          snap: {
            snapTo: (value, self) => {
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
        if (floatingBtnRef.current && lastSectionRef.current) {
          let isCentered = false;

          // 1. Move to center when scrolled all the way to the bottom
          ScrollTrigger.create({
            trigger: lastSectionRef.current,
            start: 'top 5%',
            onEnter: () => {
              if (!isCentered) {
                isCentered = true;
                const state = Flip.getState(floatingBtnRef.current);
                gsap.set(floatingBtnRef.current, {
                  position: 'relative',
                  bottom: 'auto',
                  right: 'auto',
                });
                Flip.from(state, {
                  duration: 0.8,
                  ease: 'power3.out',
                });
              }
            },
          });

          // 2. Move back to floating when scrolling up and Let's talk is out of view
          ScrollTrigger.create({
            trigger: '.final-subtext',
            start: 'top bottom',
            onLeaveBack: () => {
              if (isCentered) {
                isCentered = false;
                const state = Flip.getState(floatingBtnRef.current);
                gsap.set(floatingBtnRef.current, {
                  clearProps: 'position,bottom,right',
                });
                Flip.from(state, {
                  duration: 0.6,
                  ease: 'power3.out',
                });
              }
            },
          });
        }

      }, mainRef)

      ctxRef.current = ctx
    })

    return () => {
      disposed = true
      if (ctxRef.current) {
        ctxRef.current.revert()
        ctxRef.current = null
      }
    }
  }, [mainRef, floatingBtnRef, lastSectionRef])
}
