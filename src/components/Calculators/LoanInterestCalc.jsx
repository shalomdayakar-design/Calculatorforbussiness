import React, { useState } from 'react';
import { Landmark, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { calcLoan } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function LoanInterestCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean initial state
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [ratePeriod, setRatePeriod] = useState('yearly'); // yearly | monthly | daily
  const [type, setType] = useState('simple'); // simple | compound | emi
  const [durationMonths, setDurationMonths] = useState('');
  const [showAmortization, setShowAmortization] = useState(false);

  const result = calcLoan({
    principal,
    rate,
    ratePeriod,
    type,
    durationMonths
  });

  const handleSave = () => {
    saveToHistory({
      type: `రుణం (${type.toUpperCase()})`,
      productName: 'రుణం వడ్డీ',
      details: `${currencySymbol}${principal || 0} @ ${rate || 0}% for ${durationMonths || 0} mo`,
      totalInterest: formatCurrency(result.totalInterest, currencySymbol),
      monthlyInterest: formatCurrency(result.monthlyInterest, currencySymbol),
      totalRepayment: formatCurrency(result.totalRepayment, currencySymbol)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-md">
          <Landmark className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navLoanInterest}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navLoanInterestSub}
          </p>
        </div>
      </div>

      <ResultCard
        title={t.totalRepaymentAmount}
        primaryLabel={t.totalRepaymentAmount}
        primaryValue={formatCurrency(result.totalRepayment, currencySymbol)}
        badgeText={`${formatCurrency(result.monthlyInterest, currencySymbol)} / MO`}
        badgeColor="blue"
        items={[
          { label: t.dailyApproxInterest, value: formatCurrency(result.dailyApproxInterest, currencySymbol), highlight: 'amber' },
          { label: t.monthlyInterest, value: formatCurrency(result.monthlyInterest, currencySymbol), highlight: 'green' },
          { label: t.yearlyInterest, value: formatCurrency(result.yearlyInterest, currencySymbol), highlight: 'green' },
          { label: t.totalInterest, value: formatCurrency(result.totalInterest, currencySymbol), highlight: 'rose' },
          { label: t.monthlyEmi, value: formatCurrency(result.emi, currencySymbol), highlight: 'blue' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={`${t.totalRepaymentAmount}: ${formatCurrency(result.totalRepayment, currencySymbol)}`}
        lang={lang}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.loanPrincipalLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.interestRateLabel}
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.ratePeriodLabel}
            </label>
            <select
              value={ratePeriod}
              onChange={(e) => setRatePeriod(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              <option value="yearly">{t.yearlyRate}</option>
              <option value="monthly">{t.monthlyRate}</option>
              <option value="daily">{t.dailyRate}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.interestTypeLabel}
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              <option value="simple">{t.simpleInterest}</option>
              <option value="compound">{t.compoundInterest}</option>
              <option value="emi">{t.emiLoan}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.loanDurationMonthsLabel}
            </label>
            <input
              type="number"
              value={durationMonths}
              onChange={(e) => setDurationMonths(e.target.value)}
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

          {type === 'emi' && result.amortization.length > 0 && (
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="skeuo-btn skeuo-btn-primary gap-2"
            >
              <span>{showAmortization ? 'EMI పట్టిక దాచు' : 'EMI పట్టిక చూపు'}</span>
              {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Amortization Table */}
      {showAmortization && result.amortization.length > 0 && (
        <div className="mt-6 skeuo-calculator-casing p-4">
          <h3 className="text-sm font-mono font-bold text-slate-200 mb-3 uppercase tracking-wider">
            నెలవారీ EMI వాయిదాల పట్టిక
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left text-slate-300">
              <thead className="bg-slate-900 border-b border-slate-700 text-slate-400 uppercase">
                <tr>
                  <th className="p-2">నెల</th>
                  <th className="p-2">అసలు చెల్లింపు</th>
                  <th className="p-2">వడ్డీ చెల్లింపు</th>
                  <th className="p-2">మిగిలిన బాకీ</th>
                </tr>
              </thead>
              <tbody>
                {result.amortization.map((row) => (
                  <tr key={row.month} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                    <td className="p-2 font-bold">{row.month}</td>
                    <td className="p-2 text-emerald-400">{formatCurrency(row.principalPaid, currencySymbol)}</td>
                    <td className="p-2 text-rose-400">{formatCurrency(row.interestPaid, currencySymbol)}</td>
                    <td className="p-2 font-bold">{formatCurrency(row.balance, currencySymbol)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
