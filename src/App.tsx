import { useEffect, useMemo, useState } from "react"
import "./App.css"
import { obtenerCanchas } from "./services/canchasService"
import type { Cancha } from "./types"
import CanchaList from "./components/CanchaList"
import CanchaDetail from "./components/CanchaDetail"
import SearchBar from "./components/SearchBar"
import NavBar, { type Vista } from "./components/NavBar"
import Inicio from "./components/Inicio"

const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

function App() {
  const [canchas, setCanchas] = useState<Cancha[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [canchaSeleccionada, setCanchaSeleccionada] = useState<Cancha | null>(null)
  const [cargando, setCargando] = useState(true)
  const [mensajeReserva, setMensajeReserva] = useState("")
  const [vista, setVista] = useState<Vista>("inicio")

  useEffect(() => {
    obtenerCanchas().then((datos) => {
      setCanchas(datos)
      setCargando(false)
    })
  }, [])

  const canchasFiltradas = useMemo(() => {
    return canchas.filter((cancha) => {
      const texto = normalizar(`${cancha.nombre} ${cancha.deporte}`)
      return texto.includes(normalizar(busqueda))
    })
  }, [canchas, busqueda])

  const reservarHorario = (horario: string) => {
    if (!canchaSeleccionada) return

    const horariosRestantes = canchaSeleccionada.horariosDisponibles.filter(
      (hora) => hora !== horario
    )

    if (horariosRestantes.length === canchaSeleccionada.horariosDisponibles.length) return

    setCanchas((actuales) =>
      actuales.map((cancha) =>
        cancha.id === canchaSeleccionada.id
          ? { ...cancha, horariosDisponibles: horariosRestantes }
          : cancha
      )
    )

    setCanchaSeleccionada((actual) =>
      actual ? { ...actual, horariosDisponibles: horariosRestantes } : actual
    )

    setMensajeReserva(
      `Reserva confirmada para ${canchaSeleccionada.nombre} a las ${horario}.`
    )
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Reserva deportiva</p>
        <h1>Reserva de Canchas</h1>
      </header>

      <NavBar vistaActual={vista} onNavegar={setVista} cantidadReservas={0} />

      {vista === "inicio" && <Inicio onVerCanchas={() => setVista("canchas")} />}

      {vista === "canchas" && (
        <>
          {canchaSeleccionada ? (
            <CanchaDetail
              cancha={canchaSeleccionada}
              onReservar={reservarHorario}
              onVolver={() => setCanchaSeleccionada(null)}
            />
          ) : (
            <>
              <SearchBar valor={busqueda} onChange={setBusqueda} />

              {cargando ? (
                <div className="estado">Cargando canchas...</div>
              ) : canchasFiltradas.length === 0 ? (
                <div className="estado">No encontramos canchas con esa búsqueda.</div>
              ) : (
                <CanchaList canchas={canchasFiltradas} onSelect={setCanchaSeleccionada} />
              )}
            </>
          )}
        </>
      )}

      {vista === "reservas" && (
        <div className="estado">Esta es la vista de Reservas (la armamos más adelante).</div>
      )}

      {mensajeReserva && <div className="reserva-confirmada">{mensajeReserva}</div>}
    </main>
  )
}

export default App