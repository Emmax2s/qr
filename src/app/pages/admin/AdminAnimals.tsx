import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, Search, X, AlertCircle, CheckCircle } from "lucide-react";

// Datos locales de animales
const localAnimals = [
  {
    id: '1',
    name: 'Jaguar',
    species: 'Panthera onca',
    habitat: 'Selvas tropicales y bosques humedos de Chiapas',
    imageUrl: 'https://images.unsplash.com/photo-1649642229170-9ef79251c0e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWd1YXIlMjB3aWxkbGlmZSUyMG1leGljb3xlbnwxfHx8fDE3NzQ1ODUzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    conservation: 'En Peligro de Extincion',
    description: 'El jaguar es el felino más grande de América.',
    diet: 'Carnivoro: pecaries, venados, tapires, aves y reptiles',
  },
  {
    id: '2',
    name: 'Tucan Pico Iris',
    species: 'Ramphastos sulfuratus',
    habitat: 'Selva tropical humeda',
    imageUrl: 'https://images.unsplash.com/photo-1618191702724-1e413e177fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VjYW4lMjBiaXJkJTIwdHJvcGljYWx8ZW58MXx8fHwxNzc0NTg1Mzc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    conservation: 'Amenazada',
    description: 'El tucán es una ave tropical colorida.',
    diet: 'Omnivoro: frutas, insectos y pequenos vertebrados',
  },
  {
    id: '3',
    name: 'Tapir Centroamericano',
    species: 'Tapirus bairdii',
    habitat: 'Bosques tropicales y humedales',
    imageUrl: 'https://images.unsplash.com/photo-1771253085305-f90f40feaad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXBpciUyMHdpbGRsaWZlfGVufDF8fHx8MTc3NDU4NTM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    conservation: 'En Peligro de Extincion',
    description: 'El tapir es un mamífero de gran tamaño.',
    diet: 'Herbivoro: hojas, frutas y plantas acuaticas',
  },
  {
    id: '4',
    name: 'Mono Arana',
    species: 'Ateles geoffroyi',
    habitat: 'Selvas tropicales del sureste mexicano',
    imageUrl: 'https://images.unsplash.com/photo-1586492633743-d4477f713f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXIlMjBtb25rZXklMjBwcmltYXRlfGVufDF8fHx8MTc3NDU4NTM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    conservation: 'En Peligro de Extincion',
    description: 'El mono araña es ágil y tiene una cola prensil.',
    diet: 'Omnivoro: frutas, flores, semillas e insectos',
  },
  {
    id: '5',
    name: 'Guacamaya Roja',
    species: 'Ara macao',
    habitat: 'Selvas tropicales humedas',
    imageUrl: 'https://images.unsplash.com/photo-1561236902-c0a10c2391a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FybGV0JTIwbWFjYXclMjBwYXJyb3R8ZW58MXx8fHwxNzc0NTg1MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    conservation: 'Amenazada',
    description: 'La guacamaya roja es una ave colorida y longeva.',
    diet: 'Herbivoro: frutas, nueces, semillas y flores',
  },
  {
    id: '6',
    name: 'Cocodrilo de Pantano',
    species: 'Crocodylus moreletii',
    habitat: 'Rios, lagos y pantanos',
    imageUrl: 'https://images.unsplash.com/photo-1600333489678-6c6a1f0269a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jb2RpbGUlMjByZXB0aWxlfGVufDF8fHx8MTc3NDU4NTM4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    conservation: 'Protegida Especial',
    description: 'El cocodrilo es un reptil depredador.',
    diet: 'Carnivoro: peces, aves y pequenos mamiferos',
  }
];

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

interface AnimalData {
  id: string;
  name: string;
  species: string;
  habitat: string;
  imageUrl: string;
  conservation: string;
  description: string;
  diet: string;
}

export function AdminAnimals() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [animals, setAnimals] = useState<AnimalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
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

  // Cargar animales
  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = () => {
    try {
      setLoading(true);
      // Usar datos locales
      setAnimals(localAnimals);
      setError(null);
    } catch (err) {
      setError(t('ui.admin.animals.errorLoad') as string || 'No se pudieron cargar las especies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (animal?: AnimalData) => {
    if (animal) {
      setEditingId(animal.id?.toString() || null);
      setFormData({
        slug: '',
        name: animal.name || '',
        species: animal.species || '',
        habitat: animal.habitat || '',
        imageUrl: animal.imageUrl || '',
        conservation: animal.conservation || '',
        description: animal.description || '',
        diet: animal.diet || '',
        lifespan: '',
        activity: '',
        size: '',
        weight: '',
        distribution: '',
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
