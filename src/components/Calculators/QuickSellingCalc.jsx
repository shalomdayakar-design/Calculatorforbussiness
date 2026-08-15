import React, { useState } from 'react';
import { Zap, Save } from 'lucide-react';
import { calcQuickSellingPrice } from '../../utils/calculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function QuickSellingCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean empty initial state
  const [purchaseTotal, setPurchaseTotal] = useState('');
  const [qtyKg, setQtyKg] = useState('');
  const [targetProfitTotal, setTargetProfitTotal] = useState('');

  const result = calcQuickSellingPrice(purchaseTotal, qtyKg, targetProfitTotal);

  const handleSave = () => {
    saveToHistory({
      type: t.navQuickSelling,
      productName: 'ఫాస్ట్ అమ్మకం',
      details: `${qtyKg || 0} kg bought for ${currencySymbol}${purchaseTotal || 0}`,
      sellingPricePerKg: formatCurrency(result.sellingPricePerKg, currencySymbol)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold shadow-md">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navQuickSelling}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navQuickSellingSub}
          </p>
        </div>
      </div>

      <ResultCard
        title={t.sellAtThisPrice}
        primaryLabel={t.sellAtThisPrice}
        primaryValue={`${formatCurrency(result.sellingPricePerKg, currencySymbol)} / kg`}
        badgeText="FAST RATE"
        badgeColor="amber"
        items={[
          { label: t.pricePerGram, value: formatCurrency(result.pricePerGram, currencySymbol, 4), highlight: 'blue' },
          { label: t.price100g, value: formatCurrency(result.price100g, currencySymbol), highlight: 'green' },
          { label: t.price250g, value: formatCurrency(result.price250g, currencySymbol), highlight: 'green' },
          { label: t.price500g, value: formatCurrency(result.price500g, currencySymbol), highlight: 'green' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={`${t.sellAtThisPrice}: ${formatCurrency(result.sellingPricePerKg, currencySymbol)}/kg`}
        lang={lang}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.iBoughtForLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={purchaseTotal}
              onChange={(e) => setPurchaseTotal(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full text-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              కొనుగోలు చేసిన బరువు (కిలోలు)
            </label>
            <input
              type="number"
              value={qtyKg}
              onChange={(e) => setQtyKg(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full text-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.iWantProfitLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={targetProfitTotal}
              onChange={(e) => setTargetProfitTotal(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full text-lg font-bold"
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
