export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-CA')
}

export function getUnitAbbreviation(unit: string) {
  let abbreviation = ''
  switch (unit) {
    case 'miles':
      abbreviation = 'mi'
      break
    case 'lunar':
      abbreviation = 'lunar'
      break
    case 'astronomical':
      abbreviation = 'astro'
      break
    default:
      abbreviation = 'km'
  }
  return abbreviation
}
