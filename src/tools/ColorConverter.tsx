import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    updateColors(hex);
  }, [hex]);

  const updateColors = (hexValue: string) => {
    const rgbValue = hexToRgb(hexValue);
    if (rgbValue) {
      setRgb(rgbValue);
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
    }
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Color Converter</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label className="block mb-2">HEX:</label>
          <div className="flex items-center">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="mr-2"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="flex-grow p-2 bg-gray-800 rounded"
            />
            <button
              className="ml-2 p-2 bg-gray-700 rounded hover:bg-gray-600"
              onClick={() => copyToClipboard(hex)}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-2">RGB:</label>
          <div className="flex items-center">
            <input
              type="text"
              value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
              readOnly
              className="flex-grow p-2 bg-gray-800 rounded"
            />
            <button
              className="ml-2 p-2 bg-gray-700 rounded hover:bg-gray-600"
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-2">HSL:</label>
          <div className="flex items-center">
            <input
              type="text"
              value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
              readOnly
              className="flex-grow p-2 bg-gray-800 rounded"
            />
            <button
              className="ml-2 p-2 bg-gray-700 rounded hover:bg-gray-600"
              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex-grow">
        <div
          className="w-full h-full rounded"
          style={{ backgroundColor: hex }}
        ></div>
      </div>
    </div>
  );
};

export default ColorConverter;