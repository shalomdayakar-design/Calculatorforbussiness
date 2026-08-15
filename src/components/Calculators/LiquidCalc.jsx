import React, { useState } from 'react';
import { Droplet, Save } from 'lucide-react';
import { calcLiquidPrice } from '../../utils/calculations';
import { formatCurrency, formatVolumeSmart } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function LiquidCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean empty initial state
  const [pricePerLitre, setPricePerLitre] = useState('');
  const [customerAmount, setCustomerAmount] = useState('');
  const [giveMlInput, setGiveMlInput] = useState('');

  const result = calcLiquidPrice(pricePerLitre, customerAmount, giveMlInput);

  const handleSave = () => {
    saveToHistory({
      type: t.navLiquid,
      productName: 'ద్రవం అమ్మకం',
      details: `${currencySymbol}${customerAmount || 0} @ ${currencySymbol}${pricePerLitre || 0}/Litre`,
      volumeToGive: formatVolumeSmart(result.volumeToGiveLitres)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-bold shadow-md">
          <Droplet className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navLiquid}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navLiquidSub}
          </p>
        </div>
      </div>

      <ResultCard
        title={t.giveVolume}
        primaryLabel={t.giveVolume}
        primaryValue={formatVolumeSmart(result.volumeToGiveLitres)}
        badgeText={`${formatCurrency(customerAmount || 0, currencySymbol)} WORTH`}
        badgeColor="blue"
        items={[
          { label: t.ratePerLitre, value: `${formatCurrency(pricePerLitre || 0, currencySymbol)} / L`, highlight: 'blue' },
          { label: t.volumeInMl, value: `${result.volumeToGiveMl.toFixed(0)} ml`, highlight: 'green' },
          { label: 'రవర్స్: ' + (giveMlInput || 0) + ' ML కి ధర', value: formatCurrency(result.costForMl, currencySymbol), highlight: 'amber' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={`${t.giveVolume}: ${formatVolumeSmart(result.volumeToGiveLitres)}`}
        lang={lang}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.pricePerLitreLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={pricePerLitre}
              onChange={(e) => setPricePerLitre(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.customerAmountLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={customerAmount}
              onChange={(e) => setCustomerAmount(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.reverseMlLabel}
            </label>
            <input
              type="number"
              value={giveMlInput}
              onChange={(e) => setGiveMlInput(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={handleSave} className="skeuo-btn skeuo-btn-success flex-1 gap-2">
            <Save className="w-4 h-4" />
            <span>{t.saveResult}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
