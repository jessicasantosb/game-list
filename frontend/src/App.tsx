import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './App.css';

import Layout from './components/Layout';
import AuthLayout from './pages/auth/AuthLayout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Category } from './pages/category/Category';
import { Games } from './pages/games/Games';
import { Home } from './pages/home/Home';
import { Platform } from './pages/platform/Platform';
import { redirectIfLoggedIn } from './services/redirectIfLoggedIn';
import { requireAuth } from './services/requiredAuth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<AuthLayout />}>
        <Route path='/login' element={<Login />} loader={redirectIfLoggedIn} />
        <Route
          path='/register'
          element={<Register />}
          loader={redirectIfLoggedIn}
        />
      </Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} loader={requireAuth} />
        <Route path='/games' element={<Games />} loader={requireAuth} />
        <Route path='/categories' element={<Category />} loader={requireAuth} />
        <Route path='/platforms' element={<Platform />} loader={requireAuth} />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
