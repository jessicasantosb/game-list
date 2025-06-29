export function getUserName() {
  const full_name = localStorage.getItem('full_name');
  return { full_name };
}
