export const formatDateYear = (date?: Date | undefined) => {
  const dateString = String(date);

  if (!dateString) return '';
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) return '';
  const [, year, month, day] = match;

  return `${day}/${month}/${year}`;
};
