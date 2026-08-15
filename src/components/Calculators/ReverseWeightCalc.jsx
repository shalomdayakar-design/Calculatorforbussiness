import React, { useState } from 'react';
import { Scale, Save } from 'lucide-react';
import { calcReverseWeight, calcQuantityPricing } from '../../utils/calculations';
import { formatCurrency, formatWeightSmart } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function ReverseWeightCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;
  const [activeTab, setActiveTab] = useState('reverse');

  // Clean initial state
  const [sellingPricePerKg, setSellingPricePerKg] = useState('');
  const [weightGrams, setWeightGrams] = useState('');
  const [costPricePerKg, setCostPricePerKg] = useState('');

  const [bulkPrice, setBulkPrice] = useState('');
  const [bulkQtyKg, setBulkQtyKg] = useState('');

  const reverseResult = calcReverseWeight(sellingPricePerKg, weightGrams, costPricePerKg);
  const matrixResult = calcQuantityPricing(bulkPrice, bulkQtyKg);

  const handleSave = () => {
    if (activeTab === 'reverse') {
      saveToHistory({
        type: t.navReverseWeight,
        productName: 'బరువు ధర',
        details: `${weightGrams || 0} grams @ ${currencySymbol}${sellingPricePerKg || 0}/kg`,
        chargeCustomer: formatCurrency(reverseResult.customerPriceToCharge, currencySymbol),
        profit: reverseResult.profitEarned
      });
    } else {
      saveToHistory({
        type: 'మ్యాట్రిక్స్ ధర',
        productName: 'బల్క్ ధర',
        details: `${currencySymbol}${bulkPrice || 0} for ${bulkQtyKg || 0} kg`,
        ratePerKg: formatCurrency(matrixResult.pricePerKg, currencySymbol)
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navReverseWeight}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navReverseWeightSub}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('reverse')}
          className={`skeuo-btn text-xs sm:text-sm py-2 px-4 ${
            activeTab === 'reverse' ? 'skeuo-btn-primary' : 'skeuo-btn-neutral'
          }`}
        >
          బరువు నుండి ధర (Grams → Price)
        </button>
        <button
          onClick={() => setActiveTab('quantityMatrix')}
          className={`skeuo-btn text-xs sm:text-sm py-2 px-4 ${
            activeTab === 'quantityMatrix' ? 'skeuo-btn-primary' : 'skeuo-btn-neutral'
          }`}
        >
          ధరల పట్టిక (Bulk → g)
        </button>
      </div>

      {activeTab === 'reverse' ? (
        <>
          <ResultCard
            title={t.chargeCustomer}
            primaryLabel={t.chargeCustomer}
            primaryValue={formatCurrency(reverseResult.customerPriceToCharge, currencySymbol)}
            badgeText={`${formatCurrency(reverseResult.profitEarned, currencySymbol)} PROFIT`}
            badgeColor="green"
            items={[
              { label: t.weightGiven, value: `${weightGrams || 0} grams`, highlight: 'blue' },
              { label: t.sellingRate, value: `${formatCurrency(sellingPricePerKg || 0, currencySymbol)}/kg`, highlight: 'amber' },
              { label: t.productCost, value: formatCurrency(reverseResult.costOfProduct, currencySymbol), highlight: 'slate' },
              { label: t.profitEarned, value: formatCurrency(reverseResult.profitEarned, currencySymbol), highlight: 'green' },
              { label: t.profitPercent, value: `${reverseResult.profitPercent.toFixed(1)}%`, highlight: 'green' },
            ]}
            currencySymbol={currencySymbol}
            onCopyText={`${t.chargeCustomer}: ${formatCurrency(reverseResult.customerPriceToCharge, currencySymbol)}`}
            lang={lang}
          />

          <div className="skeuo-calculator-casing p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  {t.sellingPricePerKgLabel} ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={sellingPricePerKg}
                  onChange={(e) => setSellingPricePerKg(e.target.value)}
                  placeholder="0"
                  className="skeuo-input w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  {t.weightGivenLabel}
                </label>
                <input
                  type="number"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(e.target.value)}
                  placeholder="0"
                  className="skeuo-input w-full"
                />
                <div className="flex gap-1.5 mt-2">
                  {[100, 250, 500, 750].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setWeightGrams(g)}
                      className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 font-mono font-bold"
                    >
                      {g}g
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  {t.costPricePerKgLabel} ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={costPricePerKg}
                  onChange={(e) => setCostPricePerKg(e.target.value)}
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
        </>
      ) : (
        <>
          <ResultCard
            title="ధరల పట్టిక"
            primaryLabel={t.ratePerKg}
            primaryValue={`${formatCurrency(matrixResult.pricePerKg, currencySymbol)} / kg`}
            badgeText="RATE BREAKDOWN"
            badgeColor="blue"
            items={[
              { label: t.pricePerGram, value: formatCurrency(matrixResult.pricePerGram, currencySymbol, 4), highlight: 'blue' },
              { label: t.price100g, value: formatCurrency(matrixResult.price100g, currencySymbol), highlight: 'amber' },
              { label: t.price250g, value: formatCurrency(matrixResult.price250g, currencySymbol), highlight: 'green' },
              { label: t.price500g, value: formatCurrency(matrixResult.price500g, currencySymbol), highlight: 'green' },
            ]}
            currencySymbol={currencySymbol}
            onCopyText={`${t.ratePerKg}: ${formatCurrency(matrixResult.pricePerKg, currencySymbol)}`}
            lang={lang}
          />

          <div className="skeuo-calculator-casing p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  {t.totalBulkPriceLabel} ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={bulkPrice}
                  onChange={(e) => setBulkPrice(e.target.value)}
                  placeholder="0"
                  className="skeuo-input w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  {t.totalQtyKgLabel}
                </label>
                <input
                  type="number"
                  value={bulkQtyKg}
                  onChange={(e) => setBulkQtyKg(e.target.value)}
                  placeholder="0"
                  className="skeuo-input w-full"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="skeuo-btn skeuo-btn-success flex-1 gap-2">
                <Save className="w-4 h-4" />
                <span>{t.saveMatrix}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
