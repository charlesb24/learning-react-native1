export function getFormattedDate(date) {
  date.setUTCHours(12);

  return `${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 9 ? '0' : ''}${date.getDate()}-${date.getFullYear()}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function convertToISOString(dateString) {
  const [ month, day, year ] = dateString.split('-');

  return `${year}-${month}-${day}`;
}