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
  const [vista, setVista] = useState<Vista>("principal")
  const [carrito, setCarrito] = useState<Reserva[]>([])
  const [reservasConfirmadas, setReservasConfirmadas] = useState<Reserva[]>(() => obtenerReservas())
  const [pagoConfirmado, setPagoConfirmado] = useState(false)

  useEffect(() => {
    obtenerCanchas().then((datos) => {
      setCanchas(datos)
      setCargando(false)
    })
  }, [])

  useEffect(() => {
    guardarReservas(reservasConfirmadas)
  }, [reservasConfirmadas])

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

    setCarrito((actuales) => [...actuales, nuevaReserva])
  }

  const eliminarReserva = (id: number) => {
    setCarrito((actuales) => actuales.filter((reserva) => reserva.id !== id))
  }

  const pagarReservas = () => {
    setReservasConfirmadas((actuales) => [...actuales, ...carrito])
    setCarrito([])
    setPagoConfirmado(true)
  }

  const seleccionarCancha = (cancha: Cancha) => {
    setCanchaSeleccionada(cancha)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  const irAInicio = () => {
    setCanchaSeleccionada(null)
    setVista("principal")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const irACanchas = () => {
    setCanchaSeleccionada(null)
    setVista("principal")
    setTimeout(() => {
      document.getElementById("listado-canchas")?.scrollIntoView({ behavior: "smooth" })
    }, 0)
  }

  return (
    <main className="app-shell">
      <NavBar
        vistaActual={vista}
        onInicio={irAInicio}
        onCanchas={irACanchas}
        onReservas={() => setVista("reservas")}
        cantidadReservas={carrito.length}
      />

{vista === "principal" && canchaSeleccionada && (
        <CanchaDetail
          cancha={canchaSeleccionada}
          reservas={[...reservasConfirmadas, ...carrito]}
          onAgregar={agregarReserva}
          onVolver={() => {
            setCanchaSeleccionada(null)
            setTimeout(() => {
              document.getElementById("listado-canchas")?.scrollIntoView({ behavior: "smooth" })
            }, 0)
          }}
        />
      )}

      {vista === "principal" && !canchaSeleccionada && (
        <>
          <Inicio onVerCanchas={irACanchas} />

          <div id="listado-canchas">
            <SearchBar valor={busqueda} onChange={setBusqueda} />

            {cargando ? (
              <div className="estado">Cargando canchas...</div>
            ) : canchasFiltradas.length === 0 ? (
              <div className="estado">No encontramos canchas con esa búsqueda.</div>
            ) : (
              <CanchaList canchas={canchasFiltradas} onSelect={seleccionarCancha} />
            )}
          </div>
        </>
      )}

      {vista === "reservas" && (
        <Reservas
          reservas={carrito}
          canchas={canchas}
          pagoConfirmado={pagoConfirmado}
          onEliminar={eliminarReserva}
          onPagar={pagarReservas}
          onSeguirReservando={() => {
            setPagoConfirmado(false)
            setVista("principal")
          }}
        />
      )}
    </main>
  )
}

export default App