import { useState, useRef, useEffect } from 'react'

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

const AccordionItem = ({ id, openId, onToggle, title, timeline, tags, description, highlight, caseStudy, isWork, image, imageWidth, imageHeight, video, videoWidth, videoHeight, link, linkText }) => {
  const isOpen = openId === id
  const contentRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    import('gsap').then(({ default: gsap }) => {
      if (cancelled) return
      gsap.to(contentRef.current, {
        height: isOpen ? 'auto' : 0,
        duration: 0.5,
        ease: EASE
      })
    })
    return () => { cancelled = true }
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
          {image && isOpen && (
            <div className="mb-4 rounded-md overflow-hidden shadow-sm">
              <img src={image} alt={title} width={imageWidth} height={imageHeight} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
            </div>
          )}
          {video && isOpen && (
            <div className="mb-4 rounded-md overflow-hidden shadow-sm">
              <video src={video} autoPlay loop muted playsInline preload="none" width={videoWidth} height={videoHeight} className="w-full h-auto object-cover" />
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
          {caseStudy && (
            <dl className="work-item__case-study">
              {caseStudy.map(({ label, text }) => (
                <div key={label}>
                  <dt className="work-item__tags">{label}</dt>
                  <dd className="work-item__description">{text}</dd>
                </div>
              ))}
            </dl>
          )}
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
      inert={!isOpen}
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
              description="A free, open-source floating shelf for stashing files mid-drag on Windows."
              caseStudy={[
                { label: 'Problem', text: 'Moving files on Windows means juggling Explorer windows or dumping things on the Desktop "for now". Dropover fixes this, but only on macOS.' },
                { label: 'Build', text: 'A Tauri + Rust tray app. Shake the mouse while dragging and the shelf appears at the cursor; drop files, folders or browser images, then drag them out anywhere. Global hotkey, auto-update, 25 languages.' },
                { label: 'Result', text: 'Shipped v3.1.0 under MIT, with 160+ stars on GitHub.' },
              ]}
              image="/assets/holdem.gif"
              imageWidth={1920}
              imageHeight={1080}
              isWork={true}
              link="https://holdem.iamzub.in/"
              linkText="Download"
            />
            <AccordionItem 
              id="addercad"
              openId={openId}
              onToggle={handleToggle}
              title="AdderCAD"
              tags="AI Agents / CAD"
              description="Text to CAD for 3D printing: describe a part in plain English and get a real parametric model."
              caseStudy={[
                { label: 'Problem', text: 'Getting a custom part printed means learning CAD first. Most text-to-3D tools produce meshes you can\'t edit or dimension.' },
                { label: 'Build', text: 'An agent that plans the part on our server and runs the operations inside FreeCAD through a chat-panel addon. A Node/TypeScript backend handles device-flow sign-in, a prepaid credits ledger and billing. Exports STEP and STL, checked for bed fit, overhangs and wall thickness.' },
                { label: 'Result', text: 'Benchmarked the agent loop on cadbench before shipping. Launching soon, with the waitlist open.' },
              ]}
              image="/assets/addercad.png"
              imageWidth={1200}
              imageHeight={630}
              isWork={true}
              link="https://addercad.com/"
              linkText="Join the waitlist"
            />
            <AccordionItem 
              id="stemplayer"
              openId={openId}
              onToggle={handleToggle}
              title="StemPlayer"
              tags="WebAssembly Audio"
              description="A browser-based audio stem player allowing users to manipulate individual tracks in real-time. Leverages WebAudio API and complex memory management for FFmpeg WASM processing."
              image="/assets/stemplayer.png"
              imageWidth={2289}
              imageHeight={1294}
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
              description="A low-code Web3 SDK that lets developers with little blockchain experience ship Ethereum apps."
              caseStudy={[
                { label: 'Problem', text: 'Onboarding is where most dApps lose people: seed phrases, gas balances, and custom contracts that need expensive audits.' },
                { label: 'Build', text: 'An SDK on ERC-4337 account abstraction. Users sign in with a social account and get a smart contract wallet that supports multiple signers. Gas is sponsored and transactions are bundled. Accounts run on standard contracts, so teams skip writing and auditing their own.' },
                { label: 'Result', text: 'We built a full crypto wallet on the SDK to prove it out, plus developer docs.' },
              ]}
              image="/assets/ffreed-image.jpg"
              imageWidth={1600}
              imageHeight={900}
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
              videoWidth={1920}
              videoHeight={1080}
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
