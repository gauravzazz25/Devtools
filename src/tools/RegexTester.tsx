import React, { useState } from 'react';

const RegexTester: React.FC = () => {
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState('');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    setError('');
    setMatches([]);

    try {
      const re = new RegExp(regex, flags);
      const result = testString.match(re);

      if (result) {
        setMatches(result);
      } else {
        setMatches([]);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Regex Tester</h2>
      <div className="flex flex-col space-y-4 mb-4">
        <div>
          <label className="block mb-2">Regular Expression:</label>
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="Enter regex pattern"
          />
        </div>
        <div>
          <label className="block mb-2">Flags:</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="g, i, m, s, u, y"
          />
        </div>
        <div>
          <label className="block mb-2">Test String:</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="Enter text to test against the regex"
            rows={5}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={testRegex}
        >
          Test Regex
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex-grow overflow-auto">
        <h3 className="text-xl font-bold mb-2">Matches:</h3>
        {matches.length > 0 ? (
          <ul className="list-disc list-inside">
            {matches.map((match, index) => (
              <li key={index} className="mb-1">
                {match}
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default RegexTester;