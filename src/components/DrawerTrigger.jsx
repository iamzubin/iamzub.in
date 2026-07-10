export default function DrawerTrigger({ isOpen, onClick }) {
  if (isOpen) return null;

  return (
    <button
      className="drawer-trigger group"
      onClick={onClick}
      aria-label="Open drawer"
      aria-expanded={isOpen}
    >
      <div className="drawer-trigger__bg"></div>
      <div className="drawer-trigger__hover-bg"></div>
      <div className="drawer-trigger__label">Work</div>
    </button>
  )
}
