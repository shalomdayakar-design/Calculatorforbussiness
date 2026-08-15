import React, { useState } from 'react';
import { Trash2, Save } from 'lucide-react';
import { calcWastage } from '../../utils/calculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function WastageCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean initial state
  const [purchasedQtyKg, setPurchasedQtyKg] = useState('');
  const [purchasePriceTotal, setPurchasePriceTotal] = useState('');
  const [wastagePercent, setWastagePercent] = useState('');
  const [desiredTotalProfit, setDesiredTotalProfit] = useState('');

  const result = calcWastage({
    purchasedQtyKg,
    purchasePriceTotal,
    wastagePercent,
    desiredTotalProfit
  });

  const handleSave = () => {
    saveToHistory({
      type: t.navWastage,
      productName: 'కూరగాయల వీధులు/నష్టం',
      details: `${purchasedQtyKg || 0} kg with ${wastagePercent || 0}% wastage`,
      realCostPerKg: formatCurrency(result.realCostPerKg, currencySymbol),
      sellingPricePerKg: formatCurrency(result.requiredSellingPricePerKg, currencySymbol)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold shadow-md">
          <Trash2 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navWastage}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navWastageSub}
          </p>
        </div>
      </div>

      <ResultCard
        title={t.realCostPerKg}
        primaryLabel={t.realCostPerKg}
        primaryValue={`${formatCurrency(result.realCostPerKg, currencySymbol)} / kg`}
        badgeText={`${formatCurrency(result.requiredSellingPricePerKg, currencySymbol)} TARGET`}
        badgeColor="red"
        items={[
          { label: t.sellableQty, value: `${result.sellableQty.toFixed(1)} kg`, highlight: 'green' },
          { label: t.wastedQty, value: `${result.wastageQty.toFixed(1)} kg (${wastagePercent || 0}%)`, highlight: 'red' },
          { label: t.originalCostPerKg, value: `${formatCurrency(result.originalCostPerKg, currencySymbol)} / kg`, highlight: 'slate' },
          { label: t.targetSellRate, value: `${formatCurrency(result.requiredSellingPricePerKg, currencySymbol)} / kg`, highlight: 'blue' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={`${t.realCostPerKg}: ${formatCurrency(result.realCostPerKg, currencySymbol)}/kg`}
        lang={lang}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.purchasedQtyLabel}
            </label>
            <input
              type="number"
              value={purchasedQtyKg}
              onChange={(e) => setPurchasedQtyKg(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.totalPurchasePriceLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={purchasePriceTotal}
              onChange={(e) => setPurchasePriceTotal(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.estimatedWastageLabel}
            </label>
            <input
              type="number"
              value={wastagePercent}
              onChange={(e) => setWastagePercent(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
            <div className="flex gap-1.5 mt-2">
              {[5, 10, 15, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setWastagePercent(pct)}
                  className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 font-mono font-bold"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.desiredTotalProfitLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={desiredTotalProfit}
              onChange={(e) => setDesiredTotalProfit(e.target.value)}
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
