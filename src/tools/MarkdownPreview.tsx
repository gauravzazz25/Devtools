import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownPreview: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(markdown);
  }, [markdown]);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Markdown Preview</h2>
      <div className="flex flex-grow space-x-4">
        <div className="flex-1 flex flex-col">
          <textarea
            className="flex-grow p-2 bg-gray-800 rounded"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter Markdown here"
          />
        </div>
        <div className="flex-1 bg-white text-black p-4 rounded overflow-auto">
          <ReactMarkdown>{html}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreview;