import { Clock, MapPin, Ticket, CreditCard, Users, Info, Car, Bus, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Visit() {
  const { t } = useTranslation();

  const prices = [
    { type: t('ui.pages.visit.prices.adults.type'), price: "$30", description: t('ui.pages.visit.prices.adults.description') },
    { type: t('ui.pages.visit.prices.children.type'), price: "$15", description: t('ui.pages.visit.prices.children.description') },
    { type: t('ui.pages.visit.prices.students.type'), price: "$20", description: t('ui.pages.visit.prices.students.description') },
    { type: t('ui.pages.visit.prices.seniors.type'), price: "$15", description: t('ui.pages.visit.prices.seniors.description') },
    { type: t('ui.pages.visit.prices.under3.type'), price: t('ui.pages.visit.prices.under3.price'), description: t('ui.pages.visit.prices.under3.description') },
  ];

  const schedule = [
    { day: t('ui.pages.visit.schedule.tueSun.day'), hours: t('ui.pages.visit.schedule.tueSun.hours'), note: t('ui.pages.visit.schedule.tueSun.note') },
    { day: t('ui.pages.visit.schedule.monday.day'), hours: t('ui.pages.visit.schedule.monday.hours'), note: t('ui.pages.visit.schedule.monday.note') },
  ];

  const recommendations = [
    t('ui.pages.visit.recommendations.items.0'),
    t('ui.pages.visit.recommendations.items.1'),
    t('ui.pages.visit.recommendations.items.2'),
    t('ui.pages.visit.recommendations.items.3'),
    t('ui.pages.visit.recommendations.items.4'),
    t('ui.pages.visit.recommendations.items.5')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t('ui.pages.visit.header.title')}</h1>
          <p className="text-xl text-green-100">
            {t('ui.pages.visit.header.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Horarios */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-green-700" />
            <h2 className="text-3xl font-bold text-green-800">{t('ui.pages.visit.sections.schedule')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedule.map((item, index) => (
              <div key={index} className="border-l-4 border-green-600 pl-4 py-2">
                <div className="font-bold text-xl text-gray-800">{item.day}</div>
                <div className="text-2xl text-green-700 font-semibold">{item.hours}</div>
                <div className="text-sm text-gray-600 mt-1">{item.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Precios */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Ticket className="w-8 h-8 text-green-700" />
            <h2 className="text-3xl font-bold text-green-800">{t('ui.pages.visit.sections.prices')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prices.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
                <div className="font-bold text-lg text-gray-800 mb-1">{item.type}</div>
                <div className="text-3xl font-bold text-green-700 mb-2">{item.price}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start gap-2">
              <CreditCard className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900">{t('ui.pages.visit.payment.title')}</p>
                <p className="text-sm text-blue-800">{t('ui.pages.visit.payment.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ubicación */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-green-700" />
            <h2 className="text-3xl font-bold text-green-800">{t('ui.pages.visit.sections.location')}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{t('ui.pages.visit.location.addressTitle')}</h3>
                  <p className="text-gray-700">
                    Calzada Cerro Hueco S/N<br />
                    Col. El Zapotal<br />
                    Tuxtla Gutiérrez, Chiapas<br />
                    C.P. 29094
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    {t('ui.pages.visit.location.byCarTitle')}
                  </h3>
                  <p className="text-gray-700">
                    {t('ui.pages.visit.location.byCarDescription')}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
                    <Bus className="w-5 h-5" />
                    {t('ui.pages.visit.location.publicTransportTitle')}
                  </h3>
                  <p className="text-gray-700">
                    {t('ui.pages.visit.location.publicTransportDescription')}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg h-96 overflow-hidden shadow-md border-2 border-gray-300">
              <div className="relative h-full">
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
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Recomendaciones */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-8 h-8 text-green-700" />
            <h2 className="text-3xl font-bold text-green-800">{t('ui.pages.visit.sections.recommendations')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Grupos */}
        <section className="bg-gradient-to-br from-green-700 to-green-900 text-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8" />
            <h2 className="text-3xl font-bold">{t('ui.pages.visit.groups.title')}</h2>
          </div>
          <p className="text-green-100 text-lg mb-4">
            {t('ui.pages.visit.groups.subtitle')}
          </p>
          <ul className="space-y-2 mb-6 text-green-100">
            <li>• {t('ui.pages.visit.groups.items.0')}</li>
            <li>• {t('ui.pages.visit.groups.items.1')}</li>
            <li>• {t('ui.pages.visit.groups.items.2')}</li>
            <li>• {t('ui.pages.visit.groups.items.3')}</li>
          </ul>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="font-semibold mb-1">{t('ui.pages.visit.groups.bookingTitle')}</p>
            <p className="text-green-100">{t('ui.pages.visit.groups.bookingContact')}</p>
            <p className="text-green-100">Tel: +529615438890</p>
            <p className="text-green-100">Tel: (961) 614-4700 ext. 123</p>
            <p className="text-green-100">educacion@zoomat.chiapas.gob.mx</p>
          </div>
        </section>

        {/* Aviso */}
        <section className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">{t('ui.pages.visit.notice.title')}</h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• {t('ui.pages.visit.notice.items.0')}</li>
                <li>• {t('ui.pages.visit.notice.items.1')}</li>
                <li>• {t('ui.pages.visit.notice.items.2')}</li>
                <li>• {t('ui.pages.visit.notice.items.3')}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
