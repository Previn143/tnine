import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Palette,
  CheckCircle2,
  ArrowRight,
  Terminal,
  FileText,
  Boxes,
  Zap,
  Globe,
  Settings,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface TemplateCard {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  suggestedPrompt: string;
}

const STARTER_IDEAS: TemplateCard[] = [
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics & Operations Hub',
    category: 'Productivity',
    description: 'Real-time metrics, interactive charts, user management table, financial summaries, and activity feeds.',
    icon: <Layers className="w-5 h-5 text-indigo-400" />,
    tags: ['Charts', 'KPIs', 'Filterable Tables', 'Export'],
    suggestedPrompt: 'Build a comprehensive SaaS analytics dashboard with interactive charts, revenue metrics, customer table with filters, and activity logs.'
  },
  {
    id: 'ai-workspace',
    title: 'AI Studio & Workspace Assistant',
    category: 'AI & Tools',
    description: 'Multi-modal workspace with prompt engineering, document analysis, generation history, and custom agents.',
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    tags: ['Gemini 2.5/3.0', 'Streaming', 'Chat', 'Markdown'],
    suggestedPrompt: 'Create an AI-powered assistant workspace with streaming responses, code highlighting, prompt library, and chat history.'
  },
  {
    id: 'kanban-workflow',
    title: 'Agile Project & Task Board',
    category: 'Management',
    description: 'Interactive drag-and-drop boards, status pipelines, priority tags, sprint milestones, and detail drawers.',
    icon: <Boxes className="w-5 h-5 text-emerald-400" />,
    tags: ['Drag & Drop', 'Tags', 'Checklists', 'Timeline'],
    suggestedPrompt: 'Build a full-featured Kanban project management app with customizable boards, column drag-and-drop, task modal, and filters.'
  },
  {
    id: 'creative-canvas',
    title: 'Interactive Visual & Canvas Tool',
    category: 'Creative',
    description: 'Node-based flow builder, whiteboard drawing, shapes, sticky notes, and export to SVG/PNG.',
    icon: <Palette className="w-5 h-5 text-pink-400" />,
    tags: ['Canvas', 'Nodes', 'Whiteboard', 'Export'],
    suggestedPrompt: 'Create a creative whiteboard and node canvas where users can draw, connect ideas, add sticky notes, and export visuals.'
  },
  {
    id: 'data-explorer',
    title: 'Scientific & Data Visualizer',
    category: 'Data Science',
    description: 'CSV/JSON file inspector, statistical distributions, correlation matrices, dynamic filtering, and exportable charts.',
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    tags: ['Data Tables', 'Stats', 'CSV Parser', 'Visualizations'],
    suggestedPrompt: 'Build a fast data visualizer where I can import CSV/JSON data, view summaries, calculate distributions, and configure charts.'
  },
  {
    id: 'dev-playground',
    title: 'Developer Tool & API Sandbox',
    category: 'Developer',
    description: 'REST/GraphQL client tester, JSON schema validator, regex tester, and code snippet manager.',
    icon: <Terminal className="w-5 h-5 text-violet-400" />,
    tags: ['API Sandbox', 'JSON Formatter', 'Code Mirror', 'Snippets'],
    suggestedPrompt: 'Build a developer workbench with an API request builder, JSON viewer/formatter, and regex tester with live preview.'
  }
];

export default function App() {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'scratchpad' | 'specs'>('overview');
  const [scratchpadText, setScratchpadText] = useState<string>(() => {
    return localStorage.getItem('nexus_scratchpad') || 
      '# My Project Ideas\n- What would you like to build today?\n- Type notes or requirements here; they persist locally!';
  });

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2200);
  };

  const handleScratchpadChange = (val: string) => {
    setScratchpadText(val);
    localStorage.setItem('nexus_scratchpad', val);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-tight">Nexus Studio</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">Google AI Studio Development Environment</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              Templates & Ideas
            </button>
            <button
              onClick={() => setActiveTab('scratchpad')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'scratchpad'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Notes & Planner
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'specs'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Stack Info
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-900/40 p-8 sm:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
                  <Zap className="w-3.5 h-3.5" /> Live and connected
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Hello! What would you like to build?
                </h1>
                <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
                  Your project is set up with React 19, Vite, Tailwind CSS v4, Lucide icons, and Motion.
                  Tell me what app, tool, or interface you have in mind, or pick an inspiration blueprint below to get started immediately.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> React 19 + TypeScript
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tailwind CSS v4 Engine
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Server-side Express & GenAI Ready
                  </div>
                </div>
              </div>
            </div>

            {/* Inspiration Grid */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Starter Blueprints & Concepts</h2>
                  <p className="text-sm text-slate-400">Click any prompt to copy it, or simply describe your own custom idea in chat.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {STARTER_IDEAS.map((idea) => {
                  const isCopied = copiedPromptId === idea.id;
                  return (
                    <div
                      key={idea.id}
                      className="group relative rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                            {idea.icon}
                          </div>
                          <span className="text-xs font-medium text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700/50">
                            {idea.category}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {idea.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-300/90 leading-relaxed">
                          {idea.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {idea.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-750"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleCopyPrompt(idea.id, idea.suggestedPrompt)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Prompt Guide */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">How to guide the build</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    Feel free to reply with details like: &quot;Build a CRM for freelance designers with invoice generation&quot; or &quot;Create an audio visualizer with custom sound effects&quot;. I&apos;ll implement it directly!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('scratchpad')}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors shrink-0"
              >
                Open Scratchpad <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'scratchpad' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Interactive Planner & Scratchpad</h2>
                <p className="text-xs text-slate-400">Draft your requirements, feature lists, or design notes here. Auto-saved in your browser.</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(scratchpadText);
                  alert('Copied scratchpad text to clipboard!');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium hover:bg-indigo-600/30 transition-all"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Notes
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <textarea
                value={scratchpadText}
                onChange={(e) => handleScratchpadChange(e.target.value)}
                rows={16}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 resize-y leading-relaxed"
                placeholder="Type your requirements, desired screens, color schemes, or user stories here..."
              />
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Project Environment & Capabilities</h2>
              <p className="text-xs text-slate-400">Overview of the pre-configured dependencies, tooling, and backend proxy abilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-semibold text-white text-sm">Frontend Framework</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Runtime</span>
                    <span className="font-mono text-slate-200">React 19 + TypeScript</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Bundler</span>
                    <span className="font-mono text-slate-200">Vite 8</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Styling Engine</span>
                    <span className="font-mono text-slate-200">Tailwind CSS v4</span>
                  </li>
                  <li className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Animations & Icons</span>
                    <span className="font-mono text-slate-200">Motion 12 + Lucide React</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white text-sm">Integrations & Backend</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Full-Stack Server</span>
                    <span className="font-mono text-slate-200">Express + Node.js (tsx)</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">AI Integration</span>
                    <span className="font-mono text-slate-200">@google/genai SDK</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Database Options</span>
                    <span className="font-mono text-slate-200">Cloud SQL (Postgres) / Firestore</span>
                  </li>
                  <li className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Authentication</span>
                    <span className="font-mono text-slate-200">Firebase Auth / OAuth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>Nexus Studio Workspace — Ready to build</div>
          <div>Share your goal or prompt to transform this canvas</div>
        </div>
      </footer>
    </div>
  );
}
