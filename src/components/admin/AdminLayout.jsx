import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FileVideo, Briefcase, Users, MessageSquare, 
  Package, Star, Settings, LogOut, Menu, X, ChevronLeft,
  Building2, FileText, Image, Film, LayoutGrid
} from 'lucide-react';
import api from '../../services/api';

const menuItems = [
  { name: 'داشبورد', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'خدمات', path: '/admin/services', icon: Briefcase },
  { name: 'پروژه‌های وب', path: '/admin/web-projects', icon: FileVideo },
  { name: 'نمونه کارها', path: '/admin/portfolios', icon: Image },
  { name: 'ریلز', path: '/admin/reels', icon: Film },
  { name: 'کارت‌های خانه', path: '/admin/home-cards', icon: LayoutGrid },
  { name: 'صنایع', path: '/admin/industries', icon: Building2 },
  { name: 'تیم', path: '/admin/team', icon: Users },
  { name: 'بلاگ', path: '/admin/blog', icon: FileText },
  { name: 'مشتریان', path: '/admin/clients', icon: Building2 },
  { name: 'پکیج‌ها', path: '/admin/packages', icon: Package },
  { name: 'نظرات', path: '/admin/testimonials', icon: Star },
  { name: 'پیام‌ها', path: '/admin/contacts', icon: MessageSquare },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getMe();
        setUser(response.user);
      } catch (error) {
        navigate('/admin/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 right-0 z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} bg-dark-900 border-l border-white/5`}>
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          {sidebarOpen && (
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-black text-xl">آ</span>
              </div>
              <span className="text-lg font-bold text-white">پنل مدیریت</span>
            </Link>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-white/5 text-dark-400">
            <ChevronLeft className={`w-5 h-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary-500/10 text-primary-400' 
                    : 'text-dark-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          {user && sidebarOpen && (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/[0.02]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user.name}</p>
                <p className="text-dark-500 text-sm truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>خروج</span>}
          </button>
        </div>
      </aside>

      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 rounded-xl bg-dark-900 border border-white/10 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed inset-0 z-50 bg-dark-950"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-lg font-bold text-white">پنل مدیریت</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                    location.pathname === item.path ? 'bg-primary-500/10 text-primary-400' : 'text-dark-400'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:mr-64' : 'lg:mr-20'}`}>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
