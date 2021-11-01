export function numberValidator(name,fieldName) {
  if(fieldName == "mobile")
  {
    if (!name || name.length < 10) return false
  } else if(fieldName == "gst") {
    if (!name || name.length < 15) return false
  } else if(fieldName == "pan") {
    if (!name || name.length < 10) return false
  }
  
  return true
}
