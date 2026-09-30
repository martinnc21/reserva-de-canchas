type Vista = "principal" | "reservas"

interface NavBarProps {
  vistaActual: Vista
  onInicio: () => void
  onCanchas: () => void
  onReservas: () => void
  cantidadReservas: number
}

function NavBar({ vistaActual, onInicio, onCanchas, onReservas, cantidadReservas }: NavBarProps) {
  return (
    <nav className="nav-bar">
      <span className="nav-logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="#16a34a" strokeWidth="2" />
          <line x1="12" y1="4" x2="12" y2="20" stroke="#16a34a" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" stroke="#16a34a" strokeWidth="2" />
        </svg>
        Reserva de Canchas
      </span>

      <div className="nav-links">
        <button
          className={vistaActual === "principal" ? "nav-link activo" : "nav-link"}
          onClick={onInicio}
        >
          Inicio
        </button>

        <button className="nav-link" onClick={onCanchas}>
          Canchas
        </button>

        <button
          className={vistaActual === "reservas" ? "nav-link activo" : "nav-link"}
          onClick={onReservas}
        >
          Reservas ({cantidadReservas})
        </button>
      </div>
    </nav>
  )
}

export default NavBar
export type { Vista }