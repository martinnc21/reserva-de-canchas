type Vista = "inicio" | "canchas" | "reservas"

interface NavBarProps {
  vistaActual: Vista
  onNavegar: (vista: Vista) => void
  cantidadReservas: number
}

function NavBar({ vistaActual, onNavegar, cantidadReservas }: NavBarProps) {
  return (
    <nav className="nav-bar">
      <span className="nav-logo">Reserva de Canchas</span>

      <div className="nav-links">
        <button
          className={vistaActual === "inicio" ? "nav-link activo" : "nav-link"}
          onClick={() => onNavegar("inicio")}
        >
          Inicio
        </button>

        <button
          className={vistaActual === "canchas" ? "nav-link activo" : "nav-link"}
          onClick={() => onNavegar("canchas")}
        >
          Canchas
        </button>

        <button
          className={vistaActual === "reservas" ? "nav-link activo" : "nav-link"}
          onClick={() => onNavegar("reservas")}
        >
          Reservas ({cantidadReservas})
        </button>
      </div>
    </nav>
  )
}

export default NavBar
export type { Vista }