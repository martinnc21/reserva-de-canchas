interface InicioProps {
    onVerCanchas: () => void
  }
  
  function Inicio({ onVerCanchas }: InicioProps) {
    const pasos = [
      { numero: 1, titulo: "Elige", texto: "Explora nuestras canchas de fútbol, pádel, vóleibol y básquetbol." },
      { numero: 2, titulo: "Selecciona", texto: "Escoge el día y el horario que más te acomode." },
      { numero: 3, titulo: "Completa", texto: "Ingresa tus datos en un formulario breve." },
      { numero: 4, titulo: "Confirma", texto: "Revisa el resumen y confirma tu reserva." },
    ]
  
    return (
      <div className="inicio">
        <section className="banner">
          <p className="eyebrow">Reserva deportiva</p>
          <h1>Reserva tu cancha en minutos</h1>
          <p className="banner-texto">
            Encuentra disponibilidad al instante y asegura tu horario sin llamadas ni esperas.
          </p>
          <button className="primary-button" onClick={onVerCanchas}>
            Ver canchas disponibles
          </button>
        </section>
  
        <section className="pasos">
          {pasos.map((paso) => (
            <div className="paso" key={paso.numero}>
              <span className="paso-numero">{paso.numero}</span>
              <h3>{paso.titulo}</h3>
              <p>{paso.texto}</p>
            </div>
          ))}
        </section>
      </div>
    )
  }
  
  export default Inicio