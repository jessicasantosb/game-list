import { redirect } from 'react-router-dom';

export function redirectIfLoggedIn() {
  const isLoggedIn = Boolean(localStorage.getItem('loggedin'));

  if (isLoggedIn) {
    return redirect('/?message=You are already loggedin');
  }

  return null;
}
