import React, { useState } from 'react';
import { DollarSign, Save } from 'lucide-react';
import { calcBreakEvenPrice } from '../../utils/calculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function BreakEvenCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean empty initial state
  const [purchaseCostUnit, setPurchaseCostUnit] = useState('');
  const [fixedExpenses, setFixedExpenses] = useState('');
  const [variableCostUnit, setVariableCostUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [desiredProfit, setDesiredProfit] = useState('');

  const result = calcBreakEvenPrice({
    purchaseCostUnit,
    fixedExpenses,
    variableCostUnit,
    quantity,
    desiredProfit
  });

  const handleSave = () => {
    saveToHistory({
      type: t.navBreakEven,
      productName: 'నో-లాస్ ప్రైస్',
      noLossPrice: formatCurrency(result.noLossSellingPricePerUnit, currencySymbol),
      targetPrice: formatCurrency(result.targetSellingPricePerUnit, currencySymbol)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navBreakEven}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navBreakEvenSub}
          </p>
        </div>
      </div>

      <ResultCard
        title={t.minimumSellingPriceNoLoss}
        primaryLabel={t.minimumSellingPriceNoLoss}
        primaryValue={`${formatCurrency(result.noLossSellingPricePerUnit, currencySymbol)} / unit`}
        badgeText={`${formatCurrency(result.targetSellingPricePerUnit, currencySymbol)} TARGET`}
        badgeColor="amber"
        items={[
          { label: t.totalBusinessCost, value: formatCurrency(result.totalCosts, currencySymbol), highlight: 'amber' },
          { label: t.fixedExpenses, value: formatCurrency(result.fixedExpenses, currencySymbol), highlight: 'slate' },
          { label: t.variableCostPerUnit, value: formatCurrency(result.variableCostUnit, currencySymbol), highlight: 'blue' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={`${t.minimumSellingPriceNoLoss}: ${formatCurrency(result.noLossSellingPricePerUnit, currencySymbol)}`}
        lang={lang}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.purchaseCostPerUnitLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={purchaseCostUnit}
              onChange={(e) => setPurchaseCostUnit(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.fixedExpensesLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={fixedExpenses}
              onChange={(e) => setFixedExpenses(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.variableExpensesLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={variableCostUnit}
              onChange={(e) => setVariableCostUnit(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.quantityUnitsLabel}
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.desiredTotalProfitLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={desiredProfit}
              onChange={(e) => setDesiredProfit(e.target.value)}
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
