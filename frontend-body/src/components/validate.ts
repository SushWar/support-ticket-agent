const validateEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  return emailRegex.test(email)
}

const validatePhone = (phone: string) => {
  const phoneRegex = /^\d{10}$/
  return phoneRegex.test(phone)
}

const cleanInput = (input: string): string => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const isMaliciousCode = (input: string) => {
  const maliciousRegex = /<script|<\/script|<iframe|<\/iframe/gi
  return maliciousRegex.test(input)
}

export { validateEmail, validatePhone, cleanInput, isMaliciousCode }
