export const truncateString = (str: string | undefined) => {
  if (str) return str.length > 30 ? str.substring(0, 20) + '...' : str;
};