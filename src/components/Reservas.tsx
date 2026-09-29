import { useState } from "react"
import type { Cancha, Reserva } from "../types"

interface ReservasProps {
  reservas: Reserva[]
  canchas: Cancha[]
  pagoConfirmado: boolean
  onEliminar: (id: number) => void
  onPagar: () => void
  onSeguirReservando: () => void
}

function Reservas({
  reservas,
  canchas,
  pagoConfirmado,
  onEliminar,
  onPagar,
  onSeguirReservando,
}: ReservasProps) {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")

  if (pagoConfirmado) {
    return (
      <div className="pago-exito">
        <h2>¡Pago confirmado!</h2>
        <p>Te enviamos el detalle de tu reserva a tu correo.</p>
        <button className="primary-button" onClick={onSeguirReservando}>
          Volver a canchas
        </button>
      </div>
    )
  }

  if (reservas.length === 0) {
    return (
      <div className="estado">
        Todavía no has añadido ninguna cancha. Ve a "Canchas" para reservar una.
      </div>
    )
  }

  const total = reservas.reduce((suma, reserva) => {
    const cancha = canchas.find((c) => c.id === reserva.canchaId)
    return suma + (cancha?.precioHora ?? 0)
  }, 0)

  const formularioCompleto =
    nombre.trim() !== "" &&
    apellido.trim() !== "" &&
    telefono.trim() !== "" &&
    email.trim() !== ""

  return (
    <div className="reservas-checkout">
      <h2>Tus reservas</h2>

      <div className="reservas-lista">
        {reservas.map((reserva) => {
          const cancha = canchas.find((c) => c.id === reserva.canchaId)
          if (!cancha) return null

          return (
            <div className="reserva-item" key={reserva.id}>
              <img src={cancha.imagen} alt={cancha.nombre} />

              <div className="reserva-item-info">
                <p className="reserva-item-nombre">{cancha.nombre}</p>
                <p>{reserva.fecha}</p>
                <p>{reserva.hora} hrs</p>
              </div>

              <p className="reserva-item-precio">${cancha.precioHora}</p>

              <button
                className="eliminar-button"
                onClick={() => onEliminar(reserva.id)}
                aria-label="Eliminar reserva"
              >
                🗑
              </button>
            </div>
          )
        })}
      </div>

      <div className="reservas-total">
        <strong>Total</strong>
        <strong>${total}</strong>
      </div>

      <h3>Información</h3>

      <form className="checkout-form" onSubmit={(evento) => evento.preventDefault()}>
        <div className="form-row">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="form-row">
          <label htmlFor="apellido">Apellido</label>
          <input id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>

        <div className="form-row">
          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </form>

      <button className="primary-button pagar-button" onClick={onPagar} disabled={!formularioCompleto}>
        Pagar
      </button>
    </div>
  )
}

export default Reservas