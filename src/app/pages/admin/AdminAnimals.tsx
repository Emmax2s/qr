import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, Search, X, AlertCircle, CheckCircle, Download } from "lucide-react";
import QRCode from 'qrcode.react';
import { speciesService, Species } from "../../services/speciesService";

interface FormData {
  slug: string;
  name: string;
  species: string;
  habitat: string;
  imageUrl: string;
  conservation: string;
  description: string;
  diet: string;
  lifespan: string;
  activity: string;
  size: string;
  weight: string;
  distribution: string;
}

export function AdminAnimals() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [animals, setAnimals] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [qrRef, setQrRef] = useState<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    slug: '',
    name: '',
    species: '',
    habitat: '',
    imageUrl: '',
    conservation: '',
    description: '',
    diet: '',
    lifespan: '',
    activity: '',
    size: '',
    weight: '',
    distribution: '',
  });

  // Cargar animales del API
  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      const result = await speciesService.getAll();
      // Mapear propiedades del backend al formato esperado por el componente
      const mapped = result.data.map((animal: any) => ({
        id: animal.id,
        name: animal.name,
        scientificName: animal.species, // El backend usa 'species' para el nombre científico
        habitat: animal.habitat,
        image: animal.imageUrl,
        conservation: animal.conservation,
        description: animal.description,
        diet: animal.diet,
        lifespan: animal.lifespan,
        activity: animal.activity,
        size: animal.size,
        weight: animal.weight,
        distribution: animal.distribution,
      }));
      setAnimals(mapped);
      setError(null);
    } catch (err) {
      setError(t('ui.admin.animals.errorLoad') as string || 'No se pudieron cargar las especies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (animal?: Species) => {
    if (animal) {
      setEditingId(animal.id?.toString() || null);
      setFormData({
        slug: '',
        name: animal.name || '',
        species: animal.scientificName || '',
        habitat: animal.habitat || '',
        imageUrl: animal.image || '',
        conservation: animal.conservation || '',
        description: animal.description || '',
        diet: animal.diet || '',
        lifespan: animal.lifespan || '',
        activity: animal.activity || '',
        size: animal.size || '',
        weight: animal.weight || '',
        distribution: animal.distribution || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        slug: '',
        name: '',
        species: '',
        habitat: '',
        imageUrl: '',
        conservation: '',
        description: '',
        diet: '',
        lifespan: '',
        activity: '',
        size: '',
        weight: '',
        distribution: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Actualizar
        await speciesService.update(parseInt(editingId), {
          name: formData.name,
          scientificName: formData.species,
          habitat: formData.habitat,
          image: formData.imageUrl,
          conservation: formData.conservation,
          description: formData.description,
          diet: formData.diet,
          lifespan: formData.lifespan,
          activity: formData.activity,
          size: formData.size,
          weight: formData.weight,
          distribution: formData.distribution,
        });
        setMessage({ type: 'success', text: t('ui.admin.animals.msgUpdateSuccess') });
      } else {
        // Crear
        await speciesService.create({
          name: formData.name,
          scientificName: formData.species,
          habitat: formData.habitat,
          image: formData.imageUrl,
          conservation: formData.conservation,
          description: formData.description,
          diet: formData.diet,
          lifespan: formData.lifespan,
          activity: formData.activity,
          size: formData.size,
          weight: formData.weight,
          distribution: formData.distribution,
        });
        setMessage({ type: 'success', text: t('ui.admin.animals.msgCreateSuccess') });
      }

      await loadAnimals();
      handleCloseModal();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: t('ui.admin.animals.msgSaveError') });
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta especie?')) {
      try {
        await speciesService.delete(parseInt(id));
        setMessage({ type: 'success', text: t('ui.admin.animals.msgDeleteSuccess') });
        await loadAnimals();
        setTimeout(() => setMessage(null), 3000);
      } catch (err) {
        setMessage({ type: 'error', text: t('ui.admin.animals.msgDeleteError') });
        console.error(err);
      }
    }
  };

  const downloadQRCode = () => {
    if (!qrRef) return;

    const svg = qrRef.querySelector('svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = svg.clientWidth;
      canvas.height = svg.clientHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `qr-${formData.name.replace(/\s+/g, '-')}.png`;
        link.click();
      }
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const filteredAnimals = animals.filter(animal => 
    animal.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Mensajes */}
      {message && (
        <div className={`flex items-center gap-3 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {message.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{t('ui.admin.animals.title')}</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition-colors"
        >
          <Plus size={20} />
          <span>{t('ui.admin.animals.newButton')}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('ui.admin.animals.searchPlaceholder') as string}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-4 font-medium border-b border-gray-100">Nombre Común</th>
                <th className="p-4 font-medium border-b border-gray-100">Nombre Científico</th>
                <th className="p-4 font-medium border-b border-gray-100">Hábitat</th>
                <th className="p-4 font-medium border-b border-gray-100 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    {t('ui.admin.animals.loading')}
                  </td>
                </tr>
              ) : filteredAnimals.length > 0 ? (
                filteredAnimals.map((animal) => (
                  <tr key={animal.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="p-4 font-medium text-gray-900">{animal.name}</td>
                    <td className="p-4 text-gray-600 text-sm">{animal.scientificName || '-'}</td>
                    <td className="p-4 text-gray-600 text-sm">{animal.habitat || '-'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenModal(animal)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(animal.id?.toString() || '')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    {error || t('ui.admin.animals.noneFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? t('ui.admin.animals.modalEditTitle') : t('ui.admin.animals.modalNewTitle')}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.commonName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.scientificName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.species}
                    onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.habitat')}</label>
                  <input
                    type="text"
                    value={formData.habitat}
                    onChange={(e) => setFormData({ ...formData, habitat: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.conservation')}</label>
                  <input
                    type="text"
                    value={formData.conservation}
                    onChange={(e) => setFormData({ ...formData, conservation: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ej: En Peligro de Extinción"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.diet')}</label>
                  <input
                    type="text"
                    value={formData.diet}
                    onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.lifespan')}</label>
                  <input
                    type="text"
                    value={formData.lifespan}
                    onChange={(e) => setFormData({ ...formData, lifespan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.activity')}</label>
                  <input
                    type="text"
                    value={formData.activity}
                    onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.size')}</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.weight')}</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.distribution')}</label>
                  <input
                    type="text"
                    value={formData.distribution}
                    onChange={(e) => setFormData({ ...formData, distribution: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.imageUrl')}</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('ui.admin.animals.label.description')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* QR Code Section */}
              <div className="border-t border-gray-300 pt-6 mt-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('ui.admin.animals.qr.title')}</h3>
                      <p className="text-sm text-gray-600">{t('ui.admin.animals.qr.description')}</p>
                    </div>
                  </div>

                  {/* QR ID Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">{t('ui.admin.animals.qr.labelId')}</label>
                      <div className="text-3xl font-bold text-green-600">
                        {editingId || 'Nuevo'}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{t('ui.admin.animals.qr.idDescription')}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">{t('ui.admin.animals.qr.labelType')}</label>
                      <div className="text-lg font-bold text-green-600 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                        {t('ui.admin.animals.qr.typePermanent')}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{t('ui.admin.animals.qr.typeDesc')}</p>
                    </div>
                  </div>

                  {/* QR Preview and Download */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* QR Preview */}
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-semibold text-gray-700 mb-3">{t('ui.admin.animals.qr.previewTitle')}</p>
                      <div
                        ref={setQrRef}
                        className="p-4 bg-white border-4 border-gray-300 rounded-lg shadow-md"
                      >
                        <QRCode
                          value={`${window.location.origin}/animales?id=${editingId || 'nuevo'}`}
                          size={250}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-3 text-center">{t('ui.admin.animals.qr.printNote')}</p>
                    </div>

                    {/* QR Info and Download */}
                    <div className="flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">{t('ui.admin.animals.qr.labelUrl')}</label>
                          <div className="bg-gray-50 p-3 rounded border border-gray-300 break-all">
                            <code className="text-xs text-gray-700">
                              {`${window.location.origin}/animales?id=${editingId || 'nuevo'}`}
                            </code>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{t('ui.admin.animals.qr.urlDesc', { name: formData.name || t('ui.admin.animals.qr.thisSpecies') })}</p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-900">
                            <span className="font-semibold">💡 Tip:</span> {t('ui.admin.animals.qr.tip')}
                          </p>
                        </div>
                      </div>

                      {/* Download Buttons */}
                      <div className="flex flex-col gap-3 pt-4">
                        <button
                          type="button"
                          onClick={downloadQRCode}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                        >
                          <Download size={20} />
                          {t('ui.admin.animals.qr.downloadPng')}
                        </button>
                        <button
                          type="button"
                          onClick={downloadQRCode}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                          <Download size={20} />
                          {t('ui.admin.animals.qr.downloadQr')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t('ui.admin.animals.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
                >
                  {editingId ? t('ui.admin.animals.update') : t('ui.admin.animals.create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
