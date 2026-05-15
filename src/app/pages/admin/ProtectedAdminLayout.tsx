import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, Users, PawPrint, Lock } from 'lucide-react';
import authService from '../../services/authService';
import { LoginModal, LogoutButton } from '../../components/LoginModal';
import { Button } from '../../components/ui/button';

/**
 * Layout protegido del panel administrativo
 * Requiere autenticación para acceder
 */
export function ProtectedAdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = authService.getUser();

  // Verificar autenticación al montar
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);

      if (!authenticated) {
        setLoginOpen(true);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginOpen(true);
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/animales', icon: PawPrint, label: 'Especies' },
    { path: '/admin/usuarios', icon: Users, label: 'Administradores' },
  ];

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar modal de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoginModal
          isOpen={loginOpen}
          onOpenChange={setLoginOpen}
          onLoginSuccess={handleLoginSuccess}
        />
        <div className="text-center">
          <Lock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso Restringido</h1>
          <p className="text-gray-600">Por favor inicia sesión para acceder al panel administrativo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-green-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">ZooMAT Admin</h2>
          <p className="text-green-300 text-sm mt-1">Panel de Control</p>
          {user && <p className="text-green-200 text-xs mt-2">Usuario: {user.username}</p>}
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-800/50'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-800/50 transition-colors w-full"
          >
            <PawPrint size={20} />
            <span>Volver al sitio</span>
          </Link>
          <LogoutButton onLogout={handleLogout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <Outlet />
      </main>

      {/* Modal de login */}
      <LoginModal
        isOpen={loginOpen}
        onOpenChange={setLoginOpen}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
