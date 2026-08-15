import React, { useState } from 'react';
import { Settings, X, Save, Maximize2, Minimize2 } from 'lucide-react';
import { saveSettings } from '../utils/storage';

export default function SettingsView({
  isOpen,
  onClose,
  settings,
  setSettings
}) {
  const [currency, setCurrency] = useState(settings.currency || '₹');
  const [decimals, setDecimals] = useState(settings.decimals || 2);
  const [compactMode, setCompactMode] = useState(settings.compactMode || false);
  const [centToSqFt, setCentToSqFt] = useState(settings.customLandFactors?.centToSqFt || 435.6);
  const [gunthaToSqFt, setGunthaToSqFt] = useState(settings.customLandFactors?.gunthaToSqFt || 1089);

  if (!isOpen) return null;

  const handleSave = () => {
    const newConfig = {
      ...settings,
      currency,
      language: 'te',
      decimals: Number(decimals),
      compactMode,
      customLandFactors: {
        centToSqFt: Number(centToSqFt),
        gunthaToSqFt: Number(gunthaToSqFt),
        acreToSqFt: 43560
      }
    };
    setSettings(newConfig);
    saveSettings(newConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="skeuo-calculator-casing w-full max-w-lg p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base text-slate-100 font-mono">
              యాప్ సెట్టింగ్‌లు (Settings)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Compact View Mode Toggle for All Devices */}
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-slate-100 flex items-center gap-1.5">
                {compactMode ? <Minimize2 className="w-4 h-4 text-emerald-400" /> : <Maximize2 className="w-4 h-4 text-amber-400" />}
                <span>కాంపాక్ట్ వ్యూ (Compact Mode for All Devices)</span>
              </div>
              <p className="text-[10px] text-slate-400">
                మొబైల్, టాబ్లెట్ & డెస్క్‌టాప్ అన్నిటిలో స్క్రీన్ స్పేస్ ఆదా చేసేలా లేఅవుట్ మార్చుతుంది.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCompactMode(!compactMode)}
              className={`w-12 h-6 rounded-full transition-colors p-1 border ${
                compactMode ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  compactMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              కరెన్సీ గుర్తు (Currency Symbol)
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              <option value="₹">₹ (రూపాయలు - INR)</option>
              <option value="$">$ (డాలర్లు - USD)</option>
              <option value="€">€ (యూరోలు - EUR)</option>
              <option value="£">£ (పౌండ్లు - GBP)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              దశాంశ స్థానాల సంఖ్య (Decimals)
            </label>
            <select
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              <option value="2">2 స్థానాలు (ఉదా. ₹15.50)</option>
              <option value="3">3 స్థానాలు (ఉదా. 0.250 kg)</option>
              <option value="4">4 స్థానాలు (హై ప్రిసిషన్)</option>
            </select>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase mb-2">
              ప్రాంతీయ పొలం కొలతల గుణకాలు (Customizable)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                  1 సెంట్ = చదరపు అడుగులు
                </label>
                <input
                  type="number"
                  value={centToSqFt}
                  onChange={(e) => setCentToSqFt(e.target.value)}
                  className="skeuo-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                  1 గుంట = చదరపు అడుగులు
                </label>
                <input
                  type="number"
                  value={gunthaToSqFt}
                  onChange={(e) => setGunthaToSqFt(e.target.value)}
                  className="skeuo-input w-full text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSave} className="skeuo-btn skeuo-btn-success w-full gap-2 py-2.5 mt-2">
          <Save className="w-4 h-4" />
          <span>సెట్టింగ్‌లు సేవ్ చేయండి</span>
        </button>
      </div>
    </div>
  );
}
