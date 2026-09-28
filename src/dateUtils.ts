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