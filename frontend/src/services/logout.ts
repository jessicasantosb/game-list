export function logout() {
  location.href = '/login';
  localStorage.removeItem('loggedin');
  localStorage.removeItem('full_name');
}
