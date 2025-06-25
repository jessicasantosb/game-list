import { Outlet } from 'react-router-dom';
import style from './Auth.module.css';

function AuthLayout() {
  return (
    <div className={style.background}>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
