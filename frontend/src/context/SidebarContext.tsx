import React, { useEffect, useState } from 'react';

import { SidebarContext } from '../hooks/useSidebar';

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasResized, setHasResized] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 1000;

      if (!hasResized) {
        if (isMobile) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        setHasResized(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [hasResized]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
