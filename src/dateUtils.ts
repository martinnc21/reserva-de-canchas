import type { Cancha, Reserva } from "./types"

export const hoyISO = () => {
    const hoy = new Date()
    const año = hoy.getFullYear()
    const mes = String(hoy.getMonth() + 1).padStart(2, "0")
    const dia = String(hoy.getDate()).padStart(2, "0")
    return `${año}-${mes}-${dia}`
  }
  
  export const fechaAISO = (fecha: Date) => {
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, "0")
    const dia = String(fecha.getDate()).padStart(2, "0")
    return `${año}-${mes}-${dia}`
  }
  
  export const esFechaPasada = (fecha: Date) => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    fecha.setHours(0, 0, 0, 0)
    return fecha < hoy
  }

  export const horariosLibres = (
    cancha: Cancha,
    fecha: string,
    reservas: Reserva[]
  ) => {
    const ocupados = reservas
      .filter((r) => r.canchaId === cancha.id && r.fecha === fecha)
      .map((r) => r.hora)
  
    return cancha.horariosDisponibles.filter((hora) => !ocupados.includes(hora))
  }
  export const diasDelMes = (fecha: Date): Date[] => {
    const año = fecha.getFullYear()
    const mes = fecha.getMonth()
    const ultimoDia = new Date(año, mes + 1, 0).getDate()
  
    const dias: Date[] = []
    for (let dia = 1; dia <= ultimoDia; dia++) {
      dias.push(new Date(año, mes, dia))
    }
    return dias
  }
  
  export const diaSemanaLunes = (fecha: Date): number => {
    const dia = fecha.getDay()
    return dia === 0 ? 6 : dia - 1
  }