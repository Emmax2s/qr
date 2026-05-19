import { MapPin, Info, Utensils, ShoppingBag, Heart, TreePine, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ZooMap() {
  const { t } = useTranslation();
  const zooAddress = "Calz. Cerro Hueco s/n, El Zapotal, 29094 Tuxtla Gutiérrez, Chis.";
  const mapsQuery = encodeURIComponent(zooAddress);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const zones = [
    {
      name: t('ui.pages.map.zones.felines.name'),
      icon: "🐆",
      color: "bg-orange-100 border-orange-500 text-orange-800",
      animals: [t('ui.pages.map.zones.felines.animals.0'), t('ui.pages.map.zones.felines.animals.1'), t('ui.pages.map.zones.felines.animals.2')],
      location: t('ui.pages.map.zones.felines.location')
    },
    {
      name: t('ui.pages.map.zones.aviary.name'),
      icon: "🦜",
      color: "bg-blue-100 border-blue-500 text-blue-800",
      animals: [t('ui.pages.map.zones.aviary.animals.0'), t('ui.pages.map.zones.aviary.animals.1'), t('ui.pages.map.zones.aviary.animals.2')],
      location: t('ui.pages.map.zones.aviary.location')
    },
    {
      name: t('ui.pages.map.zones.primates.name'),
      icon: "🐵",
      color: "bg-purple-100 border-purple-500 text-purple-800",
      animals: [t('ui.pages.map.zones.primates.animals.0'), t('ui.pages.map.zones.primates.animals.1'), t('ui.pages.map.zones.primates.animals.2')],
      location: t('ui.pages.map.zones.primates.location')
    },
    {
      name: t('ui.pages.map.zones.reptiles.name'),
      icon: "🐊",
      color: "bg-green-100 border-green-600 text-green-800",
      animals: [t('ui.pages.map.zones.reptiles.animals.0'), t('ui.pages.map.zones.reptiles.animals.1'), t('ui.pages.map.zones.reptiles.animals.2')],
      location: t('ui.pages.map.zones.reptiles.location')
    },
    {
      name: t('ui.pages.map.zones.herbivores.name'),
      icon: "🦌",
      color: "bg-amber-100 border-amber-500 text-amber-800",
      animals: [t('ui.pages.map.zones.herbivores.animals.0'), t('ui.pages.map.zones.herbivores.animals.1'), t('ui.pages.map.zones.herbivores.animals.2')],
      location: t('ui.pages.map.zones.herbivores.location')
    },
    {
      name: t('ui.pages.map.zones.aquatic.name'),
      icon: "🦆",
      color: "bg-cyan-100 border-cyan-500 text-cyan-800",
      animals: [t('ui.pages.map.zones.aquatic.animals.0'), t('ui.pages.map.zones.aquatic.animals.1'), t('ui.pages.map.zones.aquatic.animals.2')],
      location: t('ui.pages.map.zones.aquatic.location')
    }
  ];

  const facilities = [
    { icon: Utensils, name: t('ui.pages.map.facilities.0.name'), description: t('ui.pages.map.facilities.0.description') },
    { icon: ShoppingBag, name: t('ui.pages.map.facilities.1.name'), description: t('ui.pages.map.facilities.1.description') },
    { icon: Heart, name: t('ui.pages.map.facilities.2.name'), description: t('ui.pages.map.facilities.2.description') },
    { icon: Info, name: t('ui.pages.map.facilities.3.name'), description: t('ui.pages.map.facilities.3.description') },
  ];

  const highlights = [
    {
      title: t('ui.pages.map.highlights.trail.title'),
      description: t('ui.pages.map.highlights.trail.description'),
      icon: TreePine,
      duration: t('ui.pages.map.highlights.trail.duration')
    },
    {
      title: t('ui.pages.map.highlights.viewpoint.title'),
      description: t('ui.pages.map.highlights.viewpoint.description'),
      icon: Camera,
      duration: t('ui.pages.map.highlights.viewpoint.duration')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t('ui.pages.map.header.title')}</h1>
          <p className="text-xl text-green-100">
            {t('ui.pages.map.header.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Mapa Visual */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-green-700" />
            <h2 className="text-3xl font-bold text-green-800">{t('ui.pages.map.sections.generalPlan')}</h2>
          </div>

          {/* Mapa Interactivo */}
          <div className="rounded-lg mb-6 overflow-hidden shadow-md border-4 border-green-300">
            <div className="relative">
              <a
                href="https://www.google.com/maps/search/Calz.+Cerro+Hueco+s%2Fn,+El+Zapotal,+29094+Tuxtla+Gutiérrez,+Chis"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Abrir en Maps
              </a>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3739.8717826894944!2d-93.11355!3d16.756861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ec5a8a8c9c9c9d%3A0x8c5d8a2c9c9c9c9d!2sZooMAT%20-%20Calz.%20Cerro%20Hueco%20s%2Fn%2C%20El%20Zapotal%2C%2029094%20Tuxtla%20Gu!5e0!3m2!1ses!2smx!4v1684000000000"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>

          {/* Leyenda */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {zones.map((zone, index) => (
              <div key={index} className={`${zone.color} border-2 rounded-lg p-3 text-center`}>
                <div className="text-3xl mb-1">{zone.icon}</div>
                <div className="font-semibold text-sm">{zone.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Zonas Detalladas */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6">{t('ui.pages.map.sections.thematicZones')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, index) => (
              <div key={index} className={`${zone.color} border-2 rounded-lg p-6`}>
                <div className="text-5xl mb-3">{zone.icon}</div>
                <h3 className="font-bold text-xl mb-2">{zone.name}</h3>
                <div className="text-sm opacity-80 mb-3">
                  <MapPin className="inline w-3 h-3 mr-1" />
                  {zone.location}
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-sm mb-1">{t('ui.pages.map.featuredSpecies')}:</p>
                  {zone.animals.map((animal, idx) => (
                    <div key={idx} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                      {animal}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Servicios */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6">{t('ui.pages.map.sections.services')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center border-2 border-green-200">
                <facility.icon className="w-12 h-12 text-green-700 mx-auto mb-3" />
                <h3 className="font-bold text-lg text-gray-800 mb-1">{facility.name}</h3>
                <p className="text-sm text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Puntos de Interés */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6">{t('ui.pages.map.sections.pointsOfInterest')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-gradient-to-br from-green-700 to-green-900 text-white rounded-lg p-6">
                <highlight.icon className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-xl mb-2">{highlight.title}</h3>
                <p className="text-green-100 mb-3">{highlight.description}</p>
                <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm">
                  {t('ui.pages.map.approxDuration')}: {highlight.duration}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consejos */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl text-blue-900 mb-3">{t('ui.pages.map.tips.title')}</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• {t('ui.pages.map.tips.items.0')}</li>
                <li>• {t('ui.pages.map.tips.items.1')}</li>
                <li>• {t('ui.pages.map.tips.items.2')}</li>
                <li>• {t('ui.pages.map.tips.items.3')}</li>
                <li>• {t('ui.pages.map.tips.items.4')}</li>
                <li>• {t('ui.pages.map.tips.items.5')}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
