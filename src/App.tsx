import React, { useState, useEffect, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import TabBar from './components/TabBar';
import { Tool, TabInstance } from './types';

const JsonFormatter = lazy(() => import('./tools/JsonFormatter'));
const JsonValidator = lazy(() => import('./tools/JsonValidator'));
const JsonToStringConverter = lazy(() => import('./tools/JsonToStringConverter'));
const Base64Converter = lazy(() => import('./tools/Base64Converter'));
const FileConverter = lazy(() => import('./tools/FileConverter'));
const EncryptionDecryption = lazy(() => import('./tools/EncryptionDecryption'));
const TextCompare = lazy(() => import('./tools/TextCompare'));
const UrlEncoder = lazy(() => import('./tools/UrlEncoder'));
const ColorConverter = lazy(() => import('./tools/ColorConverter'));
const RegexTester = lazy(() => import('./tools/RegexTester'));
const MarkdownPreview = lazy(() => import('./tools/MarkdownPreview'));

const tools: Tool[] = [
  { id: 'json-formatter', name: 'JSON Formatter', component: JsonFormatter },
  { id: 'json-validator', name: 'JSON Validator', component: JsonValidator },
  { id: 'json-to-string', name: 'JSON to String', component: JsonToStringConverter },
  { id: 'base64-converter', name: 'Base64 Converter', component: Base64Converter },
  { id: 'file-converter', name: 'File Converter', component: FileConverter },
  { id: 'encryption-decryption', name: 'Encryption/Decryption', component: EncryptionDecryption },
  { id: 'text-compare', name: 'Text Compare', component: TextCompare },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', component: UrlEncoder },
  { id: 'color-converter', name: 'Color Converter', component: ColorConverter },
  { id: 'regex-tester', name: 'Regex Tester', component: RegexTester },
  { id: 'markdown-preview', name: 'Markdown Preview', component: MarkdownPreview },
];

const App: React.FC = () => {
  const [tabInstances, setTabInstances] = useState<TabInstance[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  useEffect(() => {
    // Load saved tab instances from localStorage
    const savedTabInstances = localStorage.getItem('tabInstances');
    if (savedTabInstances) {
      setTabInstances(JSON.parse(savedTabInstances));
    }
  }, []);

  useEffect(() => {
    // Save tab instances to localStorage
    localStorage.setItem('tabInstances', JSON.stringify(tabInstances));
  }, [tabInstances]);

  const openTab = (toolId: string) => {
    const newTabId = `${toolId}-${Date.now()}`;
    const newTab: TabInstance = { id: newTabId, toolId };
    setTabInstances([...tabInstances, newTab]);
    setActiveTabId(newTabId);
  };

  const closeTab = (tabId: string) => {
    const updatedTabs = tabInstances.filter((tab) => tab.id !== tabId);
    setTabInstances(updatedTabs);
    if (activeTabId === tabId) {
      setActiveTabId(updatedTabs.length > 0 ? updatedTabs[updatedTabs.length - 1].id : null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar tools={tools} openTab={openTab} />
      <div className="flex-1 flex flex-col">
        <TabBar
          tools={tools}
          tabInstances={tabInstances}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          closeTab={closeTab}
        />
        <div className="flex-1 p-4 overflow-auto">
          {activeTabId && (
            <Suspense fallback={<div>Loading...</div>}>
              {(() => {
                const activeTab = tabInstances.find((tab) => tab.id === activeTabId);
                if (activeTab) {
                  const tool = tools.find((t) => t.id === activeTab.toolId);
                  if (tool) {
                    const ToolComponent = tool.component;
                    return <ToolComponent />;
                  }
                }
                return null;
              })()}
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;