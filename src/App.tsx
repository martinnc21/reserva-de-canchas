import {canchas} from "./data";

function App() {
    return(
        <div>
            <h1>Reserva de Canchas</h1>
            {canchas.map((cancha) => (
                <div key={cancha.id}>
                    <img src={cancha.imagen} alt={cancha.nombre} width={300} height={200} />
                    <h2>{cancha.nombre}</h2>
                    <p>{cancha.deporte} - {cancha.superficie}</p>
                    <p>${cancha.precioHora} por hora</p>
                    <p>Horarios: {cancha.horariosDisponibles.join(",")}</p>
                </div>
            ))}
        </div>   
    );
}

export default App; 