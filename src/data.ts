import type {Cancha} from "./types"

export const canchas: Cancha[] = [
    {
        id: 1,
        nombre: "Cancha de Fútbol",
        deporte: "Futbol",
        superficie: "Pasto sintético",
        precioHora: 25000,
        imagen: "/canchafutbol1.jpg",
        descripcion: "Cancha de fútbol 7",
        horariosDisponibles: ["11:00","13:00","17:00"],
    },
    {
        id: 2,
        nombre: "Cancha de Voleibol",
        deporte: "Voleibol",
        superficie: "Pvc vinilico",
        precioHora: 12000,
        imagen: "/canchavoleibol2.jpg",
        descripcion: "Cancha de Voleibol",
        horariosDisponibles: ["11:00","12:00","13:00","17:00","19:00"],
    },
    {
        id: 3,
        nombre: "Cancha de Pádel",
        deporte: "Pádel",
        superficie: "Pasto sintético",
        precioHora: 15000,
        imagen: "/canchapadel3.jpg",
        descripcion: "Cancha de Pádel",
        horariosDisponibles: ["18:00","19:00","20:00","21:00"],
    },
    {
        id: 4,
        nombre: "Cancha de Basquetbol",
        deporte: "Basquetbol",
        superficie: "Madera",
        precioHora: 16000,
        imagen: "/canchabasquetbol4.jpg",
        descripcion: "Cancha de Basquetbol",
        horariosDisponibles: ["15:00","18:00","20:00"],
    }
]