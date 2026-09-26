import { canchas } from "./data"
import { useState } from "react"
import type { Cancha } from "./types"
import CanchaCard from "./CanchaCard"

function App() {
    const [ canchaSeleccionada, setCanchaSeleccionada] = 
    useState<Cancha | null>(null)

    
    return (
    <main>
      <h1>Reserva de Canchas</h1>

      <section>
        <h2>Listado de canchas</h2>

        <div>
          {canchas.map((cancha) => (
            <CanchaCard
              key={cancha.id}
              cancha={cancha}
              onSelect={setCanchaSeleccionada}
            />
          ))}
        </div>
      </section>

      {canchaSeleccionada && (
        <section>
         <h2>Detalles de la cancha</h2>

         <h3>{canchaSeleccionada.nombre}</h3>

        <p>{canchaSeleccionada.descripcion}</p>
        <p>Deporte: {canchaSeleccionada.deporte}</p>
        <p>Superficie: {canchaSeleccionada.superficie}</p>
        <p>Precio: ${canchaSeleccionada.precioHora} por hora</p>

        <h3>Selecciona un horario</h3>

        {canchaSeleccionada.horariosDisponibles.map((horario) => (
            <button key={horario}>
                 Reservar {horario}
            </button>
        ))}
        </section>
        )}
    </main>
  )
}

export default App