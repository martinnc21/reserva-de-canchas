import { useEffect, useMemo, useState } from "react"
import "./App.css"
import { obtenerCanchas, obtenerReservas, guardarReservas } from "./services/canchasService"
import type { Cancha, Reserva } from "./types"
import CanchaList from "./components/CanchaList"
import CanchaDetail from "./components/CanchaDetail"
import SearchBar from "./components/SearchBar"
import NavBar, { type Vista } from "./components/NavBar"
import Inicio from "./components/Inicio"
import Reservas from "./components/Reservas"

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
  const [vista, setVista] = useState<Vista>("inicio")
  const [reservas, setReservas] = useState<Reserva[]>(() => obtenerReservas())
  const [pagoConfirmado, setPagoConfirmado] = useState(false)

  useEffect(() => {
    obtenerCanchas().then((datos) => {
      setCanchas(datos)
      setCargando(false)
    })
  }, [])

  useEffect(() => {
    guardarReservas(reservas)
  }, [reservas])

  const canchasFiltradas = useMemo(() => {
    return canchas.filter((cancha) => {
      const texto = normalizar(`${cancha.nombre} ${cancha.deporte}`)
      return texto.includes(normalizar(busqueda))
    })
  }, [canchas, busqueda])

  const agregarReserva = (canchaId: number, fecha: string, hora: string) => {
    const nuevaReserva: Reserva = {
      id: Date.now(),
      canchaId,
      fecha,
      hora,
    }
  
    setReservas((actuales) => [...actuales, nuevaReserva])
  }

  const eliminarReserva = (id: number) => {
    setReservas((actuales) => actuales.filter((reserva) => reserva.id !== id))
  }

  const pagarReservas = () => {
    setReservas([])
    setPagoConfirmado(true)
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Reserva deportiva</p>
        <h1>Reserva de Canchas</h1>
      </header>

      <NavBar vistaActual={vista} onNavegar={setVista} cantidadReservas={reservas.length} />

      {vista === "inicio" && <Inicio onVerCanchas={() => setVista("canchas")} />}

      {vista === "canchas" && (
        <>
          {canchaSeleccionada ? (
            <CanchaDetail
              cancha={canchaSeleccionada}
              reservas={reservas}
              onAgregar={agregarReserva}
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
              <Reservas
                reservas={reservas}
                canchas={canchas}
                pagoConfirmado={pagoConfirmado}
                onEliminar={eliminarReserva}
                onPagar={pagarReservas}
                onSeguirReservando={() => {
                  setPagoConfirmado(false)
                  setVista("canchas")
                }}
              />
            )}
    </main>
  )
}

export default App