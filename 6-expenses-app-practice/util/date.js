export function getFormattedDate(date) {
  date.setUTCHours(12);

  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}