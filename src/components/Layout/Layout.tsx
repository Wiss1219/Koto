import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header'; // This path is corrected to point to the main Header component
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  // Admin routes will not use the main Header and Footer
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
