import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import BuyingSellingCalc from './components/Calculators/BuyingSellingCalc';
import QuickCustomerCalc from './components/Calculators/QuickCustomerCalc';
import ReverseWeightCalc from './components/Calculators/ReverseWeightCalc';
import ProfitLossCalc from './components/Calculators/ProfitLossCalc';
import WastageCalc from './components/Calculators/WastageCalc';
import LoanInterestCalc from './components/Calculators/LoanInterestCalc';
import LandCalc from './components/Calculators/LandCalc';
import LiquidCalc from './components/Calculators/LiquidCalc';
import MeasurementCalc from './components/Calculators/MeasurementCalc';
import QuickSellingCalc from './components/Calculators/QuickSellingCalc';
import MultiProductCalc from './components/Calculators/MultiProductCalc';
import DailyBusinessCalc from './components/Calculators/DailyBusinessCalc';
import BreakEvenCalc from './components/Calculators/BreakEvenCalc';
import InvoiceGenerator from './components/Calculators/InvoiceGenerator';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import QuickKeypadModal from './components/QuickKeypadModal';
import ExamplesBar from './components/ExamplesBar';
import { getSettings, saveSettings } from './utils/storage';
import { translations } from './i18n/translations';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [settings, setSettings] = useState(getSettings());
  const [lang, setLang] = useState(settings.language || 'te');
  const [theme, setTheme] = useState(settings.theme || 'dark');
  const [activeNav, setActiveNav] = useState('dashboard');

  // Modals state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQuickKeypadOpen, setIsQuickKeypadOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);

  // PWA install prompt handler
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setPwaInstallPrompt(e);
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration failed:', err);
      });
    }
  }, []);

  // Update language and persist immediately
  const handleSetLang = (newLang) => {
    setLang(newLang);
    const updated = { ...settings, language: newLang };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleInstallPwa = () => {
    if (pwaInstallPrompt) {
      pwaInstallPrompt.prompt();
      pwaInstallPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          setPwaInstallPrompt(null);
        }
      });
    }
  };

  const handleSelectExample = (example) => {
    setActiveNav(example.targetNav);
  };

  const currencySymbol = settings.currency || '₹';
  const t = translations[lang] || translations.te;

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'theme-light text-slate-900' : 'text-slate-100'}`}>
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={handleSetLang}
        theme={theme}
        setTheme={(newTheme) => {
          setTheme(newTheme);
          const updated = { ...settings, theme: newTheme };
          setSettings(updated);
          saveSettings(updated);
        }}
        onOpenQuickKeypad={() => setIsQuickKeypadOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        pwaInstallPrompt={pwaInstallPrompt}
        onInstallPwa={handleInstallPwa}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content Area */}
      <main className="pb-12">
        {/* Back to Dashboard Button when inside a calculator */}
        {activeNav !== 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 pt-4">
            <button
              onClick={() => setActiveNav('dashboard')}
              className="skeuo-btn skeuo-btn-neutral text-xs py-2 px-3 gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>{t.backToDashboard}</span>
            </button>
          </div>
        )}

        {/* View Switcher */}
        {activeNav === 'dashboard' && (
          <Dashboard
            lang={lang}
            setActiveNav={setActiveNav}
            onOpenExamples={() => setIsExamplesOpen(true)}
          />
        )}
        {activeNav === 'buyingSelling' && <BuyingSellingCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'customerCalc' && <QuickCustomerCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'reverseWeight' && <ReverseWeightCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'profitLoss' && <ProfitLossCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'wastage' && <WastageCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'loanInterest' && <LoanInterestCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'land' && <LandCalc lang={lang} customLandFactors={settings.customLandFactors} />}
        {activeNav === 'liquid' && <LiquidCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'converter' && <MeasurementCalc lang={lang} />}
        {activeNav === 'quickSelling' && <QuickSellingCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'multiProduct' && <MultiProductCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'dailyBusiness' && <DailyBusinessCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'breakEven' && <BreakEvenCalc lang={lang} currencySymbol={currencySymbol} />}
        {activeNav === 'invoice' && <InvoiceGenerator lang={lang} currencySymbol={currencySymbol} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs font-mono text-slate-400 bg-slate-950/60">
        <p>Small Business Master Calculator • Offline PWA Ready • Tailored for Local Traders & Shopkeepers</p>
      </footer>

      {/* Global Modals */}
      <HistoryView
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        currencySymbol={currencySymbol}
        lang={lang}
      />
      <SettingsView
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={(newSt) => {
          setSettings(newSt);
          saveSettings(newSt);
          if (newSt.language) setLang(newSt.language);
        }}
        lang={lang}
      />
      <QuickKeypadModal
        isOpen={isQuickKeypadOpen}
        onClose={() => setIsQuickKeypadOpen(false)}
        currencySymbol={currencySymbol}
        lang={lang}
      />
      <ExamplesBar
        isOpen={isExamplesOpen}
        onClose={() => setIsExamplesOpen(false)}
        onSelectExample={handleSelectExample}
        currencySymbol={currencySymbol}
        lang={lang}
      />
    </div>
  );
}
