export const storeAppointment = (appointment) => {
  const existing = getAppointments()
  // Check for duplicate booking
  if (existing.some((a) => a.date === appointment.date && a.time === appointment.time && a.doctor === appointment.doctor)) {
    return false
  }
  const updated = [...existing, appointment]
  localStorage.setItem("dentora_appointments", JSON.stringify(updated))
  return true
}

export const getAppointments = () => {
  const data = localStorage.getItem("dentora_appointments")
  return data ? JSON.parse(data) : []
}

export const cancelAppointment = (date, time, doctor) => {
  const existing = getAppointments()
  const updated = existing.filter(
    (a) => !(a.date === date && a.time === time && a.doctor === doctor)
  )
  localStorage.setItem("dentora_appointments", JSON.stringify(updated))
}