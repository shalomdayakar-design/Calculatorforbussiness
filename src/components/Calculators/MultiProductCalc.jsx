import React, { useState } from 'react';
import { Boxes, Plus, Trash2, Save } from 'lucide-react';
import { calcMultiProductBasket } from '../../utils/calculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function MultiProductCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Start with 1 clean empty item row
  const [items, setItems] = useState([
    { id: '1', name: '', numContainers: '', containerType: 'Box', qtyPerContainer: '', unitPrice: '', targetProfitPerContainer: '' }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: '',
        numContainers: '',
        containerType: 'Box',
        qtyPerContainer: '',
        unitPrice: '',
        targetProfitPerContainer: ''
      }
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((it) => it.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const result = calcMultiProductBasket(items);

  const handleSave = () => {
    saveToHistory({
      type: t.navMultiProduct,
      productName: 'సరుకుల బాస్కెట్',
      details: `${items.length} ఉత్పత్తుల బాస్కెట్`,
      purchaseCost: result.totalInvestment,
      sellingPrice: result.totalRevenue,
      profit: result.totalProfit
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-md">
          <Boxes className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navMultiProduct}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navMultiProductSub}
          </p>
        </div>
      </div>

      <ResultCard
        title="మొత్తం బాస్కెట్ లెక్కింపు"
        primaryLabel={t.totalInvestment}
        primaryValue={formatCurrency(result.totalInvestment, currencySymbol)}
        badgeText={`${formatCurrency(result.totalProfit, currencySymbol)} PROFIT`}
        badgeColor="green"
        items={[
          { label: t.totalRevenue, value: formatCurrency(result.totalRevenue, currencySymbol), highlight: 'blue' },
          { label: t.expectedProfit, value: formatCurrency(result.totalProfit, currencySymbol), highlight: 'green' },
          { label: 'సరుకుల సంఖ్య', value: `${items.length} ఉత్పత్తులు`, highlight: 'amber' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={`బాస్కెట్ పెట్టుబడి: ${formatCurrency(result.totalInvestment, currencySymbol)}`}
        lang={lang}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  సరుకు #{index + 1}
                </span>
                {items.length > 1 && (
                  <button onClick={() => removeItem(item.id)} className="text-rose-400 hover:text-rose-300 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  placeholder="సరుకు పేరు (ఉదా. ఆపిల్స్)"
                  className="skeuo-input text-xs"
                />
                <input
                  type="number"
                  value={item.numContainers}
                  onChange={(e) => updateItem(item.id, 'numContainers', e.target.value)}
                  placeholder="బాక్సులు/సంచుల సంఖ్య"
                  className="skeuo-input text-xs"
                />
                <input
                  type="number"
                  value={item.qtyPerContainer}
                  onChange={(e) => updateItem(item.id, 'qtyPerContainer', e.target.value)}
                  placeholder="ప్రతి ప్యాకింగ్ బరువు (kg)"
                  className="skeuo-input text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                  placeholder={`ప్రతి ప్యాకింగ్ కొనుగోలు ధర (${currencySymbol})`}
                  className="skeuo-input text-xs"
                />
                <input
                  type="number"
                  value={item.targetProfitPerContainer}
                  onChange={(e) => updateItem(item.id, 'targetProfitPerContainer', e.target.value)}
                  placeholder={`ప్రతి ప్యాకింగ్ కోరుకున్న లాభం (${currencySymbol})`}
                  className="skeuo-input text-xs"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={addItem} className="skeuo-btn skeuo-btn-amber gap-2">
            <Plus className="w-4 h-4" />
            <span>సరుకు జోడించు</span>
          </button>
          <button onClick={handleSave} className="skeuo-btn skeuo-btn-success flex-1 gap-2">
            <Save className="w-4 h-4" />
            <span>{t.saveBasket}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
