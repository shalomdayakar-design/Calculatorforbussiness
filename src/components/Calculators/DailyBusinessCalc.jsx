import React, { useState } from 'react';
import { TrendingUp, Save, Plus, Trash2 } from 'lucide-react';
import { calcDailyBusiness } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function DailyBusinessCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean initial state
  const [sales, setSales] = useState('');
  const [purchases, setPurchases] = useState('');
  const [expensesList, setExpensesList] = useState([]);

  const addExpenseRow = () => {
    setExpensesList([...expensesList, { id: Date.now().toString(), name: '', amount: '' }]);
  };

  const removeExpenseRow = (id) => {
    setExpensesList(expensesList.filter((e) => e.id !== id));
  };

  const updateExpenseRow = (id, field, val) => {
    setExpensesList(expensesList.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };

  const result = calcDailyBusiness(sales, purchases, expensesList);

  const handleSave = () => {
    saveToHistory({
      type: t.navDailyBusiness,
      productName: 'రోజువారీ బిజినెస్ సారాంశం',
      totalSales: formatCurrency(result.totalSales, currencySymbol),
      totalPurchases: formatCurrency(result.totalPurchases, currencySymbol),
      totalExpenses: formatCurrency(result.totalExpenses, currencySymbol),
      netProfit: formatCurrency(result.netProfit, currencySymbol)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold shadow-md">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navDailyBusiness}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navDailyBusinessSub}
          </p>
        </div>
      </div>

      <ResultCard
        title={t.netDailyProfit}
        primaryLabel={t.netDailyProfit}
        primaryValue={formatCurrency(result.netProfit, currencySymbol)}
        badgeText={result.netProfit >= 0 ? "PROFIT" : "LOSS"}
        badgeColor={result.netProfit >= 0 ? "green" : "red"}
        items={[
          { label: t.totalSalesAmount, value: formatCurrency(result.totalSales, currencySymbol), highlight: 'green' },
          { label: t.totalPurchaseCost, value: formatCurrency(result.totalPurchases, currencySymbol), highlight: 'amber' },
          { label: t.totalExpenses, value: formatCurrency(result.totalExpenses, currencySymbol), highlight: 'rose' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={`${t.netDailyProfit}: ${formatCurrency(result.netProfit, currencySymbol)}`}
        lang={lang}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.totalDailySalesLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full text-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.totalStockPurchasesLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={purchases}
              onChange={(e) => setPurchases(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full text-lg font-bold"
            />
          </div>
        </div>

        {/* Expenses Breakdown Section */}
        <div className="border-t border-slate-800 pt-3">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-mono font-bold text-amber-400 uppercase">
              {t.businessExpensesLabel}
            </label>
            <button onClick={addExpenseRow} className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> ఖర్చు జోడించు
            </button>
          </div>

          <div className="space-y-2">
            {expensesList.map((exp) => (
              <div key={exp.id} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={exp.name}
                  onChange={(e) => updateExpenseRow(exp.id, 'name', e.target.value)}
                  placeholder="ఖర్చు పేరు (రవాణా, అద్దె, కూలీ)"
                  className="skeuo-input text-xs flex-1"
                />
                <input
                  type="number"
                  value={exp.amount}
                  onChange={(e) => updateExpenseRow(exp.id, 'amount', e.target.value)}
                  placeholder={`సొమ్ము (${currencySymbol})`}
                  className="skeuo-input text-xs w-32"
                />
                <button onClick={() => removeExpenseRow(exp.id)} className="text-rose-400 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={handleSave} className="skeuo-btn skeuo-btn-success flex-1 gap-2">
            <Save className="w-4 h-4" />
            <span>{t.saveRecord}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
