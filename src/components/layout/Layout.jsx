import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LiveChat, ScrollProgress, SocialProofPopup, MouseFollower } from '../ui';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <MouseFollower />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow mobile-overflow-hidden overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <LiveChat />
      <SocialProofPopup />
    </div>
  );
};

export default Layout;
