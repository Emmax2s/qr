import { Link } from "react-router";
import { ArrowRight, Users, Heart, TreePine, Calendar, MapPin, Ticket } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: Users,
      title: t('ui.home.highlights.speciesTitle'),
      description: t('ui.home.highlights.speciesDesc')
    },
    {
      icon: TreePine,
      title: t('ui.home.highlights.conservationTitle'),
      description: t('ui.home.highlights.conservationDesc')
    },
    {
      icon: Heart,
      title: t('ui.home.highlights.educationTitle'),
      description: t('ui.home.highlights.educationDesc')
    }
  ];

  const featuredAnimals = [
    {
      name: "Jaguar",
      image: "https://images.unsplash.com/photo-1649642229170-9ef79251c0e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWd1YXIlMjB3aWxkbGlmZSUyMG1leGljb3xlbnwxfHx8fDE3NzQ1ODUzNzl8MA&ixlib=rb-4.1.0&q=80&w=400",
      status: "En Peligro"
    },
    {
      name: "Tucán Pico Iris",
      image: "https://images.unsplash.com/photo-1618191702724-1e413e177fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VjYW4lMjBiaXJkJTIwdHJvcGljYWx8ZW58MXx8fHwxNzc0NTg1Mzc5fDA&ixlib=rb-4.1.0&q=80&w=400",
      status: "Amenazada"
    },
    {
      name: "Guacamaya Roja",
      image: "https://images.unsplash.com/photo-1561236902-c0a10c2391a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FybGV0JTIwbWFjYXclMjBwYXJyb3R8ZW58MXx8fHwxNzc0NTg1MzgwfDA&ixlib=rb-4.1.0&q=80&w=400",
      status: "Amenazada"
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold tracking-wider uppercase mb-6">
              <TreePine className="w-3.5 h-3.5" />
              <span>{t('ui.home.zooName')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
              {t('ui.home.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-8 leading-relaxed max-w-2xl">
              {t('ui.home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/visita"
                className="bg-gray-900 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-gray-800 transition flex items-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                {t('ui.home.hero.planVisit')}
              </Link>
              <Link
                to="/animales"
                className="bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                {t('ui.home.hero.exploreCatalog')}
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 border border-gray-100 shadow-sm relative">
              <img
                src="https://images.unsplash.com/photo-1649642229170-9ef79251c0e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWd1YXIlMjB3aWxkbGlmZSUyMG1leGljb3xlbnwxfHx8fDE3NzQ1ODUzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Jaguar en Chiapas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-start border-l border-gray-100 pl-6">
                <item.icon className="w-6 h-6 text-gray-900 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">{t('ui.home.featured.title')}</h2>
              <p className="text-gray-500 max-w-xl">{t('ui.home.featured.subtitle')}</p>
            </div>
            <Link
              to="/animales"
              className="text-sm font-medium text-gray-900 hover:text-gray-600 transition flex items-center gap-1 group"
            >
              {t('ui.home.featured.viewAll')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAnimals.map((animal, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                    {t(`ui.status.${animal.status.replace(/\s+/g, '')}`) || animal.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{animal.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Info */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-900 rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
            {/* Minimalist decorative background circle */}
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-gray-800 opacity-50 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('ui.home.visit.title')}</h2>
                  <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                    {t('ui.home.visit.subtitle')}
                  </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4 text-gray-300">
                    <Calendar className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">{t('ui.home.visit.openingTitle')}</p>
                      <p className="text-sm">{t('ui.home.visit.openingHours')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-gray-300">
                    <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">{t('ui.home.visit.locationTitle')}</p>
                      <p className="text-sm">{t('ui.home.visit.location')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-gray-300">
                    <Ticket className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">{t('ui.home.visit.admissionTitle')}</p>
                      <p className="text-sm">{t('ui.home.visit.admission')}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/visita"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  {t('ui.home.visit.moreDetails')}
                </Link>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1549924878-a2f1d7839df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b28lMjBlbnRyYW5jZSUyMGdhdGV8ZW58MXx8fHwxNzc0NTg1MzgyfDA&ixlib=rb-4.1.0&q=80&w=800"
                  alt="Entrada del ZooMAT"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Message */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Heart className="w-8 h-8 text-gray-900 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">{t('ui.home.conservation.title')}</h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            {t('ui.home.conservation.description')}
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-gray-600 transition"
          >
            {t('ui.home.conservation.cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
