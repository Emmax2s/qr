import { Users, PawPrint, Eye, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from 'react-i18next';

export function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t('ui.admin.dashboard.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center">
            <PawPrint size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('ui.admin.dashboard.speciesRegistered')}</p>
            <p className="text-2xl font-bold text-gray-900">6</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('ui.admin.dashboard.admins')}</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center">
            <Eye size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('ui.admin.dashboard.monthlyVisits')}</p>
            <p className="text-2xl font-bold text-gray-900">4,200</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 text-red-700 rounded-lg flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('ui.admin.dashboard.systemAlerts')}</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('ui.admin.dashboard.recentActivity')}</h2>
          <div className="space-y-4">
            <p className="text-gray-600">{t('ui.admin.dashboard.noRecentActivity')}</p>
            {/* Aquí se pueden listar las actividades del admin */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('ui.admin.dashboard.quickActions')}</h2>
          <div className="flex flex-col gap-3">
            <Link to="/admin/animales" className="w-full bg-green-50 text-green-700 p-4 rounded-lg flex items-center justify-between hover:bg-green-100 transition-colors">
              <span className="font-medium">{t('ui.admin.dashboard.addSpecies')}</span>
              <PawPrint size={20} />
            </Link>
            <Link to="/admin/usuarios" className="w-full bg-blue-50 text-blue-700 p-4 rounded-lg flex items-center justify-between hover:bg-blue-100 transition-colors">
              <span className="font-medium">{t('ui.admin.dashboard.inviteAdmin')}</span>
              <Users size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
