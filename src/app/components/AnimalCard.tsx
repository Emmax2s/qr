import { X, Volume2, Leaf, Weight, Heart, Play, Square, Languages, QrCode } from 'lucide-react';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import { Download } from 'lucide-react';

interface AnimalCardProps {
  id?: string;
  name: string;
  scientificName: string;
  image: string;
  habitat: string;
  diet: string;
  status: string;
  funFact: string;
  statusColor: string;
  description?: string;
  lifespan?: string;
  activity?: string;
  size?: string;
  weight?: string;
  distribution?: string;
  conservation?: string;
  threats?: string[];
  importance?: string;
  funFacts?: string[];
}

export function AnimalCard({
  id,
  name,
  scientificName,
  image,
  habitat,
  diet,
  status,
  funFact,
  statusColor,
  description,
  lifespan,
  activity,
  size,
  weight,
  distribution,
  conservation,
  threats,
  importance,
  funFacts,
}: AnimalCardProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const currentLanguage = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('es') ? 'es' : 'en';

  const toggleLanguage = () => {
    const nextLanguage = currentLanguage === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  };

  const getNarrationText = () => {
    const aboutText = description || funFact || t('ui.animalPanel.aboutFallback');
    const distributionText = distribution || habitat;
    const importanceText = importance || t('ui.animalPanel.importanceFallback');
    const conservationText = conservation || status;
    const threatsText = threats && threats.length > 0 ? threats.join(', ') : t('ui.animalPanel.notSpecified');
    const factsText = funFacts && funFacts.length > 0 ? funFacts.join(', ') : funFact;

    return [
      `${name}. ${scientificName}.`,
      `${t('ui.animalPanel.aboutSpecies')}: ${aboutText}.`,
      `${t('ui.animalPanel.distribution')}: ${distributionText}.`,
      `${t('ui.animalPanel.naturalHabitat')}: ${habitat}.`,
      `${t('ui.animalPanel.activity')}: ${activity || t('ui.animalPanel.notSpecified')}.`,
      `${t('ui.animalPanel.feeding')}: ${diet}.`,
      `${t('ui.animalPanel.size')}: ${size || t('ui.animalPanel.notSpecified')}.`,
      `${t('ui.animalPanel.weight')}: ${weight || t('ui.animalPanel.notSpecified')}.`,
      `${t('ui.animalPanel.lifespan')}: ${lifespan || t('ui.animalPanel.notSpecified')}.`,
      `${t('ui.animalPanel.conservationStatus')}: ${conservationText}.`,
      `${t('ui.animalPanel.importance')}: ${importanceText}.`,
      `${t('ui.animalPanel.threats')}: ${threatsText}.`,
      `${t('ui.animalPanel.funFacts')}: ${factsText}.`
    ].join(' ');
  };

  const selectFemaleVoice = (lang: 'es' | 'en') => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
      return null;
    }

    const preferredLangs = lang === 'es' ? ['es-MX', 'es-ES', 'es'] : ['en-US', 'en-GB', 'en'];
    const femaleHints = lang === 'es'
      ? ['female', 'woman', 'mujer', 'sabina', 'helena', 'sofia', 'paulina', 'maria', 'lucia']
      : ['female', 'woman', 'zira', 'aria', 'samantha', 'karen', 'joanna', 'jenny'];

    const byLanguage = voices.filter((voice) =>
      preferredLangs.some((preferred) => voice.lang.toLowerCase().startsWith(preferred.toLowerCase()))
    );

    const femaleVoice = byLanguage.find((voice) => {
      const voiceName = voice.name.toLowerCase();
      return femaleHints.some((hint) => voiceName.includes(hint));
    });

    return femaleVoice || byLanguage[0] || voices[0];
  };

  const handleAudio = () => {
    if (isPlaying) {
      // Detener audio
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Iniciar audio
      const utterance = new SpeechSynthesisUtterance(getNarrationText());
      utterance.lang = currentLanguage === 'es' ? 'es-ES' : 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;

      const selectedVoice = selectFemaleVoice(currentLanguage);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
      };

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector('svg');
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
        link.download = `qr-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.click();
      }
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-start md:justify-center md:p-4 overflow-y-auto">
        <div className="bg-white rounded-t-2xl md:rounded-lg max-w-full md:max-w-5xl w-full md:my-8 shadow-xl md:max-h-[90vh] overflow-y-auto">
          {/* Header con título - Responsive */}
          <div className="bg-gray-900 text-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-start gap-4 sticky top-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold truncate">{name}</h1>
              <p className="text-gray-400 italic text-xs md:text-sm mt-1">{scientificName}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`px-3 py-1 rounded-full text-xs md:text-sm font-bold whitespace-nowrap ${statusColor}`}>
                {conservation || status}
              </div>
              <button
                onClick={toggleLanguage}
                className="bg-white/10 hover:bg-white/20 px-2 md:px-3 py-1 rounded text-xs md:text-sm font-semibold text-white transition"
              >
                <Languages size={14} className="md:hidden" />
                <span className="hidden md:inline">{currentLanguage === 'es' ? 'EN' : 'ES'}</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.speechSynthesis.cancel();
                  setIsPlaying(false);
                }}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-white transition"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Imagen - Responsive */}
          <div className="w-full h-48 md:h-64 lg:h-80 overflow-hidden bg-gray-100">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido principal - Responsive Grid */}
          <div className="p-4 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {/* Columna izquierda - Features */}
              <div className="space-y-4 md:space-y-6">
                {/* Audio */}
                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Volume2 size={18} className="text-gray-700 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-sm uppercase">
                      {t('ui.animalPanel.audioTitle')}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    {t('ui.animalPanel.noAudioMessage')}
                  </p>
                  <button 
                    onClick={handleAudio}
                    className={`flex items-center justify-center gap-2 w-full px-3 py-2 rounded text-xs md:text-sm font-semibold transition ${
                      isPlaying 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-gray-800 text-white hover:bg-gray-900'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square size={14} />
                        <span className="hidden md:inline">{t('ui.animalPanel.stopNarration')}</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        <span className="hidden md:inline">{t('ui.animalPanel.listenNarration')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* QR Code */}
                {id && (
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <QrCode size={18} className="text-gray-700 flex-shrink-0" />
                      <h3 className="font-bold text-gray-900 text-sm uppercase">
                        Código QR
                      </h3>
                    </div>
                    <div ref={qrRef} className="flex justify-center mb-3 p-2 bg-gray-50 rounded">
                      <QRCode
                        value={`${window.location.origin}${window.location.pathname}?animal=${id}`}
                        size={120}
                        level="H"
                        includeMargin={true}
                        fgColor="#000000"
                        bgColor="#ffffff"
                      />
                    </div>
                    <button
                      onClick={downloadQRCode}
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded text-xs md:text-sm font-semibold transition"
                    >
                      <Download size={14} />
                      <span className="hidden md:inline">Descargar QR</span>
                    </button>
                  </div>
                )}

                {/* Características */}
                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <h3 className="font-bold mb-3 text-center text-gray-900 text-sm uppercase">
                    {t('ui.animalPanel.features')}
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    <div className="bg-yellow-100 text-gray-900 p-2 md:p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-xs font-bold uppercase">{t('ui.animalPanel.activity')}</p>
                      <p className="text-xs md:text-sm text-gray-800 mt-1">
                        {activity || t('ui.animalPanel.notSpecified')}
                      </p>
                    </div>
                    <div className="bg-yellow-100 text-gray-900 p-2 md:p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-xs font-bold uppercase flex items-center gap-1">
                        <Leaf size={12} /> {t('ui.animalPanel.feeding')}
                      </p>
                      <p className="text-xs md:text-sm text-gray-800 mt-1">{diet}</p>
                    </div>
                    <div className="bg-yellow-100 text-gray-900 p-2 md:p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-xs font-bold uppercase">{t('ui.animalPanel.size')}</p>
                      <p className="text-xs md:text-sm text-gray-800 mt-1">
                        {size || t('ui.animalPanel.notSpecified')}
                      </p>
                    </div>
                    <div className="bg-yellow-100 text-gray-900 p-2 md:p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-xs font-bold uppercase flex items-center gap-1">
                        <Weight size={12} /> {t('ui.animalPanel.weight')}
                      </p>
                      <p className="text-xs md:text-sm text-gray-800 mt-1">
                        {weight || t('ui.animalPanel.notSpecified')}
                      </p>
                    </div>
                    <div className="bg-yellow-100 text-gray-900 p-2 md:p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-xs font-bold uppercase flex items-center gap-1">
                        <Heart size={12} /> {t('ui.animalPanel.lifespan')}
                      </p>
                      <p className="text-xs md:text-sm text-gray-800 mt-1">
                        {lifespan || t('ui.animalPanel.notSpecified')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Información detallada */}
              <div className="md:col-span-2 space-y-3 md:space-y-4">
                {/* Sobre esta especie */}
                <div className="border-l-4 border-green-500 bg-green-50 p-3 md:p-4 rounded-r-lg">
                  <h3 className="text-xs md:text-sm font-bold text-green-700 uppercase mb-2">
                    📋 {t('ui.animalPanel.aboutSpecies')}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {description || funFact || t('ui.animalPanel.aboutFallback')}
                  </p>
                </div>

                {/* Distribución */}
                <div className="border-l-4 border-green-500 bg-green-50 p-3 md:p-4 rounded-r-lg">
                  <h3 className="text-xs md:text-sm font-bold text-green-700 uppercase mb-2">
                    📍 {t('ui.animalPanel.distribution')}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700 mb-2">{distribution || habitat}</p>
                  <div className="bg-green-100 p-2 rounded text-xs text-gray-700">
                    <p>🌿 <span className="font-semibold">{t('ui.animalPanel.naturalHabitat')}:</span> {habitat}</p>
                  </div>
                </div>

                {/* Importancia */}
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 md:p-4 rounded-r-lg">
                  <h3 className="text-xs md:text-sm font-bold text-yellow-700 uppercase mb-2">
                    ⭐ {t('ui.animalPanel.importance')}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700">
                    {importance || t('ui.animalPanel.importanceFallback')}
                  </p>
                </div>

                {/* Amenazas */}
                {threats && threats.length > 0 && (
                  <div className="border-l-4 border-red-400 bg-red-50 p-3 md:p-4 rounded-r-lg">
                    <h3 className="text-xs md:text-sm font-bold text-red-700 uppercase mb-2">
                      ⚠️ {t('ui.animalPanel.threats')}
                    </h3>
                    <div className="space-y-1">
                      {threats.map((threat, idx) => (
                        <p key={idx} className="text-xs md:text-sm text-gray-700">
                          🔺 {threat}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Datos curiosos */}
                {funFacts && funFacts.length > 0 && (
                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 md:p-4 rounded-r-lg">
                    <h3 className="text-xs md:text-sm font-bold text-yellow-700 uppercase mb-2">
                      💡 {t('ui.animalPanel.funFacts')}
                    </h3>
                    <ul className="space-y-1">
                      {funFacts.map((fact, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-gray-700">
                          ✨ {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de tarjeta (cuando no está expandida)
  return (
    <div
      onClick={() => setIsOpen(true)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden cursor-pointer group h-full flex flex-col"
    >
      {/* Imagen - Responsive */}
      <div className="relative h-40 md:h-48 lg:h-56 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Contenido - Responsive */}
      <div className="p-3 md:p-4 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">{name}</h3>
        <p className="text-xs text-gray-500 italic mb-2 md:mb-3">{scientificName}</p>

        {/* Estado */}
        <div className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2 md:mb-3 w-fit ${statusColor}`}>
          {status}
        </div>

        {/* Info rápida */}
        <div className="space-y-1 md:space-y-2 text-xs text-gray-600 mb-3 md:mb-4 flex-1">
          <p className="truncate">
            <span className="font-semibold">{t('ui.animalCard.habitatLabel')}:</span>
            <span className="hidden md:inline"> {habitat}</span>
          </p>
          <p className="truncate">
            <span className="font-semibold">{t('ui.animalCard.dietLabel')}:</span>
            <span className="hidden md:inline"> {diet}</span>
          </p>
        </div>

        {/* Curiosidades */}
        <p className="text-xs text-gray-700 line-clamp-2 mb-3 md:mb-4">
          <span className="font-semibold">💡 </span>
          {funFact}
        </p>

        {/* Botón */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 md:py-2.5 rounded font-semibold text-xs md:text-sm transition-colors h-10 md:h-11">
          {t('ui.animalCard.viewMore')}
        </button>
      </div>
    </div>
  );
}
