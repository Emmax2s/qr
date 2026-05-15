import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, Users, PawPrint, LogOut } from "lucide-react";

export function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/animales", icon: PawPrint, label: "Especies" },
    { path: "/admin/usuarios", icon: Users, label: "Administradores" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-green-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">ZooMAT Admin</h2>
          <p className="text-green-300 text-sm mt-1">Panel de Control</p>
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
                  isActive ? "bg-green-800 text-white" : "text-green-100 hover:bg-green-800/50"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-green-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-800/50 transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Volver al sitio</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
