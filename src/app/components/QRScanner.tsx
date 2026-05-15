import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, X, AlertCircle } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (qrCode: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const { t } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    try {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          onScan(decodedText);
          scanner.clear().catch(() => {});
        },
        (error) => {
          // Ignore scanning errors (no QR detected)
        }
      );

      scannerRef.current = scanner;
      setIsInitialized(true);
    } catch (err) {
      setError(t('qr.error'));
      console.error('Scanner initialization error:', err);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [onScan, t]);

  const handleClose = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">{t('qr.title')}</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          {error ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <p className="text-center text-gray-600">{error}</p>
              <button
                onClick={handleClose}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                {t('common.back')}
              </button>
            </div>
          ) : (
            <>
              {isInitialized && (
                <div id="qr-reader" style={{ width: '100%' }} />
              )}
              <p className="text-center text-sm text-gray-500 mt-4">
                {t('qr.subtitle')}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
