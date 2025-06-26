import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSidebar } from '../../hooks/useSidebar';
import { useUser } from '../../hooks/useUser';
import {
  category,
  compactLogo,
  fullLogo,
  game,
  home,
  logout as logoutIcon,
  platform,
} from '../../utils/icons';
import { Button } from '../ui/button/Button';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const { logout } = useUser();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? { backgroundColor: '#42D9C8', color: '#fff' } : undefined;

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <Button className={styles.menuButton} onClick={toggleSidebar}>
        ☰
      </Button>
      <div className={styles.header}>
        {isOpen ? (
          <div className={styles.logo}>
            <img src={fullLogo} alt='Logo' />
          </div>
        ) : (
          <img
            src={compactLogo}
            alt='Logo Compact'
            className={styles.logoCompact}
          />
        )}
      </div>

      <nav className={styles.nav}>
        <NavLink
          to='/'
          style={navLinkStyle}
          className={`${styles.navItem} ${!isOpen ? styles.navItemClosed : ''}`}>
          <img src={home} alt='Home' className={styles.icon} />
          {isOpen && <span>Home</span>}
        </NavLink>

        <NavLink
          style={navLinkStyle}
          to='/games'
          className={`${styles.navItem} ${!isOpen ? styles.navItemClosed : ''}`}>
          <img src={game} alt='Games' className={styles.icon} />
          {isOpen && <span>Games</span>}
        </NavLink>

        <NavLink
          style={navLinkStyle}
          to='/categories'
          className={`${styles.navItem} ${!isOpen ? styles.navItemClosed : ''}`}>
          <img src={category} alt='Categories' className={styles.icon} />
          {isOpen && <span>Categories</span>}
        </NavLink>

        <NavLink
          style={navLinkStyle}
          to='/platforms'
          className={`${styles.navItem} ${!isOpen ? styles.navItemClosed : ''}`}>
          <img src={platform} alt='Platforms' className={styles.icon} />
          {isOpen && <span>Platforms</span>}
        </NavLink>
      </nav>

      <Button
        onClick={logout}
        className={`${styles.navItem} ${styles.logout} ${!isOpen ? styles.logoutClosed : ''}`}>
        {isOpen && <span>Logout</span>}

        <img src={logoutIcon} alt='Logout' className={styles.logoutIcon} />
      </Button>
    </aside>
  );
};

export default Sidebar;
