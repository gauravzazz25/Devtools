import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

const TextCompare: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    const newDiff: JSX.Element[] = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        newDiff.push(<div key={i} className="bg-gray-700">{line1}</div>);
      } else {
        newDiff.push(
          <div key={i} className="flex">
            <div className="flex-1 bg-red-900">{line1}</div>
            <div className="flex-1 bg-green-900">{line2}</div>
          </div>
        );
      }
    }

    setDiff(newDiff);
  }, [text1, text2]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Text Compare</h2>
      <div className="flex flex-grow space-x-4">
        <div className="flex-1 flex flex-col">
          <textarea
            className="flex-grow p-2 bg-gray-800 rounded"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter first text"
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => copyToClipboard(text1)}
          >
            <Copy size={16} className="inline mr-2" /> Copy
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <textarea
            className="flex-grow p-2 bg-gray-800 rounded"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter second text"
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => copyToClipboard(text2)}
          >
            <Copy size={16} className="inline mr-2" /> Copy
          </button>
        </div>
      </div>
      <div className="mt-4 flex-grow overflow-auto">
        <h3 className="text-xl font-bold mb-2">Differences:</h3>
        <div className="bg-gray-800 p-2 rounded">{diff}</div>
      </div>
    </div>
  );
};

export default TextCompare;