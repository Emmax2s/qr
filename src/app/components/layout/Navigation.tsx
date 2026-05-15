import { Link, useLocation } from "react-router";
import { Menu, X, MapPin, Phone, Clock, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || localStorage.getItem('language') || 'es';

  const toggleLanguage = () => {
    const next = (i18n.language || localStorage.getItem('language') || 'es') === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    try { localStorage.setItem('language', next); } catch {}
  };

  const links = [
    { to: "/", label: t('ui.navbar.home') },
    { to: "/animales", label: t('ui.navbar.animals') },
    { to: "/visita", label: t('ui.navbar.visit') },
    { to: "/mapa", label: t('ui.navbar.map') },
    { to: "/contacto", label: t('ui.navbar.contact') },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md text-gray-900 border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              Z
            </div>
            <div>
              <div className="font-semibold text-lg tracking-tight">ZooMAT</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Chiapas</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition ${
                  isActive(link.to)
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="ml-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
              aria-label={t('ui.navbar.languageLabel')}
              title={currentLang === 'es' ? 'Español' : 'English'}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{currentLang === 'es' ? 'ES' : 'EN'}</span>
            </button>
          </div>

          {/* Quick Info Desktop */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>9:00 - 17:00</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-gray-100">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-2 py-3 transition text-sm ${
                  isActive(link.to)
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 px-2">
              <button
                onClick={() => { toggleLanguage(); setIsOpen(false); }}
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                aria-label="Cambiar idioma"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{currentLang === 'es' ? 'ES' : 'EN'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
