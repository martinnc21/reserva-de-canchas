import { useState } from "react"
import { diasDelMes, diaSemanaLunes, fechaAISO, esFechaPasada } from "../dateUtils"

interface CalendarioProps {
  fechaSeleccionada: string | null
  onSeleccionar: (fecha: string) => void
}

const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
const MESES_HACIA_ADELANTE = 3

function Calendario({ fechaSeleccionada, onSeleccionar }: CalendarioProps) {
  const hoy = new Date()
  const [mesMostrado, setMesMostrado] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1))

  const dias = diasDelMes(mesMostrado)
  const espaciosVacios = diaSemanaLunes(dias[0])
  const nombreMes = mesMostrado.toLocaleDateString("es-CL", { month: "long", year: "numeric" })

  const esMesActual =
    mesMostrado.getFullYear() === hoy.getFullYear() && mesMostrado.getMonth() === hoy.getMonth()

  const limiteAdelante = new Date(hoy.getFullYear(), hoy.getMonth() + MESES_HACIA_ADELANTE, 1)
  const esUltimoMesPermitido =
    mesMostrado.getFullYear() === limiteAdelante.getFullYear() &&
    mesMostrado.getMonth() === limiteAdelante.getMonth()

  const irMesAnterior = () => {
    setMesMostrado((actual) => new Date(actual.getFullYear(), actual.getMonth() - 1, 1))
  }

  const irMesSiguiente = () => {
    setMesMostrado((actual) => new Date(actual.getFullYear(), actual.getMonth() + 1, 1))
  }

  return (
    <div className="calendario">
      <div className="calendario-header">
        <button
          className="calendario-flecha"
          onClick={irMesAnterior}
          disabled={esMesActual}
          aria-label="Mes anterior"
        >
          «
        </button>

        <p className="calendario-mes">{nombreMes}</p>

        <button
          className="calendario-flecha"
          onClick={irMesSiguiente}
          disabled={esUltimoMesPermitido}
          aria-label="Mes siguiente"
        >
          »
        </button>
      </div>

      <div className="calendario-grid">
        {diasSemana.map((dia) => (
          <span key={dia} className="calendario-encabezado">
            {dia}
          </span>
        ))}

        {Array.from({ length: espaciosVacios }).map((_, indice) => (
          <span key={`vacio-${indice}`} />
        ))}

        {dias.map((dia) => {
          const iso = fechaAISO(dia)
          const pasado = esFechaPasada(new Date(dia))
          const seleccionado = iso === fechaSeleccionada

          return (
            <button
              key={iso}
              className={`calendario-dia ${seleccionado ? "seleccionado" : ""}`}
              disabled={pasado}
              onClick={() => onSeleccionar(iso)}
            >
              {dia.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendario