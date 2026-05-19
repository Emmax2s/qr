import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, Heart } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('ui.pages.contact.form.submitSuccess'));
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('ui.pages.contact.info.phone.title'),
      details: ["+529615438890", "(961) 614-4700", t('ui.pages.contact.info.phone.detail')]
    },
    {
      icon: Mail,
      title: t('ui.pages.contact.info.email.title'),
      details: ["zoomat@chiapas.gob.mx", t('ui.pages.contact.info.email.detail')]
    },
    {
      icon: MapPin,
      title: t('ui.pages.contact.info.address.title'),
      details: ["Calzada Cerro Hueco S/N", "Tuxtla Gutiérrez, Chiapas"]
    },
    {
      icon: Clock,
      title: t('ui.pages.contact.info.hours.title'),
      details: [t('ui.pages.contact.info.hours.detail1'), t('ui.pages.contact.info.hours.detail2')]
    }
  ];

  const departments = [
    {
      name: t('ui.pages.contact.departments.education.name'),
      email: "educacion@zoomat.chiapas.gob.mx",
      phone: "Ext. 123",
      description: t('ui.pages.contact.departments.education.description')
    },
    {
      name: t('ui.pages.contact.departments.donations.name'),
      email: "donaciones@zoomat.chiapas.gob.mx",
      phone: "Ext. 145",
      description: t('ui.pages.contact.departments.donations.description')
    },
    {
      name: t('ui.pages.contact.departments.admin.name'),
      email: "admin@zoomat.chiapas.gob.mx",
      phone: "Ext. 100",
      description: t('ui.pages.contact.departments.admin.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t('ui.pages.contact.header.title')}</h1>
          <p className="text-xl text-green-100">
            {t('ui.pages.contact.header.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de Contacto */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6">{t('ui.pages.contact.form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('ui.pages.contact.form.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t('ui.pages.contact.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('ui.pages.contact.form.emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={t('ui.pages.contact.form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('ui.pages.contact.form.subjectLabel')}
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">{t('ui.pages.contact.form.subjectOptions.default')}</option>
                    <option value="informacion">{t('ui.pages.contact.form.subjectOptions.info')}</option>
                    <option value="visita-escolar">{t('ui.pages.contact.form.subjectOptions.schoolVisit')}</option>
                    <option value="donacion">{t('ui.pages.contact.form.subjectOptions.donations')}</option>
                    <option value="voluntariado">{t('ui.pages.contact.form.subjectOptions.volunteer')}</option>
                    <option value="quejas">{t('ui.pages.contact.form.subjectOptions.feedback')}</option>
                    <option value="otro">{t('ui.pages.contact.form.subjectOptions.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('ui.pages.contact.form.messageLabel')}
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder={t('ui.pages.contact.form.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-4 rounded-lg font-semibold hover:bg-green-800 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t('ui.pages.contact.form.submit')}
                </button>
              </form>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <info.icon className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Redes Sociales */}
            <div className="bg-gradient-to-br from-green-700 to-green-900 text-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">{t('ui.pages.contact.social.title')}</h3>
              <div className="flex gap-3">
                <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
              <p className="text-green-100 text-sm mt-4">
                {t('ui.pages.contact.social.caption')}
              </p>
            </div>
          </div>
        </div>

        {/* Departamentos */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6">{t('ui.pages.contact.departments.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
                <h3 className="font-bold text-lg text-green-800 mb-2">{dept.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-green-700">
                    <Mail className="w-4 h-4" />
                    <span className="break-all">{dept.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <Phone className="w-4 h-4" />
                    <span>{dept.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Apoyo */}
        <section className="mt-12 bg-gradient-to-r from-green-700 to-green-900 text-white rounded-xl shadow-lg p-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{t('ui.pages.contact.support.title')}</h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto mb-6">
            {t('ui.pages.contact.support.description')}
          </p>
          <button className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
            {t('ui.pages.contact.support.cta')}
          </button>
        </section>
      </div>
    </div>
  );
}
