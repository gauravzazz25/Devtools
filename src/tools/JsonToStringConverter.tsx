import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const JsonToStringConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'jsonToString' | 'stringToJson'>('jsonToString');

  const convert = () => {
    try {
      if (mode === 'jsonToString') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed));
      } else {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      }
      setError('');
    } catch (err) {
      setError('Invalid input');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">JSON to String Converter</h2>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="jsonToString"
            checked={mode === 'jsonToString'}
            onChange={() => setMode('jsonToString')}
          />
          JSON to String
        </label>
        <label>
          <input
            type="radio"
            value="stringToJson"
            checked={mode === 'stringToJson'}
            onChange={() => setMode('stringToJson')}
          />
          String to JSON
        </label>
      </div>
      <div className="flex flex-grow space-x-4">
        <div className="flex-1 flex flex-col">
          <textarea
            className="flex-grow p-2 bg-gray-800 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'jsonToString' ? 'Paste your JSON here' : 'Paste your JSON string here'}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            onClick={convert}
          >
            Convert
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
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default JsonToStringConverter;