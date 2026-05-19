import { Link } from "react-router";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Acerca del ZooMAT */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                Z
              </div>
              <h3 className="font-semibold text-gray-900 tracking-tight">ZooMAT</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dedicado a la conservación de la fauna silvestre de Chiapas desde 1942.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-6">Explorar</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/animales" className="text-gray-500 hover:text-gray-900 transition">
                  Nuestros Animales
                </Link>
              </li>
              <li>
                <Link to="/visita" className="text-gray-500 hover:text-gray-900 transition">
                  Planear Visita
                </Link>
              </li>
              <li>
                <Link to="/mapa" className="text-gray-500 hover:text-gray-900 transition">
                  Mapa
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-500 hover:text-gray-900 transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Calzada Cerro Hueco S/N<br />Tuxtla Gutiérrez, Chiapas</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+529615438890<br />(961) 614 4700</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>zoomat@chiapas.gob.mx</span>
              </li>
            </ul>
          </div>

          {/* Horarios y Redes */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider mb-6">Horarios</h3>
            <div className="flex items-start gap-3 text-gray-500 text-sm mb-8">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>Martes a Domingo</p>
                <p className="font-medium text-gray-900 mt-0.5">9:00 - 17:00</p>
                <p className="text-xs text-gray-400 mt-1">Cerrado los lunes</p>
              </div>
            </div>
            <div>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/ZoomatOficial/reviews?locale=es_LA" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/zoomatoficial_?fbclid=IwY2xjawR4qa5leHRuA2FlbQIxMABicmlkETFoVnhMNTdUeVlKR3ZCZGlKc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHjiesW6aWZfQScRZX2LXPnxLPup4_tZUkdHgv55Wd8H-2eSSyJRFw6vMC6SG_aem_1QU4iBPnadGvkI6AOaB8cg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} ZooMAT. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacidad" className="hover:text-gray-900 transition">Privacidad</Link>
            <Link to="/terminos" className="hover:text-gray-900 transition">Términos</Link>
            <Link to="/admin" className="hover:text-gray-900 transition">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
