import type { Cancha } from "../types"
import CondicionesReserva from "./CondicionesReserva"
import { useState } from "react"
import Calendario from "./Calendario"

interface CanchaDetailProps {
  cancha: Cancha | null
  onReservar: (horario: string) => void
  onVolver: () => void
}

function CanchaDetail({ cancha, onReservar, onVolver }: CanchaDetailProps) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null)
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
      <h3>Selecciona una fecha</h3>
      <Calendario fechaSeleccionada={fechaSeleccionada} onSeleccionar={setFechaSeleccionada} />
      {fechaSeleccionada && <p>Elegiste: {fechaSeleccionada}</p>}
      <h4>Horarios disponibles</h4>
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