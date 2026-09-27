import type { Cancha } from "./types"
import CanchaCard from "./CanchaCard"

interface CanchaListProps {
  canchas: Cancha[]
  onSelect: (cancha: Cancha) => void
  selectedId: number | null
}

function CanchaList({ canchas, onSelect, selectedId }: CanchaListProps) {
  return (
    <section className="list-section">
      <h2>Listado de canchas</h2>

      <div className="cancha-list">
        {canchas.map((cancha) => (
          <CanchaCard
            key={cancha.id}
            cancha={cancha}
            onSelect={onSelect}
            selected={selectedId === cancha.id}
          />
        ))}
      </div>
    </section>
  )
}

export default CanchaList