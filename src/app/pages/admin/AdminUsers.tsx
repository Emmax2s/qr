import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Mail, ShieldAlert, X } from "lucide-react";
import { apiClient } from "../../services/api";

const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY || 'zoomat-admin-key';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

export function AdminUsers() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: 'TempPassword123!',
    role: 'Editor'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<User[]>('/admin/list');
      setUsers(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(t('ui.admin.loadingError') as string || 'Error al cargar administradores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        isActive: true
      };
      
      await apiClient.post('/admin/create', payload, {
        headers: { 'x-admin-key': ADMIN_KEY }
      });
      
      setMessage({ type: 'success', text: t('ui.admin.msgCreateSuccess') });
      setFormData({ username: '', email: '', password: 'TempPassword123!', role: 'Editor' });
      setShowModal(false);
      loadUsers();
      
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: t('ui.admin.msgCreateError') });
      console.error(err);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm(t('ui.admin.confirmDelete') as string)) return;
    
    try {
      await apiClient.delete(`/admin/${userId}`, {
        headers: { 'x-admin-key': ADMIN_KEY }
      });
      
      setMessage({ type: 'success', text: t('ui.admin.msgDeleteSuccess') });
      loadUsers();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: t('ui.admin.msgDeleteError') });
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{t('ui.admin.title')}</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition-colors"
        >
          <Plus size={20} />
          <span>{t('ui.admin.inviteButton')}</span>
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
        <ShieldAlert className="flex-shrink-0 mt-1" size={20} />
        <div>
          <h3 className="font-bold mb-1">{t('ui.admin.permissionsTitle')}</h3>
          <p className="text-sm">{t('ui.admin.permissionsText')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
          <div className="p-8 text-center text-gray-500">{t('ui.admin.loading')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="p-4 font-medium border-b border-gray-100">{t('ui.admin.table.name')}</th>
                  <th className="p-4 font-medium border-b border-gray-100">{t('ui.admin.table.email')}</th>
                  <th className="p-4 font-medium border-b border-gray-100">{t('ui.admin.table.role')}</th>
                  <th className="p-4 font-medium border-b border-gray-100 text-right">{t('ui.admin.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      {user.username}
                    </td>
                    <td className="p-4 text-gray-600 flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {t(user.role === 'Super Admin' ? 'ui.admin.role.super' : 'ui.admin.role.editor')}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {user.role !== 'Super Admin' && (
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title={t('ui.admin.revokeTitle') as string}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal para invitar admin */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('ui.admin.modalTitle')}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('ui.admin.usernameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('ui.admin.emailLabel')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ej: juan@zoomat.mx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('ui.admin.roleLabel')}
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Editor">{t('ui.admin.role.editor')}</option>
                  <option value="Super Admin">{t('ui.admin.role.super')}</option>
                </select>
              </div>

              <p className="text-xs text-gray-500">{t('ui.admin.inviteNote')}</p>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('ui.admin.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
                >
                  {t('ui.admin.invite')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
