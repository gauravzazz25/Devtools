import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (error) {
      setOutput('Error: Invalid input');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">URL Encoder/Decoder</h2>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="encode"
            checked={mode === 'encode'}
            onChange={() => setMode('encode')}
          />
          Encode
        </label>
        <label>
          <input
            type="radio"
            value="decode"
            checked={mode === 'decode'}
            onChange={() => setMode('decode')}
          />
          Decode
        </label>
      </div>
      <div className="flex flex-grow space-x-4">
        <div className="flex-1 flex flex-col">
          <textarea
            className="flex-grow p-2 bg-gray-800 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter URL to encode' : 'Enter URL to decode'}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleConvert}
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-grow relative">
            <pre className="h-full p-2 bg-gray-800 rounded overflow-auto">
              {output}
            </pre>
            {output && (
              <button
                className="absolute top-2 right-2 p-2 bg-gray-700 rounded hover:bg-gray-600"
                onClick={copyToClipboard}
              >
                <Copy size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlEncoder;