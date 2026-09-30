import { useState } from "react"
import type { Cancha, Reserva } from "../types"
import { horariosLibres } from "../dateUtils"
import Calendario from "./Calendario"
import CondicionesReserva from "./CondicionesReserva"

interface CanchaDetailProps {
  cancha: Cancha | null
  reservas: Reserva[]
  onAgregar: (canchaId: number, fecha: string, hora: string) => void
  onVolver: () => void
}

function CanchaDetail({ cancha, reservas, onAgregar, onVolver }: CanchaDetailProps) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null)
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null)
  const [mensaje, setMensaje] = useState<string | null>(null)

  if (!cancha) {
    return (
      <aside className="detalle-panel">
        Selecciona una cancha para ver el detalle.
      </aside>
    )
  }

  const horarios = fechaSeleccionada
    ? horariosLibres(cancha, fechaSeleccionada, reservas)
    : []

  const elegirFecha = (fecha: string) => {
    setFechaSeleccionada(fecha)
    setHoraSeleccionada(null)
    setMensaje(null)
  }

  const confirmarReserva = () => {
    if (!fechaSeleccionada || !horaSeleccionada) return

    onAgregar(cancha.id, fechaSeleccionada, horaSeleccionada)
    setMensaje(`Añadiste ${cancha.nombre} para el ${fechaSeleccionada} a las ${horaSeleccionada}.`)
    setFechaSeleccionada(null)
    setHoraSeleccionada(null)
  }

  return (
    <aside className="detalle-panel">
      <button className="volver-button" onClick={onVolver}>
        ← Volver a canchas
      </button>

      <div className="detalle-hero">
        <img
          src={cancha.imagenBanner}
          alt={cancha.nombre}
          className="detalle-image"
          style={{ objectPosition: cancha.posicionBanner }}
        />
        <div className="detalle-hero-texto">
          <h2>{cancha.nombre}</h2>
          <span className="detalle-badge">{cancha.deporte}</span>
        </div>
      </div>

      <p className="detalle-descripcion">{cancha.descripcion}</p>

      <div className="ficha-tecnica">
        <div className="ficha-dato">
          <span className="ficha-dato-etiqueta">Superficie</span>
          <span className="ficha-dato-valor">{cancha.superficie}</span>
        </div>

        <div className="ficha-dato">
          <span className="ficha-dato-etiqueta">Precio por hora</span>
          <span className="ficha-dato-valor">${cancha.precioHora}</span>
        </div>

        <div className="ficha-dato">
          <span className="ficha-dato-etiqueta">Deporte</span>
          <span className="ficha-dato-valor">{cancha.deporte}</span>
        </div>
      </div>

      <h3>Reservar tu cancha</h3>

      <div className="reserva-pasos">
        <div className="paso-reserva">
          <p className="paso-reserva-titulo">1. Selecciona una fecha</p>
          <Calendario fechaSeleccionada={fechaSeleccionada} onSeleccionar={elegirFecha} />
        </div>

        <div className="paso-reserva">
          <p className="paso-reserva-titulo">2. Elige un horario</p>
          {!fechaSeleccionada ? (
            <p className="paso-reserva-vacio">Esperando fecha...</p>
          ) : horarios.length === 0 ? (
            <p className="paso-reserva-vacio">No quedan horarios para este día.</p>
          ) : (
            <div className="horarios">
              {horarios.map((hora) => (
                <button
                  key={hora}
                  className={`horario-button ${horaSeleccionada === hora ? "seleccionado" : ""}`}
                  onClick={() => setHoraSeleccionada(hora)}
                >
                  {hora}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="paso-reserva">
          <p className="paso-reserva-titulo">3. Confirma</p>
          {!horaSeleccionada ? (
            <p className="paso-reserva-vacio">Esperando horario...</p>
          ) : (
            <div className="resumen-reserva">
              <p>
                <strong>Fecha:</strong> {fechaSeleccionada}
              </p>
              <p>
                <strong>Hora:</strong> {horaSeleccionada}
              </p>
              <p>
                <strong>Precio:</strong> ${cancha.precioHora}
              </p>
              <button className="primary-button" onClick={confirmarReserva}>
                Añadir cancha
              </button>
            </div>
          )}
        </div>
      </div>

      {mensaje && <div className="reserva-confirmada">{mensaje}</div>}

      <CondicionesReserva cancha={cancha} />
    </aside>
  )
}

export default CanchaDetail