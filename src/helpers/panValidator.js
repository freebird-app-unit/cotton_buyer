export function panValidator(panVal) {
  const re = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  if (!re.test(panVal)) return false
  return true
}
