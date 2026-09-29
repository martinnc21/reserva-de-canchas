import { canchas } from "../data"
import type { Cancha, Reserva } from "../types"

const CLAVE_RESERVAS = "reserva-canchas:reservas"

export const obtenerCanchas = () =>
  new Promise<Cancha[]>((resolve) => {
    setTimeout(() => {
      resolve(canchas)
    }, 600)
  })

export const obtenerReservas = (): Reserva[] => {
  const guardado = localStorage.getItem(CLAVE_RESERVAS)
  if (!guardado) return []

  try {
    return JSON.parse(guardado) as Reserva[]
  } catch {
    return []
  }
}

export const guardarReservas = (reservas: Reserva[]) => {
  localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas))
}