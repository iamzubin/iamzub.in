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
              No open-ended hourly work. Structured sprints with clear scope,
              timeline, and deliverables.
            </p>
          </div>

          <div className="engagements-list">
            <AccordionItem 
              id="tech-rescue"
              openId={openId}
              onToggle={handleToggle}
              title="Technical Rescue"
              timeline="1–2 Weeks"
              description="Your AI-scaffolded prototype ships but breaks under real users. I harden it into a production-ready app — proper state management, database architecture, auth, and error handling."
              isWork={false}
            />
            <AccordionItem 
              id="spike-sprint"
              openId={openId}
              onToggle={handleToggle}
              title="Spike Sprint"
              timeline="1 Week"
              description="Before committing to a major build, I investigate the bottleneck, test feasibility, and map out the architecture. You get a clear technical plan — not a guess."
              isWork={false}
            />
            <AccordionItem 
              id="build-sprint"
              openId={openId}
              onToggle={handleToggle}
              title="Build Sprint"
              timeline="2–4 Weeks"
              description="End-to-end execution of backend-heavy features, complex integrations, or migrating bloated Electron apps to lightweight Tauri builds."
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
              description="Cross-platform floating file holder built in Tauri. Drastically lower memory footprint than Electron equivalents."
              highlight="(130+ GitHub Stars)."
              isWork={true}
            />
            <AccordionItem 
              id="burner-wallet"
              openId={openId}
              onToggle={handleToggle}
              title="Burner Wallet"
              tags="Web3 / Hardware Integration"
              description="NFC-enabled hardware wallet with tap-to-sign. Bridges physical UX with on-chain transactions — zero seed phrase exposure."
              isWork={true}
            />
            <AccordionItem 
              id="stockdesk"
              openId={openId}
              onToggle={handleToggle}
              title="StockDesk"
              tags="B2B / Internal Tools"
              description="Internal operations platform for a retail business. Live stock checks, daily inventory management, and ground-level operational tools."
              isWork={true}
            />
          </div>

          <div className="drawer__divider" />

          {/* — Details (chemtest-style) — */}
          <div className="drawer__details">
            <div className="drawer__detail-row">
              <span className="drawer__detail-label">Status</span>
              <span className="drawer__detail-value">
                <span className="drawer__status">
                  <span className="drawer__status-dot" />
                  Available for new contracts
                </span>
              </span>
            </div>
            <div className="drawer__detail-row">
              <span className="drawer__detail-label">Based in</span>
              <span className="drawer__detail-value">Bengaluru, India · IST (UTC+5:30)</span>
            </div>
            <div className="drawer__detail-row">
              <span className="drawer__detail-label">Reach</span>
              <span className="drawer__detail-value">Async & remote — any timezone</span>
            </div>
            <div className="drawer__detail-row">
              <span className="drawer__detail-label">Links</span>
              <div className="drawer__socials" style={{ marginTop: 0 }}>
                <a href="https://github.com/iamzubin" target="_blank" rel="noopener noreferrer">[ GitHub ]</a>
                <a href="https://twitter.com/zubin" target="_blank" rel="noopener noreferrer">[ Twitter/X ]</a>
                <a href="https://linkedin.com/in/zubin" target="_blank" rel="noopener noreferrer">[ LinkedIn ]</a>
                <a href="mailto:hello@zubin.dev">[ Email ]</a>
              </div>
            </div>
          </div>

          <div className="drawer__credentials">
            <span>GSoC '19</span>
            <span>·</span>
            <span>Imagine Cup Asia '20</span>
          </div>

        </div>
      </div>
    </aside>
  )
}
