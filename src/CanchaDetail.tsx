import type { Cancha } from "./types"

interface CanchaDetailProps {
  cancha: Cancha | null
  onReservar: (horario: string) => void
}

function CanchaDetail({ cancha, onReservar }: CanchaDetailProps) {
  if (!cancha) {
    return (
      <aside className="detalle-panel">
        Selecciona una cancha para ver el detalle.
      </aside>
    )
  }

  return (
    <aside className="detalle-panel">
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
    </aside>
  )
}

export default CanchaDetail