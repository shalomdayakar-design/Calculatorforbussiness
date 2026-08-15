import React, { useState } from 'react';
import { Globe, Sun, Moon, Download, History, Calculator, Laptop, Smartphone, HelpCircle, X } from 'lucide-react';
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
  const [showInstallGuideModal, setShowInstallGuideModal] = useState(false);

  const handleInstallClick = () => {
    if (pwaInstallPrompt) {
      onInstallPwa();
    } else {
      setShowInstallGuideModal(true);
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
            {/* Always Visible Install Desktop App Button */}
            <button
              onClick={handleInstallClick}
              className="skeuo-btn skeuo-btn-success text-xs py-1.5 px-3 gap-1.5 animate-pulse font-bold"
              title="డెస్క్‌టాప్/మొబైల్‌లో యాప్ ఇన్‌స్టాల్ చేయండి"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">యాప్ ఇన్‌స్టాల్ చేయండి (Install App)</span>
              <span className="sm:hidden">Install</span>
            </button>

            {/* Quick Keypad Button */}
            <button
              onClick={onOpenQuickKeypad}
              title={t.quickKeypad}
              className="skeuo-btn skeuo-btn-amber text-xs py-1.5 px-2.5 sm:px-3 gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden md:inline">{t.quickKeypad}</span>
            </button>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              title={t.history}
              className="skeuo-btn skeuo-btn-neutral text-xs py-1.5 px-2 sm:px-2.5"
            >
              <History className="w-4 h-4 text-sky-400" />
            </button>

            {/* Telugu Language Badge */}
            <div className="hidden lg:flex items-center bg-emerald-950/80 border border-emerald-800 rounded-lg px-2.5 py-1 text-xs font-bold text-emerald-300">
              <Globe className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span>తెలుగు</span>
            </div>

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

      {/* Standalone Desktop & Mobile App Install Guide Modal */}
      {showInstallGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="skeuo-calculator-casing w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-slate-100 font-mono">
                  యాప్ ఇన్‌స్టాల్ గైడ్ (Install App)
                </h3>
              </div>
              <button onClick={() => setShowInstallGuideModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-400 font-mono text-sm">
                  <Laptop className="w-4 h-4" />
                  <span>1. Windows Desktop / PC లో ఇన్‌స్టాల్ చేయడం:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Chrome లేదా Edge బ్రౌజర్ అడ్రస్ బార్ (URL bar) కుడి చివరన ఉన్న <strong>Install App</strong> ఐకాన్ (కంప్యూటర్ & డౌన్ యారో) పై క్లిక్ చేయండి. లేదా బ్రౌజర్ కుడి మూలన ఉన్న <strong>⋮ (మూడు చుక్కలు) → Save and share → Install App</strong> నొక్కండి.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-400 font-mono text-sm">
                  <Smartphone className="w-4 h-4" />
                  <span>2. Android / Mobile లో ఇన్‌స్టాల్ చేయడం:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  మొబైల్ బ్రౌజర్‌లో కుడి మూలన ఉన్న <strong>⋮ (మూడు చుక్కలు)</strong> నొక్కి, <strong>"Add to Home Screen"</strong> లేదా <strong>"Install App"</strong> పై క్లిక్ చేయండి.
                </p>
              </div>

              <div className="bg-emerald-950/80 border border-emerald-800 p-3 rounded-xl text-emerald-300 font-mono text-[11px]">
                ✔ ఇన్‌స్టాల్ అయిన తర్వాత మీ డెస్క్‌టాప్‌పై స్వంత ఐకాన్‌తో ఆఫ్‌లైన్‌లో నేరుగా పనిచేస్తుంది!
              </div>
            </div>

            <button
              onClick={() => setShowInstallGuideModal(false)}
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
