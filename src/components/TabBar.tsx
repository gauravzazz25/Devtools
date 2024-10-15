import React from 'react';
import { Tool, TabInstance } from '../types';
import { X } from 'lucide-react';

interface TabBarProps {
  tools: Tool[];
  tabInstances: TabInstance[];
  activeTabId: string | null;
  setActiveTabId: (id: string) => void;
  closeTab: (id: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tools,
  tabInstances,
  activeTabId,
  setActiveTabId,
  closeTab,
}) => {
  return (
    <div className="flex bg-gray-700 overflow-x-auto">
      {tabInstances.map((tab) => {
        const tool = tools.find((t) => t.id === tab.toolId);
        if (!tool) return null;
        return (
          <div
            key={tab.id}
            className={`flex items-center px-4 py-2 cursor-pointer ${
              activeTabId === tab.id ? 'bg-gray-600' : 'hover:bg-gray-600'
            }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <span>{tool.name}</span>
            <button
              className="ml-2 p-1 rounded-full hover:bg-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;