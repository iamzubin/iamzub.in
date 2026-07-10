import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const EASE = 'power4.inOut'

const AccordionItem = ({ id, openId, onToggle, title, timeline, tags, description, highlight, isWork }) => {
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
          {isWork ? (
            <p className="work-item__tags">{tags}</p>
          ) : (
            <p className="engagement-item__timeline">{timeline}</p>
          )}
          <p className={isWork ? 'work-item__description' : 'engagement-item__description'}>
            {description}
            {highlight && <span className="work-item__highlight"> {highlight}</span>}
          </p>
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
    >
      <div className="drawer__scroller no-scrollbar">
        <div className="drawer__content">

          {/* — Engagements — */}
          <div>
            <h2 className="drawer__heading">Engagements</h2>
            <p className="drawer__intro">
              Instead of open-ended hourly work, I offer structured sprints so you
              know exactly what you get and when.
            </p>
          </div>

          <div className="engagements-list">
            <AccordionItem 
              id="tech-rescue"
              openId={openId}
              onToggle={handleToggle}
              title="Technical Rescue"
              timeline="1–2 Weeks"
              description="Taking brittle, AI-scaffolded prototypes (Cursor, Lovable, v0) and hardening them into secure, production-ready applications with proper state management and database architecture."
              isWork={false}
            />
            <AccordionItem 
              id="spike-sprint"
              openId={openId}
              onToggle={handleToggle}
              title="Spike Sprint"
              timeline="1 Week"
              description="A focused, low-risk engagement to investigate a technical bottleneck, test feasibility, and map out the architecture before a major build."
              isWork={false}
            />
            <AccordionItem 
              id="build-sprint"
              openId={openId}
              onToggle={handleToggle}
              title="Build Sprint"
              timeline="2–4 Weeks"
              description="End-to-end execution of specific, backend-heavy features, complex third-party integrations, or migrating heavy Electron apps to lightweight Tauri environments."
              isWork={false}
            />
          </div>

          <div className="drawer__divider" />

          {/* — Selected Work — */}
          <div>
            <h2 className="drawer__heading">Selected Work</h2>
          </div>

          <div className="work-list">
            <AccordionItem 
              id="holdem"
              openId={openId}
              onToggle={handleToggle}
              title="Holdem"
              tags="Desktop Systems / Rust & Tauri"
              description="Engineered a lightweight desktop application utilizing Tauri to drastically reduce background memory footprint compared to standard Electron builds."
              highlight="(130+ GitHub Stars)."
              isWork={true}
            />
            <AccordionItem 
              id="burner-wallet"
              openId={openId}
              onToggle={handleToggle}
              title="Burner Wallet"
              tags="Web3 / Hardware Integration"
              description="Built an NFC-enabled hardware interface featuring tap-to-sign functionality, bridging physical hardware UX with on-chain interactions."
              isWork={true}
            />
            <AccordionItem 
              id="stockdesk"
              openId={openId}
              onToggle={handleToggle}
              title="StockDesk"
              tags="B2B / Internal Tools"
              description="Developed a robust internal operations platform for a retail business. Simplified live stock checks and resolved ground-level operational friction for daily inventory management."
              isWork={true}
            />
          </div>

          {/* — Sidebar Footer — */}
          <div className="drawer__footer">
            <p>Currently based in Bengaluru. Available for async, remote contracts globally.</p>
            <div className="drawer__socials">
              <a href="#">[ GitHub ]</a>
              <a href="#">[ Twitter/X ]</a>
              <a href="#">[ Email ]</a>
            </div>
          </div>

        </div>
      </div>
    </aside>
  )
}
