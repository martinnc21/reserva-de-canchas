import type { Cancha } from "../types"

interface CanchaCardProps {
  cancha: Cancha
  onSelect: (cancha: Cancha) => void
  selected: boolean
}

function CanchaCard({ cancha, onSelect, selected }: CanchaCardProps) {
  return (
    <article className={`cancha-card ${selected ? "selected" : ""}`}>
      <img className="cancha-image" src={cancha.imagen} alt={cancha.nombre} />

      <div className="cancha-body">
        <h2>{cancha.nombre}</h2>
        <p>
          <strong>Deporte:</strong> {cancha.deporte}
        </p>
        <p>
          <strong>Superficie:</strong> {cancha.superficie}
        </p>
        <p>
          <strong>Precio:</strong> ${cancha.precioHora} por hora
        </p>
        <p>
          <strong>Horarios:</strong> {cancha.horariosDisponibles.length}
        </p>

        <button className="primary-button" onClick={() => onSelect(cancha)}>
          Ver información
        </button>
      </div>
    </article>
  )
}

export default CanchaCard