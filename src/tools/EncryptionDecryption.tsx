import React, { useState } from 'react';
import { Copy } from 'lucide-react';

// Note: This is a simplified implementation for demonstration purposes.
// For production use, consider using a well-tested encryption library.

const EncryptionDecryption: React.FC = () => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [algorithm, setAlgorithm] = useState<'aes' | 'des' | 'triple-des'>('aes');

  const encrypt = (text: string, key: string): string => {
    // This is a placeholder implementation
    return btoa(text + key);
  };

  const decrypt = (text: string, key: string): string => {
    // This is a placeholder implementation
    const decoded = atob(text);
    return decoded.slice(0, -key.length);
  };

  const handleOperation = () => {
    try {
      if (mode === 'encrypt') {
        setOutput(encrypt(input, key));
      } else {
        setOutput(decrypt(input, key));
      }
    } catch (error) {
      setOutput('Error: Invalid input or key');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Encryption/Decryption</h2>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="encrypt"
            checked={mode === 'encrypt'}
            onChange={() => setMode('encrypt')}
          />
          Encrypt
        </label>
        <label>
          <input
            type="radio"
            value="decrypt"
            checked={mode === 'decrypt'}
            onChange={() => setMode('decrypt')}
          />
          Decrypt
        </label>
      </div>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="aes"
            checked={algorithm === 'aes'}
            onChange={() => setAlgorithm('aes')}
          />
          AES
        </label>
        <label className="mr-4">
          <input
            type="radio"
            value="des"
            checked={algorithm === 'des'}
            onChange={() => setAlgorithm('des')}
          />
          DES
        </label>
        <label>
          <input
            type="radio"
            value="triple-des"
            checked={algorithm === 'triple-des'}
            onChange={() => setAlgorithm('triple-des')}
          />
          Triple DES
        </label>
      </div>
      <div className="flex flex-grow space-x-4">
        <div className="flex-1 flex flex-col">
          <textarea
            className="flex-grow p-2 bg-gray-800 rounded mb-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encrypt' ? 'Enter text to encrypt' : 'Enter text to decrypt'}
          />
          <input
            type="text"
            className="p-2 bg-gray-800 rounded mb-2"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter encryption key"
          />
          <button
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleOperation}
          >
            {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
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

export default EncryptionDecryption;