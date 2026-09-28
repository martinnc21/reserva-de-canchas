import { canchas } from "../data"
import type { Cancha } from "../types"

export const obtenerCanchas = () =>
  new Promise<Cancha[]>((resolve) => {
    setTimeout(() => {
      resolve(canchas)
    }, 600)
  })