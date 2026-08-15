import React, { useState } from 'react';
import { Globe, Sun, Moon, Download, History, Calculator, Laptop, Smartphone, CheckCircle, X } from 'lucide-react';
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

  const handleDirectDownloadZip = () => {
    const link = document.createElement('a');
    link.href = '/Small-Business-Master-Calculator-Offline.zip';
    link.download = 'Small-Business-Master-Calculator-Offline.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            {/* Install / Download App Button */}
            <button
              onClick={handleInstallClick}
              className="skeuo-btn skeuo-btn-success text-xs py-1.5 px-3 gap-1.5 animate-pulse font-bold"
              title="ఆఫ్‌లైన్ యాప్ డౌన్‌లోడ్ / డెస్క్‌టాప్‌పై ఇన్‌స్టాల్ చేయండి"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">ఆఫ్‌లైన్ యాప్ డౌన్‌లోడ్ / Install App</span>
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

      {/* Standalone Offline App Download & Install Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="skeuo-calculator-casing w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-slate-100 font-mono">
                  ఆఫ్‌లైన్ యాప్ డౌన్‌లోడ్ & ఇన్‌స్టాల్ (Offline App)
                </h3>
              </div>
              <button onClick={() => setShowInstallModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              ఈ అప్లికేషన్‌ను మీరు మీ కంప్యూటర్ లేదా మొబైల్‌లో పూర్తిగా ఆఫ్‌లైన్‌లో వాడుకోవచ్చు:
            </p>

            <div className="space-y-3 text-xs">
              {/* Option A: Direct Zip Package Download */}
              <div className="bg-slate-900/90 border border-emerald-500/50 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400 font-mono text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>1. ఆఫ్‌లైన్ జిప్ ఫైల్ డౌన్‌లోడ్ చేయండి:</span>
                </div>
                <p className="text-slate-300">
                  ఈ ఫైల్‌ను డౌన్‌లోడ్ చేసి అన్‌జిప్ చేయండి. ఇంటర్నెట్ లేదా ఏమీ అవసరం లేకుండా ఎప్పుడైనా ఉచితంగా వాడుకోవచ్చు.
                </p>
                <button
                  onClick={handleDirectDownloadZip}
                  className="skeuo-btn skeuo-btn-success w-full py-2.5 text-xs font-mono font-bold gap-2 mt-1"
                >
                  <Download className="w-4 h-4" />
                  <span>ఆఫ్‌లైన్ జిప్ ప్యాకేజ్ డౌన్‌లోడ్ చేయండి (Download ZIP)</span>
                </button>
              </div>

              {/* Option B: PWA Desktop App */}
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-400 font-mono text-sm">
                  <Laptop className="w-4 h-4" />
                  <span>2. Windows Desktop ఐకాన్‌గా ఇన్‌స్టాల్ చేయడం:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Chrome లేదా Edge బ్రౌజర్ అడ్రస్ బార్ (URL bar) కుడి చివరన ఉన్న <strong>Install App</strong> (కంప్యూటర్ ఐకాన్) క్లిక్ చేసి డెస్క్‌టాప్ షార్ట్‌కట్‌గా అమర్చుకోండి.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowInstallModal(false)}
              className="skeuo-btn skeuo-btn-neutral w-full py-2 text-xs font-mono font-bold"
            >
              మూసివేయి (Close)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
