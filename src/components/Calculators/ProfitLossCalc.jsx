import React, { useState } from 'react';
import { Percent, Save } from 'lucide-react';
import { calcProfitLossModes } from '../../utils/calculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function ProfitLossCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;
  const [mode, setMode] = useState('modeA');

  // Clean empty initial state
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [desiredPercent, setDesiredPercent] = useState('');
  const [desiredTotalProfit, setDesiredTotalProfit] = useState('');
  const [quantity, setQuantity] = useState('');

  const result = calcProfitLossModes({
    mode,
    costPrice,
    sellingPrice,
    desiredPercent,
    desiredTotalProfit,
    quantity
  });

  const isLossMode = mode === 'loss';

  const handleSave = () => {
    saveToHistory({
      type: isLossMode ? 'నష్టం లెక్కింపు' : `లాభం లెక్కింపు (${mode.toUpperCase()})`,
      productName: 'మార్జిన్ విశ్లేషణ',
      costPrice: result.costPrice,
      sellingPrice: result.sellingPrice,
      profit: isLossMode ? -result.totalLoss : result.totalProfit,
      marginPct: isLossMode ? -result.lossPct : result.marginPct
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-md">
          <Percent className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navProfitLoss}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navProfitLossSub}
          </p>
        </div>
      </div>

      {/* Mode Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {[
          { id: 'modeA', label: 'Mode A: లాభం/నగ' },
          { id: 'modeB', label: 'Mode B: లాభం %' },
          { id: 'modeC', label: 'Mode C: టార్గెట్ లాభం' },
          { id: 'modeD', label: 'Mode D: మార్జిన్ %' },
          { id: 'loss', label: 'నష్టం మోడ్ (Loss)' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`skeuo-btn text-xs py-2 px-2.5 font-bold ${
              mode === m.id
                ? m.id === 'loss' ? 'skeuo-btn-danger' : 'skeuo-btn-primary'
                : 'skeuo-btn-neutral'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Result Display */}
      {isLossMode ? (
        <ResultCard
          title={t.netLoss}
          primaryLabel={t.netLoss}
          primaryValue={formatCurrency(result.totalLoss, currencySymbol)}
          badgeText={`${formatNumber(result.lossPct, 1)}% LOSS`}
          badgeColor="red"
          items={[
            { label: t.totalPurchaseCost, value: formatCurrency(result.costPrice, currencySymbol), highlight: 'amber' },
            { label: t.sellingPricePerContainer, value: formatCurrency(result.sellingPrice, currencySymbol), highlight: 'slate' },
            { label: t.lossPerUnit, value: formatCurrency(result.unitLoss, currencySymbol), highlight: 'red' },
          ]}
          currencySymbol={currencySymbol}
          onCopyText={`${t.netLoss}: ${formatCurrency(result.totalLoss, currencySymbol)}`}
          lang={lang}
        />
      ) : (
        <ResultCard
          title={t.summaryTitle}
          primaryLabel={t.expectedProfit}
          primaryValue={formatCurrency(result.totalProfit, currencySymbol)}
          badgeText={`${formatNumber(result.marginPct, 1)}% MARGIN`}
          badgeColor="green"
          items={[
            { label: t.sellingPricePerContainer, value: formatCurrency(result.sellingPrice, currencySymbol), highlight: 'green' },
            { label: t.totalPurchaseCost, value: formatCurrency(result.costPrice, currencySymbol), highlight: 'amber' },
            { label: t.markupPct, value: `${formatNumber(result.markupPct, 1)}%`, highlight: 'blue' },
            { label: t.grossMarginPct, value: `${formatNumber(result.marginPct, 1)}%`, highlight: 'green' },
            { label: t.totalRevenue, value: formatCurrency(result.totalSales, currencySymbol), highlight: 'blue' },
          ]}
          currencySymbol={currencySymbol}
          onCopyText={`${t.expectedProfit}: ${formatCurrency(result.totalProfit, currencySymbol)}`}
          lang={lang}
        />
      )}

      {/* Input Casing */}
      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.purchaseCostPriceLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          {(mode === 'modeA' || mode === 'modeD' || mode === 'loss') && (
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                అమ్మకం ధర ({currencySymbol})
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="0"
                className="skeuo-input w-full"
              />
            </div>
          )}

          {mode === 'modeB' && (
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                {t.desiredProfitPercentLabel}
              </label>
              <input
                type="number"
                value={desiredPercent}
                onChange={(e) => setDesiredPercent(e.target.value)}
                placeholder="0"
                className="skeuo-input w-full"
              />
            </div>
          )}

          {mode === 'modeC' && (
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
          )}

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
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={handleSave} className="skeuo-btn skeuo-btn-success flex-1 gap-2">
            <Save className="w-4 h-4" />
            <span>{t.saveToHistory}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
