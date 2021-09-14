export function getThisDateSeveralYearsAgo(years: number = 0): Date {
  const newYearValue = new Date().getFullYear() - years
  return new Date(new Date().setFullYear(newYearValue))
}
