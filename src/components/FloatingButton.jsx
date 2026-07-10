import CallMeSVG from '../assets/callme.svg?react'

export default function FloatingButton() {
  return (
    <a 
      href="mailto:hello@zubin.dev"
      className="floating-btn group"
      aria-label="Book a call"
    >
      <CallMeSVG className="floating-btn__svg" />
    </a>
  )
}
