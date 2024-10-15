import React from 'react';
import { Tool } from '../types';
import { Wrench } from 'lucide-react';

interface SidebarProps {
  tools: Tool[];
  openTab: (toolId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tools, openTab }) => {
  return (
    <aside className="w-64 bg-gray-800 p-4">
      <div className="flex items-center mb-6">
        <Wrench className="w-6 h-6 mr-2" />
        <h1 className="text-xl font-bold">DevToolbox</h1>
      </div>
      <nav>
        <ul>
          {tools.map((tool) => (
            <li key={tool.id} className="mb-2">
              <button
                onClick={() => openTab(tool.id)}
                className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                {tool.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;