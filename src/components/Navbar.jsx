import React, { useState } from 'react';
import { Globe, Sun, Moon, Download, History, Calculator, Smartphone, Settings, X } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function Navbar({
  lang = 'te',
  setLang,
  theme,
  setTheme,
  onOpenQuickKeypad,
  onOpenHistory,
  onOpenSettings,
  pwaInstallPrompt,
  onInstallPwa,
  activeNav,
  setActiveNav
}) {
  const t = translations[lang] || translations.te;
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleInstallClick = () => {
    if (pwaInstallPrompt) {
      onInstallPwa();
    } else {
      setShowInstallModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2">
          {/* Brand Logo & Title */}
          <div
            onClick={() => setActiveNav('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="Small Business Master Calculator Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-lg border border-amber-400/40 group-hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="font-extrabold text-sm sm:text-lg leading-tight tracking-tight text-slate-100 flex items-center gap-1.5 font-mono">
                <span>{t.appTitle}</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">
                  తెలుగు
                </span>
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Install App Button */}
            <button
              onClick={handleInstallClick}
              className="skeuo-btn skeuo-btn-success text-xs py-1.5 px-3 gap-1.5 animate-pulse font-bold"
              title="యాప్ ఇన్‌స్టాల్ చేయండి"
            >
              <Smartphone className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">యాప్ ఇన్‌స్టాల్ చేయండి (Install App)</span>
              <span className="sm:hidden">Install App</span>
            </button>

            {/* Prominent Settings Button (⚙️ సెట్టింగ్‌లు) */}
            <button
              onClick={onOpenSettings}
              title={t.settings}
              className="skeuo-btn skeuo-btn-amber text-xs py-1.5 px-2.5 sm:px-3 gap-1.5 font-bold"
            >
              <Settings className="w-4 h-4 text-slate-900" />
              <span className="hidden md:inline">{t.settings}</span>
            </button>

            {/* Quick Keypad Button */}
            <button
              onClick={onOpenQuickKeypad}
              title={t.quickKeypad}
              className="skeuo-btn skeuo-btn-neutral text-xs py-1.5 px-2 sm:px-2.5"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
            </button>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              title={t.history}
              className="skeuo-btn skeuo-btn-neutral text-xs py-1.5 px-2 sm:px-2.5"
            >
              <History className="w-4 h-4 text-sky-400" />
            </button>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="skeuo-btn skeuo-btn-neutral text-xs p-1.5 sm:p-2"
              title={t.theme}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Clean Install App Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="skeuo-calculator-casing w-full max-w-md p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-slate-100 font-mono">
                  యాప్ ఇన్‌స్టాల్ (Install App)
                </h3>
              </div>
              <button onClick={() => setShowInstallModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-3 text-xs text-slate-200">
              <p className="font-bold text-emerald-400 text-sm font-mono">
                ఇన్‌స్టాల్ చేసే విధానం:
              </p>
              <ul className="space-y-2 list-disc list-inside font-mono leading-relaxed text-slate-300">
                <li>బ్రౌజర్ కుడి వైపు మూలన ఉన్న <strong>⋮ (మూడు చుక్కలు)</strong> నొక్కండి.</li>
                <li><strong className="text-emerald-400">"Add to Home Screen"</strong> లేదా <strong className="text-emerald-400">"Install App"</strong> నొక్కండి.</li>
              </ul>
            </div>

            <button
              onClick={() => setShowInstallModal(false)}
              className="skeuo-btn skeuo-btn-success w-full py-2.5 text-xs font-mono font-bold"
            >
              సరే (Got It)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
