import { useRef } from 'react';
import QRCode from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRGeneratorProps {
  value: string;
  animalName: string;
}

export function QRGenerator({ value, animalName }: QRGeneratorProps) {
  const qrRef = useRef<HTMLDivElement | null>(null);

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector('svg') as SVGSVGElement | null;
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
        link.download = `qr-${animalName.replace(/\s+/g, '-')}.png`;
        link.click();
      }
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={qrRef}
        className="p-4 bg-white border-2 border-gray-200 rounded-lg"
      >
        <QRCode
          value={value}
          size={200}
          level="H"
          includeMargin={true}
          fgColor="#000000"
          bgColor="#ffffff"
        />
      </div>
      <button
        onClick={downloadQRCode}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        <Download className="w-4 h-4" />
        Descargar QR
      </button>
    </div>
  );
}
