import React, { useState } from 'react';
import { Globe, Sun, Moon, Download, History, Calculator, Laptop, Smartphone, CheckCircle, X, ExternalLink } from 'lucide-react';
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

  const handleOpenPwaBuilderApk = () => {
    window.open('https://www.pwabuilder.com', '_blank');
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
            {/* Install APK / App Button */}
            <button
              onClick={handleInstallClick}
              className="skeuo-btn skeuo-btn-success text-xs py-1.5 px-3 gap-1.5 animate-pulse font-bold"
              title="Android APK / డెస్క్‌టాప్ యాప్‌ను ఇన్‌స్టాల్ చేయండి"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">APK / యాప్ ఇన్‌స్టాల్ చేయండి (Install APK)</span>
              <span className="sm:hidden">APK</span>
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

      {/* Standalone Android APK & Offline App Install Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="skeuo-calculator-casing w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-slate-100 font-mono">
                  Android APK & ఆఫ్‌లైన్ యాప్ ఇన్‌స్టాల్ (Install APK)
                </h3>
              </div>
              <button onClick={() => setShowInstallModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              మీ Android మొబైల్ లేదా Windows PC లలో యాప్‌ను ఇన్‌స్టాల్ చేయడానికి మార్గాలు:
            </p>

            <div className="space-y-3 text-xs">
              {/* Option A: Android APK Installation */}
              <div className="bg-slate-900/90 border border-emerald-500/50 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400 font-mono text-sm">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <span>1. Android APK గా ఇన్‌స్టాల్ చేయడం (WebAPK):</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  మొబైల్ Chrome బ్రౌజర్‌లో <strong>⋮ (మూడు చుక్కలు) → "Add to Home screen" / "Install app"</strong> క్లిక్ చేయండి. Chrome ఆటోమేటిక్‌గా ఒక నిమిషంలో <strong>Android APK</strong> ని క్రియేట్ చేసి ఫోన్‌లో ఇన్‌స్టాల్ చేస్తుంది!
                </p>
                <div className="pt-1">
                  <button
                    onClick={handleOpenPwaBuilderApk}
                    className="skeuo-btn skeuo-btn-amber w-full py-2 text-xs font-mono font-bold gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>PWABuilder ద్వారా సైన్డ్ APK క్రియేట్ చేయండి (PWABuilder APK Generator)</span>
                  </button>
                </div>
              </div>

              {/* Option B: Windows PC Desktop App */}
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-sky-400 font-mono text-sm">
                  <Laptop className="w-4 h-4" />
                  <span>2. PC / Laptop ఆఫ్‌లైన్ జిప్ ప్యాకేజ్ (ZIP):</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  ఆఫ్‌లైన్‌లో వాడటానికి జిప్ ప్యాకేజ్‌ను ఉచితంగా డౌన్‌లోడ్ చేయండి.
                </p>
                <button
                  onClick={handleDirectDownloadZip}
                  className="skeuo-btn skeuo-btn-success w-full py-2 text-xs font-mono font-bold gap-2 mt-1"
                >
                  <Download className="w-4 h-4" />
                  <span>ఆఫ్‌లైన్ ZIP ప్యాకేజ్ డౌన్‌లోడ్ చేయండి</span>
                </button>
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
