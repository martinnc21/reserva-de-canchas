import type { Cancha } from "../types"

interface CondicionesReservaProps {
  cancha: Cancha
}

function CondicionesReserva({ cancha }: CondicionesReservaProps) {
  return (
    <div className="condiciones">
      <h3>Información</h3>

      <p>
        <strong>Horario de atención:</strong> {cancha.horarioAtencion}
      </p>
      <p>
        <strong>Dirección:</strong> {cancha.direccion}
      </p>

      <p className="condiciones-etiqueta">Prestaciones</p>
      <ul className="prestaciones-lista">
        {cancha.prestaciones.map((prestacion) => (
          <li key={prestacion}>{prestacion}</li>
        ))}
      </ul>

      <div className="condiciones-aviso">
        <p>
          Debes completar el pago de tu reserva de forma anticipada. Podrás
          cambiar la hora o la fecha hasta 24 horas antes del horario
          reservado; pasado ese plazo no se aceptan cambios ni devoluciones.
        </p>
      </div>
    </div>
  )
}

export default CondicionesReserva