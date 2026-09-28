export interface Cancha {
    id : number;
    nombre : string;
    deporte : "Futbol" | "Voleibol" | "Pádel" | "Basquetbol";
    superficie: string;
    precioHora: number;
    imagen: string;
    descripcion: string;
    horariosDisponibles: string[];
}

export interface Reserva {
    id: number
    canchaId: number
    fecha: string
    hora: string
  }