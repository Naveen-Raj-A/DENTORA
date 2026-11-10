export const generateWhatsAppUrl = (name, phone, email, treatment, date, time, message) => {
  const encodedName = encodeURIComponent(name)
  const encodedPhone = encodeURIComponent(phone)
  const encodedEmail = encodeURIComponent(email)
  const encodedTreatment = encodeURIComponent(treatment)
  const encodedDate = encodeURIComponent(date)
  const encodedTime = encodeURIComponent(time)
  const encodedMessage = encodeURIComponent(message)

  const baseUrl = "https://wa.me/"
  const queryParams = [
    `telephone=${encodedPhone}`,
    `text=Appointment%20Details:%0A%0A`
  ]
  // Add appointment details to the message
  const details = [
    `Name:${encodedName}%0A`,
    `Email:${encodedEmail}%0A`,
    `Phone:${encodedPhone}%0A`,
    `Treatment:${encodedTreatment}%0A`,
    `Date:${encodedDate}%0A`,
    `Time:${encodedTime}%0A`,
    `Message:${encodedMessage}%0A`
  ]

  return `${baseUrl}${queryParams.join("&")}${details.join("")}`
}