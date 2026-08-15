import React, { useState } from 'react';
import { Banknote, Save, RotateCcw } from 'lucide-react';
import { calcCustomerWeight } from '../../utils/calculations';
import { formatCurrency, formatWeightSmart } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function QuickCustomerCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean empty initial state
  const [sellingPricePerKg, setSellingPricePerKg] = useState('');
  const [customerAmount, setCustomerAmount] = useState('');

  const result = calcCustomerWeight(sellingPricePerKg, customerAmount);
  const smartWeightDisplay = formatWeightSmart(result.weightInKg);

  const presetAmounts = [5, 10, 20, 50, 100, 200];

  const handleSave = () => {
    saveToHistory({
      type: t.navCustomerCalc,
      productName: 'కస్టమర్ అమ్మకం',
      details: `${currencySymbol}${customerAmount || 0} @ ${currencySymbol}${sellingPricePerKg || 0}/kg`,
      giveCustomer: smartWeightDisplay,
      sellingPrice: customerAmount || 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold shadow-md">
          <Banknote className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navCustomerCalc}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navCustomerCalcSub}
          </p>
        </div>
      </div>

      {/* Result Display Card */}
      <ResultCard
        title={t.exactWeightToGive}
        primaryLabel={t.giveCustomer}
        primaryValue={smartWeightDisplay}
        badgeText={`${formatCurrency(customerAmount || 0, currencySymbol)} WORTH`}
        badgeColor="amber"
        items={[
          { label: t.sellingRate, value: `${formatCurrency(sellingPricePerKg || 0, currencySymbol)} / kg`, highlight: 'blue' },
          { label: t.exactGrams, value: `${result.weightInGrams.toFixed(1)} g`, highlight: 'green' },
          { label: t.exactKg, value: `${result.weightInKg.toFixed(3)} kg`, highlight: 'amber' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={`${t.giveCustomer}: ${smartWeightDisplay}`}
        lang={lang}
      />

      {/* Inputs Casing */}
      <div className="skeuo-calculator-casing p-5 space-y-5">
        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
            {t.sellingPricePerKgLabel} ({currencySymbol})
          </label>
          <input
            type="number"
            value={sellingPricePerKg}
            onChange={(e) => setSellingPricePerKg(e.target.value)}
            placeholder="0"
            className="skeuo-input w-full text-xl"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
            {t.quickAmountButtonsLabel}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setCustomerAmount(amt)}
                className={`skeuo-btn text-base font-extrabold py-3 ${
                  Number(customerAmount) === amt ? 'skeuo-btn-amber ring-2 ring-amber-400' : 'skeuo-btn-neutral'
                }`}
              >
                {currencySymbol}{amt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
            {t.customAmountLabel} ({currencySymbol})
          </label>
          <input
            type="number"
            value={customerAmount}
            onChange={(e) => setCustomerAmount(e.target.value)}
            placeholder="0"
            className="skeuo-input w-full text-xl"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="skeuo-btn skeuo-btn-success flex-1 gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{t.saveToHistory}</span>
          </button>
          <button
            type="button"
            onClick={() => { setSellingPricePerKg(''); setCustomerAmount(''); }}
            className="skeuo-btn skeuo-btn-neutral gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
