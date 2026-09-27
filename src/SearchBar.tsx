interface SearchBarProps {
  valor: string
  onChange: (valor: string) => void
}

function SearchBar({ valor, onChange }: SearchBarProps) {
  return (
    <div className="search-bar-wrap">
      <label htmlFor="busqueda" className="search-label">
        Buscar cancha
      </label>

      <input
        id="busqueda"
        type="text"
        value={valor}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ej: fútbol, pádel, vóleibol"
        className="search-input"
      />
    </div>
  )
}

export default SearchBar