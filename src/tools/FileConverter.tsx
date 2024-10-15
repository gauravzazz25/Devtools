import React, { useState, useRef } from 'react';
import { Copy, Download } from 'lucide-react';

const FileConverter: React.FC = () => {
  const [base64, setBase64] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setBase64(result.split(',')[1]);
          setError('');
        }
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBase64Input = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBase64(e.target.value);
  };

  const convertToFile = () => {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName || 'file';
      link.click();
    } catch (error) {
      setError('Error converting to file');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">File Converter</h2>
      <div className="flex flex-grow space-x-4">
        <div className="flex-1 flex flex-col">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 mb-4"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload File
          </button>
          <textarea
            className="flex-grow p-2 bg-gray-800 rounded"
            value={base64}
            onChange={handleBase64Input}
            placeholder="Or paste Base64 here"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-grow relative">
            <pre className="h-full p-2 bg-gray-800 rounded overflow-auto">
              {base64 ? base64.substring(0, 100) + '...' : ''}
            </pre>
            {base64 && (
              <>
                <button
                  className="absolute top-2 right-2 p-2 bg-gray-700 rounded hover:bg-gray-600"
                  onClick={copyToClipboard}
                >
                  <Copy size={16} />
                </button>
                <button
                  className="absolute top-2 right-12 p-2 bg-gray-700 rounded hover:bg-gray-600"
                  onClick={convertToFile}
                >
                  <Download size={16} />
                </button>
              </>
            )}
          </div>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FileConverter;