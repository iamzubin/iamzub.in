import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const EASE = 'power4.inOut'

const DrawerInfo = () => (
  <div className="flex flex-col gap-8 items-start lg:items-end text-left lg:text-right text-[0.85rem] font-medium leading-[1.4] text-[var(--color-primary)] w-full">
    
    {/* Availability Block */}
    <div className="flex flex-col gap-1 items-start lg:items-end w-full">
      <div style={{ fontFamily: 'var(--font-main)' }} className="uppercase text-[1.2rem] mb-1">Status</div>
      <div className="inline-flex items-center gap-2 font-bold">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse-dot_2s_ease-in-out_infinite]" />
        Available for contracts
      </div>
      <div className="opacity-80">Bengaluru, India · IST (UTC+5:30)</div>
      <div className="opacity-80">Async & remote — any timezone</div>
    </div>

    {/* Links Block */}
    <div className="flex flex-col gap-1 items-start lg:items-end w-full">
      <div style={{ fontFamily: 'var(--font-main)' }} className="uppercase text-[1.2rem] mb-1">Connect</div>
      <a href="https://github.com/iamzubin" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity underline decoration-1 underline-offset-[3px]">github.com/iamzubin</a>
      <a href="https://x.com/iamzub_in" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity underline decoration-1 underline-offset-[3px]">x.com/iamzub_in</a>
      <a href="mailto:me@iamzub.in" className="hover:opacity-60 transition-opacity underline decoration-1 underline-offset-[3px]">me@iamzub.in</a>
    </div>
    
    {/* CTA Block */}
    <div className="mt-4 flex w-full justify-start lg:justify-end">
      <a href="https://cal.com/iamzubin" target="_blank" rel="noopener noreferrer" className="bg-[var(--color-primary)] rounded-full hover:scale-105 transition-transform inline-flex items-center justify-center" style={{ fontFamily: 'var(--font-main)', fontSize: '0.9rem', color: '#ffffff', padding: '0.75rem 2rem', whiteSpace: 'nowrap', lineHeight: '1.2' }}>
        Get on a meet
      </a>
    </div>

  </div>
)

const AccordionItem = ({ id, openId, onToggle, title, timeline, tags, description, highlight, isWork, image, video, link, linkText }) => {
  const isOpen = openId === id
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        duration: 0.5,
        ease: EASE
      })
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.5,
        ease: EASE
      })
    }
  }, [isOpen])

  return (
    <div className={isWork ? 'work-item' : 'engagement-item'}>
      <div 
        role="button" 
        className={isWork ? 'work-item__trigger' : 'engagement-item__trigger'}
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
      >
        <div className={isWork ? 'work-item__title' : 'engagement-item__title'}>
          {title}
        </div>
        <div className={`${isWork ? 'work-item__arrow' : 'engagement-item__arrow'} ${isOpen ? (isWork ? 'work-item__arrow--open' : 'engagement-item__arrow--open') : ''}`}>
          →
        </div>
      </div>
      <div 
        ref={contentRef} 
        className={isWork ? 'work-item__body' : 'engagement-item__body'}
      >
        <div className={isWork ? 'work-item__body-inner' : 'engagement-item__body-inner'}>
          {image && (
            <div className="mb-4 rounded-md overflow-hidden shadow-sm">
              <img src={image} alt={title} className="w-full h-auto object-cover" />
            </div>
          )}
          {video && (
            <div className="mb-4 rounded-md overflow-hidden shadow-sm">
              <video src={video} autoPlay loop muted playsInline className="w-full h-auto object-cover" />
            </div>
          )}
          {isWork ? (
            <p className="work-item__tags">{tags}</p>
          ) : (
            <p className="engagement-item__timeline">{timeline}</p>
          )}
          <p className={isWork ? 'work-item__description' : 'engagement-item__description'}>
            {description}
            {highlight && <span className="work-item__highlight"> {highlight}</span>}
          </p>
          {link && (
            <div className="mt-4">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[var(--color-primary)] rounded-full hover:scale-105 transition-transform inline-flex items-center justify-center" 
                style={{ fontFamily: 'var(--font-main)', fontSize: '0.9rem', color: '#ffffff', padding: '0.75rem 2rem', whiteSpace: 'nowrap', lineHeight: '1.2' }}
              >
                {linkText || "View Project"}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Drawer({ isOpen }) {
  const [openId, setOpenId] = useState(null)

  const handleToggle = (id) => {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
    <aside
      className="drawer"
      aria-hidden={!isOpen}
      role="complementary"
      id="drawer-panel"
      data-lenis-prevent="true"
    >
      {/* Desktop Floating Top Right Info */}
      <div className="hidden lg:block absolute top-12 right-12 z-20 pointer-events-none">
        <div className="pointer-events-auto max-w-sm">
          <DrawerInfo />
        </div>
      </div>

      <div className="drawer__scroller no-scrollbar">
        <div className="drawer__content">

          {/* — Selected Work — */}
          <div>
            <h2 className="drawer__heading">Some of my Work</h2>
          </div>

          <div className="work-list">
            <AccordionItem 
              id="holdem"
              openId={openId}
              onToggle={handleToggle}
              title="Holdem"
              tags="Desktop Systems / Rust & Tauri"
              description="Holdem is an open-source tool for smoother file drag-and-drop management, offering a temporary holding area for files and folders."
              image="/assets/holdem.gif"
              isWork={true}
              link="https://holdem.iamzub.in/"
              linkText="Download"
            />
            <AccordionItem 
              id="stemplayer"
              openId={openId}
              onToggle={handleToggle}
              title="StemPlayer"
              tags="WebAssembly Audio"
              description="A browser-based audio stem player allowing users to manipulate individual tracks in real-time. Leverages WebAudio API and complex memory management for FFmpeg WASM processing."
              image="/assets/stemplayer.png"
              isWork={true}
              link="https://stem-player-ecru.vercel.app/"
              linkText="Check it out"
            />
            <AccordionItem 
              id="ffreed"
              openId={openId}
              onToggle={handleToggle}
              title="FFreed"
              tags="Web3 / Account Abstraction"
              description="Simplifying Ethereum account management with ERC-4337 and Smart Contract Wallets. Easy Web3 integration, gas sponsorship, and seamless user onboarding."
              image="/assets/ffreed-image.jpg"
              isWork={true}
            />
            <AccordionItem 
              id="stubs"
              openId={openId}
              onToggle={handleToggle}
              title="Stubs"
              tags="Web3 / Page Builder"
              description="A creative page-builder that empowers creators to craft personalized websites with Web3 elements, like NFT showcases and blockchain integration."
              video="/assets/stubs.mp4"
              isWork={true}
            />
          </div>

          <div className="drawer__divider lg:hidden" />

          {/* — Mobile Bottom Info — */}
          <div className="lg:hidden mt-8">
            <DrawerInfo />
          </div>

        </div>
      </div>
    </aside>
  )
}
