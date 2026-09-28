import type { Cancha } from "../types"
import CondicionesReserva from "./CondicionesReserva"

interface CanchaDetailProps {
  cancha: Cancha | null
  onReservar: (horario: string) => void
  onVolver: () => void
}

function CanchaDetail({ cancha, onReservar, onVolver }: CanchaDetailProps) {
  if (!cancha) {
    return (
      <aside className="detalle-panel">
        Selecciona una cancha para ver el detalle.
      </aside>
    )
  }

  return (
    <aside className="detalle-panel">
      <button className="volver-button" onClick={onVolver}>
        ← Volver a canchas
      </button>

      <img src={cancha.imagen} alt={cancha.nombre} className="detalle-image" />

      <h2>{cancha.nombre}</h2>
      <p>{cancha.descripcion}</p>
      <p>
        <strong>Deporte:</strong> {cancha.deporte}
      </p>
      <p>
        <strong>Superficie:</strong> {cancha.superficie}
      </p>
      <p>
        <strong>Precio:</strong> ${cancha.precioHora} por hora
      </p>

      <h3>Horarios disponibles</h3>
      {cancha.horariosDisponibles.length === 0 ? (
        <p>No quedan horarios disponibles para esta cancha.</p>
      ) : (
        <div className="horarios">
          {cancha.horariosDisponibles.map((horario) => (
            <button
              key={horario}
              className="horario-button"
              onClick={() => onReservar(horario)}
            >
              {horario}
            </button>
          ))}
        </div>
      )}

      <CondicionesReserva cancha={cancha} />
    </aside>
  )
}

export default CanchaDetail