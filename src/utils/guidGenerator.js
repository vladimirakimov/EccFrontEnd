export function generateGuid () {
  let sGuid = ''
  for (let i = 0; i < 32; i++) {
    sGuid += Math.floor(Math.random() * 0xF).toString(0xF)
  }
  return sGuid
}
