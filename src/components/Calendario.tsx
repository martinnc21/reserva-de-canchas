import { diasDelMes, diaSemanaLunes, fechaAISO, esFechaPasada } from "../dateUtils"

interface CalendarioProps {
  fechaSeleccionada: string | null
  onSeleccionar: (fecha: string) => void
}

const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

function Calendario({ fechaSeleccionada, onSeleccionar }: CalendarioProps) {
  const hoy = new Date()
  const dias = diasDelMes(hoy)
  const espaciosVacios = diaSemanaLunes(dias[0])
  const nombreMes = hoy.toLocaleDateString("es-CL", { month: "long", year: "numeric" })

  return (
    <div className="calendario">
      <p className="calendario-mes">{nombreMes}</p>

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