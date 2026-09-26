import type { Cancha } from "./types"

interface CanchaCardProps {
  cancha: Cancha
  onSelect: (cancha: Cancha) => void
}

function CanchaCard({ cancha, onSelect }: CanchaCardProps) {
  return (
    <article>
      <img
        src={cancha.imagen}
        alt={cancha.nombre}
        width={300}
        height={200}
      />

      <h2>{cancha.nombre}</h2>
      <p>Deporte: {cancha.deporte}</p>
      <p>Superficie: {cancha.superficie}</p>
      <p>Precio: ${cancha.precioHora} por hora</p>
      <p>Horarios disponibles: {cancha.horariosDisponibles.length}</p>

      <button onClick={() => onSelect(cancha)}>
        Ver información
      </button>
    </article>
  )
}

export default CanchaCard