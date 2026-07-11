import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import SplitType from 'split-type'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, Flip)

export function useScrollAnimations(mainRef, floatingBtnRef, lastSectionRef) {
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

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  useEffect(() => {
    if (!mainRef.current) return

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
            duration: 0.2, // originally 0.3
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
            stagger: { each: 0.02, from: "random" }, // originally 0.04
            duration: 0.2, // originally 0.4/0.3
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
            stagger: 0.05, // originally 0.1
            duration: 0.4, // originally 0.8
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
        let isCentered = false;

        // 1. Move to center when scrolled all the way to the bottom
        ScrollTrigger.create({
          trigger: lastSectionRef.current,
          start: 'top 5%', // triggers just as it snaps to the top
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
                ease: 'power3.out', // Bouncy effect to the center
              });
            }
          },
        });

        // 2. Move back to floating when scrolling up and Let's talk is out of view
        ScrollTrigger.create({
          trigger: '.final-subtext',
          start: 'top bottom', // when top of text hits bottom of viewport
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

    return () => ctx.revert()
  }, [mainRef, floatingBtnRef, lastSectionRef])
}
