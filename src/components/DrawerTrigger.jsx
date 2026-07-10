export default function DrawerTrigger({ isOpen, onClick }) {
  return (
    <button
      className={`drawer-trigger group ${isOpen ? 'is-open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? "Close drawer" : "Open drawer"}
      aria-expanded={isOpen}
    >
      <div className={`drawer-trigger__bg ${isOpen ? 'hidden' : ''}`}></div>
      <div className={`drawer-trigger__hover-bg ${isOpen ? 'hidden' : ''}`}></div>
      <div className={`drawer-trigger__label ${isOpen ? 'hidden' : ''}`}>Work</div>

      <div className={`drawer-trigger__hamburger ${isOpen ? 'open' : ''}`}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
    </button>
  )
}
