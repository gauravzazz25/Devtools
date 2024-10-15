import React, { useState } from 'react';

const JsonValidator: React.FC = () => {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const validateJson = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError('');
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">JSON Validator</h2>
      <textarea
        className="flex-grow p-2 bg-gray-800 rounded mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here"
      />
      <button
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        onClick={validateJson}
      >
        Validate JSON
      </button>
      {isValid !== null && (
        <div className="mt-4">
          <p className={isValid ? 'text-green-500' : 'text-red-500'}>
            {isValid ? 'Valid JSON' : 'Invalid JSON'}
          </p>
          {!isValid && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default JsonValidator;