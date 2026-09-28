import { useEffect, useMemo, useState } from "react"
import "./App.css"
import { obtenerCanchas } from "./services/canchasService"
import type { Cancha } from "./types"
import CanchaList from "./components/CanchaList"
import CanchaDetail from "./components/CanchaDetail"
import SearchBar from "./components/SearchBar"


function App() {
  const [canchas, setCanchas] = useState<Cancha[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [canchaSeleccionada, setCanchaSeleccionada] = useState<Cancha | null>(null)
  const [cargando, setCargando] = useState(true)
  const [mensajeReserva, setMensajeReserva] = useState("")

  useEffect(() => {
    obtenerCanchas().then((datos) => {
      setCanchas(datos)
      setCanchaSeleccionada(datos[0] ?? null)
      setCargando(false)
    })
  }, [])

  const canchasFiltradas = useMemo(() => {
    return canchas.filter((cancha) => {
      const texto = `${cancha.nombre} ${cancha.deporte}`.toLowerCase()
      return texto.includes(busqueda.toLowerCase())
    })
  }, [canchas, busqueda])

  const canchaVisible =
    canchaSeleccionada &&
    canchasFiltradas.some((cancha) => cancha.id === canchaSeleccionada.id)
      ? canchaSeleccionada
      : canchasFiltradas[0] ?? null

  const reservarHorario = (horario: string) => {
    if (!canchaVisible) return

  const horariosRestantes = canchaVisible.horariosDisponibles.filter(
    (hora) => hora !== horario
  )

  if (horariosRestantes.length == canchaVisible.horariosDisponibles.length) return

  setCanchas((actuales) =>
    actuales.map((cancha) =>
      cancha.id === canchaVisible.id
        ? {... cancha, horariosDisponibles: horariosRestantes}
        : cancha
    )
  )

  setCanchaSeleccionada((actual) =>
    actual?.id === canchaVisible.id
      ?{...actual, horariosDisponibles: horariosRestantes}
      :actual
  )


    setMensajeReserva(
      `Reserva confirmada para ${canchaVisible.nombre} a las ${horario}.`
    )
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Reserva deportiva</p>
        <h1>Reserva de Canchas</h1>
      </header>

      <SearchBar valor={busqueda} onChange={setBusqueda} />

      {cargando ? (
        <div className="estado">Cargando canchas...</div>
      ) : canchasFiltradas.length === 0 ? (
        <div className="estado">No encontramos canchas con esa búsqueda.</div>
      ) : (
        <div className="app-grid">
          <CanchaList
            canchas={canchasFiltradas}
            onSelect={setCanchaSeleccionada}
            selectedId={canchaVisible?.id ?? null}
          />

          <CanchaDetail
            cancha={canchaVisible}
            onReservar={reservarHorario}
          />
        </div>
      )}

      {mensajeReserva && (
        <div className="reserva-confirmada">{mensajeReserva}</div>
      )}
    </main>
  )
}

export default App