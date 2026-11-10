import { useState, useEffect } from "react"
import { getAppointments, storeAppointment, cancelAppointment } from "../utils/storage"

export const useAppointments = () => {
  const [appointments, setAppointments] = useState(getAppointments)
  const [bookedSlots, setBookedSlots] = useState(new Set())

  useEffect(() => {
    // Parse booked slots from appointments
    const slots = new Set()
    appointments.forEach((appointment) => {
      slots.add(`${appointment.date}|${appointment.time}|${appointment.doctor}`)
    })
    setBookedSlots(slots)
  }, [appointments])

  const bookAppointment = (appointment) => {
    const result = storeAppointment(appointment)
    if (result) {
      setAppointments(getAppointments)
    }
    return result
  }

  const cancelBooking = (date, time, doctor) => {
    cancelAppointment(date, time, doctor)
    setAppointments(getAppointments)
  }

  return { appointments, bookedSlots, bookAppointment, cancelBooking }
}