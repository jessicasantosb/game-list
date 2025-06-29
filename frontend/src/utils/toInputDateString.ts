export function toInputDateString(
  date: string | Date | null | undefined,
): string {
  if (!date) return '';

  if (typeof date === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

    const match = date.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];

    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return '';

    return parsed.toISOString().substring(0, 10);
  }

  if (date instanceof Date && !isNaN(date.getTime())) {
    return date.toISOString().substring(0, 10);
  }

  return '';
}
